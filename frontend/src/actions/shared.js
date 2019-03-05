import {getInitialData} from '../api/api';
import {receiveCategoriesAction} from '../actions/categories'
import {receivePostsAction} from '../actions/posts'
import { showLoading, hideLoading } from 'react-redux-loading'
import convertPosts from '../util/postHelper';



export function handleInitialData(){
    return(dispatch) =>{
        dispatch(showLoading())
        return getInitialData()
            .then(({categories, posts}) =>{
                const postsConverted = convertPosts(posts);  
                dispatch(receiveCategoriesAction(categories));
                dispatch(receivePostsAction(postsConverted));
                dispatch(hideLoading())
            });
    }
}


