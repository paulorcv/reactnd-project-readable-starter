import { RECEIVE_COMMENTS, UPDATE_COMMENT } from '../actions/comments';

export default function comments( state={}, action){
    switch(action.type){
        
        case RECEIVE_COMMENTS:
            return{
                ...state,
                ...action.comments
            }

            case UPDATE_COMMENT:   
         
            return{
                ...state,
                [action.comment.id] : action.comment
            } 

            default:
                return state;
    }
}