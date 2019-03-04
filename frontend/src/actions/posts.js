import { showLoading, hideLoading } from 'react-redux-loading'
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
// export function handleReceivePosts(category){
//     return(dispatch) =>{
//         dispatch(showLoading())
//             category === undefined || category === '' || category === 'all' ?
//             getPosts()
//             :
//             getPostsByCategory(category)
//             .then(({posts}) =>{
//                 dispatch(receivePosts(posts)); 
//                 dispatch(hideLoading())
//             });
//     }
// }

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
  
  function convertPosts(posts){
    let postsConverted = {};

    Object.keys(posts).map(key => {
        let id = posts[key].id;
        let post = posts[key];
        postsConverted = { ...postsConverted, [id]: post};
        return (postsConverted);
    })

    return postsConverted;

  }

