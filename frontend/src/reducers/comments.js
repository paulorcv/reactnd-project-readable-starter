import { RECEIVE_COMMENTS, UPDATE_COMMENT, CREATE_COMMENT, DELETE_COMMENT} from '../actions/comments';

export default function comments( state={}, action){
    switch(action.type){
        
        case DELETE_COMMENT:            

        const indexCommentsFilterDelete = Object.keys(state).filter(id => state[id].id !== action.id);
        let CommentsFilteredDelete = {};

        console.log('========== REDUCER ==========')
        console.log('before:');
        console.log(state);
        console.log('action.id:');
        console.log(action.id);            
        console.log('indexCommentsFilterDelete:');
        console.log(indexCommentsFilterDelete);

        indexCommentsFilterDelete.map( (index)=>{
            return CommentsFilteredDelete = {
                ...CommentsFilteredDelete,
                [index] : {
                    ...state[index]
                }
            }
        });
        
        console.log('after:');
        console.log(CommentsFilteredDelete);
        
        return CommentsFilteredDelete;        

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