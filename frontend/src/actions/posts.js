import * as API from '../utils/ReadableAPI';

export const GET_POSTS = 'GET_POSTS';

export const fetchPosts = () => {
  return(dispatch) => {
    API.fetchPosts().then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res
      });
    });
  }
}
