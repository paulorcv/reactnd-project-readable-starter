import { RECEIVE_POSTS, SET_POSTS_FROM_CATEGORIES_FILTER, UPDATE_POST } from '../actions/posts';

export default function posts( state={}, action){
    switch(action.type){
        

        case UPDATE_POST:   
            let posts = Object.keys(state).filter( id => id !== action.post.id);
         
            return{
                ...state,
                [action.post.id] : action.post
            } 

        case RECEIVE_POSTS:
            return{
                ...state,
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