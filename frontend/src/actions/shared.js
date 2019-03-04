import {getInitialData} from '../api/api';
import {receiveCategoriesAction} from '../actions/categories'
import {receivePostsAction} from '../actions/posts'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData(){
    return(dispatch) =>{
        dispatch(showLoading())
        return getInitialData()
            .then(({categories, posts}) =>{
                dispatch(receiveCategoriesAction(categories));
                dispatch(receivePostsAction(posts));
                dispatch(hideLoading())
            });
    }
}


