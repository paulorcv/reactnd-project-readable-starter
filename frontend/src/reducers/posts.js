import { RECEIVE_POSTS, SET_POSTS_FROM_CATEGORIES_FILTER, UPDATE_POST, CREATE_POST, DELETE_POST } from '../actions/posts';

export default function posts( state={}, action){
    switch(action.type){
        
        case UPDATE_POST:                

            return{
                    ...state,
                    [action.post.id] : action.post
                } 

        case DELETE_POST:            

            const indexPostsFilterDelete = Object.keys(state).filter(id => state[id].id !== action.id);
            let postsFilteredDelete = {};

            indexPostsFilterDelete.map( (index)=>{
                return postsFilteredDelete = {
                    ...postsFilteredDelete,
                    [index] : {
                        ...state[index]
                    }
                }
            });
        
        
            return postsFilteredDelete;              


        case CREATE_POST:            
        
            return{
                ...state,
                [action.post.id] : action.post
            } 

        case RECEIVE_POSTS:
            
        return{
                ...action.posts
            }
            case SET_POSTS_FROM_CATEGORIES_FILTER:

                const indexPostsFilter = Object.keys(state).filter(id => state[id].category.trim() === action.filter);
                let postsFiltered = {};

                indexPostsFilter.map( (index)=>{
                    return postsFiltered = {
                        ...postsFiltered,
                        [index] : {
                            ...state[index]
                        }
                    }
                });
            
                return postsFiltered;  

            default:            
                return state;
    }
}