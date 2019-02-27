import { RECEIVE_POSTS, SET_POSTS_FROM_CATEGORIES_FILTER } from '../actions/posts';

export default function posts( state={}, action){
    switch(action.type){
        case RECEIVE_POSTS:
            return{
                ...state,
                ...action.posts
            }
            case SET_POSTS_FROM_CATEGORIES_FILTER:

            console.log('state');
            console.log(state);            
            const indexPostsFilter = Object.keys(state).filter(id => state[id].category.trim() === action.filter);
            console.log('indexFilter:');
            console.log(indexPostsFilter);

            let postsFiltered = {};

            indexPostsFilter.map( (index)=>{
                return postsFiltered = {
                    ...postsFiltered,
                    [index] : {
                        ...state[index]
                    }
                }
            });
            
            console.log('postsFiltered:');
            console.log(postsFiltered);
            return postsFiltered;  

            default:
                return state;
    }
}