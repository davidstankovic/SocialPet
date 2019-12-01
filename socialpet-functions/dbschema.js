let db = {
    users: [
        {
            userId: 'h9gcLgkRRUS7QgXAuyABaNPz3SJ2',
            email: 'user@email.com',
            handle: 'user',
            createdAt: '2019-11-29T18:05:59.561Z',
            imageUrl: 'image/dsadasfsadafasdas/dasghasd',
            bio: 'Hello, my name is user, nice to meet you',
            website: 'https://user.com',
            location: 'London, uK'
        }
    ],
    statuses: [
        {
            userHandle: 'user',
            body: 'this is the status body',
            createdAt: '2019-10-29T18:19:00.000Z',
            likedCount: 5,
            commentCount: 2
        }
    ],
    comments: [
        {
            userHandle: 'user',
            statusId: 'asokdhjasjkhd',
            body: 'hahahahaha',
            createdAt: '2019-11-29T18:05:59.561Z',
        }
    ]
};

const userDetails = {
    //Redux data
    credentials: {
        userId: 'N123FASJEH1231928ASKJDBAS12893',
        email: 'user@email.com',
        handle: 'user',
        createdAt: '2019-11-29T18:05:59.561Z',
        imageUrl: 'image/dsadasfsadafasdas/dasghasd',
        bio: 'Hello, my name is user, nice to meet you',
        website: 'https://user.com',
        location: 'London, uK'
    },
    likes: [
        {
            userHandle: 'user',
            statusId: 'hh1312sadhasjudhas321'
        },
        {
            userHandle: 'user',
            statusId: '09daseduas890euwe9'
        }
    ]
};