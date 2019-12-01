import { SET_STATUSES, SET_STATUS, LIKE_STATUS, UNLIKE_STATUS, LOADING_DATA, DELETE_STATUS, POST_STATUS, SUBMIT_COMMENT} from '../types';

const initialState = {
    statuses: [],
    status: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_STATUSES:
            return {
                ...state,
                statuses: action.payload,
                loading: false
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case LIKE_STATUS:
        case UNLIKE_STATUS:
                let index = state.statuses.findIndex((status) => status.statusId === action.payload.statusId);
                state.statuses[index] = action.payload;
                if(state.status.statusId === action.payload.statusId){
                    state.status = action.payload;
                }
                return {
                    ...state,
                };
        case DELETE_STATUS:
            index = state.statuses.findIndex(status => status.statusId === action.payload);
            state.statuses.splice(index, 1);
            return {
                ...state
            };
        case POST_STATUS:
            return {
                ...state,
                statuses: [
                    action.payload,
                    ...state.statuses
                ]
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                status: {
                    ...state.status,
                    comments: [action.payload, ...state.status.comments]
                }
            }
        default:
           return state; 
        
    }
}