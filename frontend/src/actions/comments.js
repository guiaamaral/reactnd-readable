import * as API from '../utils/ReadableAPI';

export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';

export const fetchComments = (postId) => {
  return(dispatch) => {
    API.fetchComments(postId).then(comments => {
      dispatch({
        type: GET_COMMENTS,
        postId,
        comments
      });
    });
  }
}

export const addComment = (comments, postId, callback) => {
  return (dispatch) => {
    API.addComment(comments).then( comments => {
      dispatch({
        type: ADD_COMMENT,
        postId,
        comments
      })
    })
    .then(() => callback());
  }
}