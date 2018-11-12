import * as API from '../utils/ReadableAPI';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';

export const fetchPosts = () => {
  return(dispatch) => {
    API.fetchPosts().then(posts => {
      dispatch({
        type: GET_POSTS,
        posts
      });
    });
  }
}

export const addPost = (post, callback) => {
  return (dispatch) => {
    API.addPost(post).then(() => callback())
    dispatch({
      type: ADD_POST,
      post
    })
  }
}