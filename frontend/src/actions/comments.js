import { showLoading, hideLoading } from 'react-redux-loading';
// import convertPosts from '../util/postHelper';
import {getComments} from '../api/api';
import convertComments from '../util/commentHelper';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export function receiveCommentsAction(comments){
    return{
        type: RECEIVE_COMMENTS,
        comments
    }
}


export function handleReceiveComments(postId) {
    return (dispatch) => {
      dispatch(showLoading());
      
      getComments(postId)
      .then((comments) => {
        const commentsConverted = convertComments(comments);
        // const commentsConverted = comments;
        dispatch(receiveCommentsAction(commentsConverted));
        dispatch(hideLoading());
      });
    };
  }
  


