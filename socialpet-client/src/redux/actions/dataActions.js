import { SET_STATUSES, LOADING_DATA, LIKE_STATUS, UNLIKE_STATUS, DELETE_STATUS, SET_ERRORS, CLEAR_ERRORS, POST_STATUS, LOADING_UI, SET_STATUS, STOP_LOADING_UI, SUBMIT_COMMENT } from '../types';
import axios from 'axios';

// get all statuses
export const getStatuses = () => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get('/statuses')
        .then(res => {
            dispatch({
                type: SET_STATUSES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_STATUSES,
                payload: []
            })
        })
};

export const getStatus = (statusId) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/status/${statusId}`)
        .then(res => {
            dispatch({
                type: SET_STATUS,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI})
        })
        .catch(err => console.log(err));
}

//Post a status
export const postStatus = (newStatus) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/status', newStatus)
    .then(res => {
        dispatch({
            type: POST_STATUS,
            payload: res.data
        });
        dispatch( clearErrors());
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

// like a status
export const likeStatus = (statusId) => dispatch => {
    axios.get(`/status/${statusId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_STATUS,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//unlike a status

export const unlikeStatus = (statusId) => dispatch => {
    axios.get(`/status/${statusId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_STATUS,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
};

//Submit a comment
export const submitComment = (statusId, commentData) => (dispatch) => {
    axios.post(`/status/${statusId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const deleteStatus = (statusId) => (dispatch) => {
    axios.delete(`/status/${statusId}`)
        .then(() => {
            dispatch({type: DELETE_STATUS, payload: statusId})
        })
        .catch(err => console.log(err));
};

export const getUserData = (userHandle) => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/user/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_STATUSES,
                payload: res.data.statuses
            });

        })
        .catch(() => {
            dispatch({
                type: SET_STATUSES,
                payload: null
            })
        })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}