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

export const addComment = (comment, parentId, callback) => {
  return (dispatch) => {
    API.addComment(comment).then( comment => {
      dispatch({
        type: ADD_COMMENT,
        parentId,
        comment
      })
    })
    .then(() => callback());
  }
}