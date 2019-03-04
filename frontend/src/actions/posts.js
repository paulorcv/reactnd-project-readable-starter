import { showLoading, hideLoading } from 'react-redux-loading';
import convertPosts from '../util/postHelper';
import {getPost, getPosts, getPostsByCategory, updatePost} from '../api/api';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SET_POSTS_FROM_CATEGORIES_FILTER = 'SET_POSTS_FROM_CATEGORIES_FILTER';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export function updatePostAction(post){
    return{
        type: UPDATE_POST,
        post
    }
}

export function receivePostsAction(posts){
    return{
        type: RECEIVE_POSTS,
        posts
    }
}

export function receivePostAction(post){
    return{
        type: RECEIVE_POST,
        post
    }
}


export function setPostsFromCategoryFilterAction(filter){
    return{
        type : SET_POSTS_FROM_CATEGORIES_FILTER,
        filter
    }
}

export function handleUpdatePost(post){
    return(dispatch) => {
        dispatch(showLoading());
        return updatePost(post)
            .then((post)=> {
                dispatch(updatePostAction(post));
                dispatch(hideLoading());
            }); 
    }
}

export function handleReceivePost(id){
    return(dispatch) =>{
        dispatch(showLoading())
        return getPost(id)
            .then(({post}) =>{
                dispatch(receivePostAction(post));                
                dispatch(hideLoading())
            });
    }
}

export function handleReceivePosts(category) {
    return (dispatch) => {
      dispatch(showLoading());
      (
        category === undefined || category === '' || category === 'all'
          ? getPosts()
          : getPostsByCategory(category)
      ).then((posts) => {
        const postsConverted = convertPosts(posts);  
        dispatch(receivePostsAction(postsConverted));
        dispatch(hideLoading());
      });
    };
  }
  


