import { RECEIVE_COMMENTS, UPDATE_COMMENT, CREATE_COMMENT} from '../actions/comments';

export default function comments( state={}, action){
    switch(action.type){
        
        case RECEIVE_COMMENTS:
            return{
                ...action.comments
            }

            case UPDATE_COMMENT:   
         
            return{
                ...state,
                [action.comment.id] : action.comment
            } 


            case CREATE_COMMENT:   
         
            return{
                ...state,
                [action.comment.id] : action.comment
            } 


            default:
                return state;
    }
}