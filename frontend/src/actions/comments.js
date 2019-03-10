import { showLoading, hideLoading } from 'react-redux-loading';
import { voteComment, updateComment, createComment } from '../api/api';
import {getComments} from '../api/api';
import convertComments from '../util/commentHelper';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';

export function createCommentAction(comment){
  return{
      type: CREATE_COMMENT,
      comment
  }
}

export function updateCommentAction(comment){
  return{
      type: UPDATE_COMMENT,
      comment
  }
}

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

  export function handleVoteComment(id, option){
    return (dispatch) =>{
        dispatch(showLoading());
        return voteComment(id, option)
        .then( (comment) => {
            dispatch(updateCommentAction(comment));
            dispatch(hideLoading());
        });
    }
}
  
export function handleUpdateComment(comment){
  return(dispatch) => {
      dispatch(showLoading());
      return updateComment(comment)
          .then((comment)=> {
              dispatch(updateCommentAction(comment));
              dispatch(hideLoading());
          }); 
  }
}

export function handleCreateComment(comment){
  return(dispatch) => {
      dispatch(showLoading());
      return createComment(comment)
          .then((post)=> {
              dispatch(createCommentAction(comment));
              dispatch(hideLoading());
          }); 
  }
}
