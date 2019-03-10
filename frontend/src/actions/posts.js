import { showLoading, hideLoading } from 'react-redux-loading';
import convertPosts from '../util/postHelper';
import {getPost, getPosts, getPostsByCategory, updatePost, votePost, createPost, deletePost} from '../api/api';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SET_POSTS_FROM_CATEGORIES_FILTER = 'SET_POSTS_FROM_CATEGORIES_FILTER';
export const RECEIVE_POST = 'RECEIVE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';


export function handleVotePost(id, option){
    return (dispatch) =>{
        dispatch(showLoading());
        return votePost(id, option)
        .then( (post) => {
            dispatch(updatePostAction(post));
            dispatch(hideLoading());
        });
    }
}

export function createPostAction(post){
    return{
        type: CREATE_POST,
        post
    }
}

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


export function deletePostAction(id){
    return{
        type: DELETE_POST,
        id
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

export function handleDeletePost(postId){
    return(dispatch) => {
        dispatch(showLoading());
        return deletePost(postId)
            .then(()=> {
                dispatch(deletePostAction(postId));
                dispatch(hideLoading());
            }); 
    }
}

export function handleCreatePost(post){
    return(dispatch) => {
        dispatch(showLoading());
        return createPost(post)
            .then((post)=> {
                dispatch(createPostAction(post));
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
  


