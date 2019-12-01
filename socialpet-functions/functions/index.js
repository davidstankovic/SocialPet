const functions = require('firebase-functions');

const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

const app = require('express')();

const { db } = require('./util/admin');

const { getAllStatuses, postOneStatus, getStatus, commentOnStatus, likeStatus,  unlikeStatus, deleteStatus} = require('./handlers/statuses');

const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead } = require('./handlers/users');


// Status routes.
app.get('/statuses', getAllStatuses);

app.post('/status', FBAuth, postOneStatus);

app.get('/status/:statusId', getStatus);

app.delete('/status/:statusId', FBAuth, deleteStatus);

app.get('/status/:statusId/like', FBAuth, likeStatus);

app.get('/status/:statusId/unlike', FBAuth, unlikeStatus);


app.post('/status/:statusId/comment', FBAuth, commentOnStatus);

 //users routes
 app.post('/signup', signup);

 app.post('/login', login);

 app.post('/user/image', FBAuth, uploadImage);

 app.post('/user', FBAuth, addUserDetails);

 app.get('/user', FBAuth, getAuthenticatedUser);

 app.get('/user/:handle', getUserDetails);
 app.post('/notifications', FBAuth, markNotificationsRead);
//middleware

 exports.api = functions.region('europe-west1').https.onRequest(app);

 exports.createNotificationOnLike = functions.region('europe-west1').firestore.document('likes/{id}')
    .onCreate((snapshot) => {
       return db.doc(`/statuses/${snapshot.data().statusId}`).get()
            .then((doc) => {
                if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        type: 'like',
                        read: false,
                        statusId: doc.id
                    });
                }
            })
            .catch(err => console.error(err));
    });

exports.deleteNotificationOnUnlike = functions.region('europe-west1').firestore.document('likes/{id}')
    .onDelete((snapshot) => {
       return db.doc(`/notifications/${snapshot.id}`)
        .delete()
        .catch(err => {
            console.error(err);
            return;
        })
    })

exports.createNotificationOnComment = functions.region('europe-west1').firestore.document('comments/{id}')
    .onCreate((snapshot) => {
       return db.doc(`/statuses/${snapshot.data().statusId}`).get()
        .then(doc => {
            if(doc.exists  && doc.data().userHandle !== snapshot.data().userHandle){
                return db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().userHandle,
                    sender: snapshot.data().userHandle,
                    type: 'comment',
                    read: false,
                    statusId: doc.id
                });
            }
        })
        .catch(err => {
            console.error(err);
            return;
        });
    });

exports.onUserImageChange = functions.region('europe-west1').firestore.document('/users/{userId}')
    .onUpdate((change) => {
        console.log(change.before.data());
        console.log(change.after.data());
        if(change.before.data().imageUrl !== change.after.data().imageUrl){
            console.log('image has changed');
            const batch = db.batch();
            return db.collection('statuses').where('userHandle', '==', change.before.data().handle).get()
            .then((data) => {
                data.forEach(doc => {
                    const statuses = db.doc(`/statuses/${doc.id}`);
                    batch.update(status, {userImage: change.after.data().imageUrl});
                })
                return batch.commit();
            });
        } else return true;
    });

exports.onStatusDelete = functions.region('europe-west1').firestore.document('/statuses/{statusId}')
    .onDelete((snapshot, context) => {
        const statusId = context.params.statusId;
        const batch = db.batch();
        return db.collection('comments')
            .where('statusId', '==', statusId)
            .get()
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                })
                return db.collection('likes').where('statusId', '==', statusId).get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                })
                return db.collection('notifications').where('statusId', '==', statusId).get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                })
                return batch.commit();
            })
            .catch(err => console.error(err));
    })