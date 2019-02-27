import {getInitialData} from '../api/api';
import {receiveCategories} from '../actions/categories'
import {receivePosts} from '../actions/posts'

export function handleInitialData(){
    return(dispatch) =>{
        return getInitialData()
            .then(({categories, posts}) =>{
                dispatch(receiveCategories(categories));
                dispatch(receivePosts(posts));
            });
    }
}