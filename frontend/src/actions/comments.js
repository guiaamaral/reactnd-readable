import * as API from '../utils/ReadableAPI';

export const GET_COMMENTS = 'GET_COMMENTS';

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
