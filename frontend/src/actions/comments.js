import * as API from '../utils/ReadableAPI';

export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

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
    API.addComment(comment).then(comment => {
      dispatch({
        type: ADD_COMMENT,
        parentId,
        comment
      })
    })
    .then(() => callback());
  }
}

export const editComment = (commentId, postId, editedComment, callback) => {
  return (dispatch) => {
    API.editComment(commentId, editedComment).then(editComment => {
      dispatch({
        type: EDIT_COMMENT,
        editComment,
        commentId,
        postId
      })
    })
    .then(() => callback());
  }
}

export const deleteComment = (commentId, callback) => {
  return (dispatch) => {
    API.deleteComment(commentId).then(() => callback());
    dispatch({
      type: DELETE_COMMENT,
      commentId
    });
  }
}