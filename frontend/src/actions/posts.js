import { showLoading, hideLoading } from 'react-redux-loading';
import convertPosts from '../util/postHelper';
import {getPost, getPosts, getPostsByCategory} from '../api/api';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SET_POSTS_FROM_CATEGORIES_FILTER = 'SET_POSTS_FROM_CATEGORIES_FILTER';
export const RECEIVE_POST = 'RECEIVE_POST';



export function receivePosts(posts){
    return{
        type: RECEIVE_POSTS,
        posts
    }
}

export function receivePost(post){
    return{
        type: RECEIVE_POST,
        post
    }
}

export function setPostsFromCategoryFilter(filter){
    return{
        type : SET_POSTS_FROM_CATEGORIES_FILTER,
        filter
    }
}

export function handleReceivePost(id){
    return(dispatch) =>{
        dispatch(showLoading())
        return getPost(id)
            .then(({post}) =>{
                dispatch(receivePost(post));                
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
        dispatch(receivePosts(postsConverted));
        dispatch(hideLoading());
      });
    };
  }
  


