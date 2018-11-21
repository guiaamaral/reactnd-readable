import * as API from '../utils/ReadableAPI';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_POST = 'VOTE_POST';
export const DELETE_POST = 'DELETE_POST';


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
    API.addPost(post).then(() => callback());
    dispatch({
      type: ADD_POST,
      post
    });
  }
}

export const editPost = (postId, editedPost, callback) => {
  return (dispatch) => {
    API.editPost(postId, editedPost).then(editPost => {
      dispatch({
        type: EDIT_POST,
        editPost,
        postId
      })
    })
    .then(() => callback());
  }
}

export const votePost = (postId, option) => {
  return (dispatch) => {
    API.votePost(postId, option).then(post => {
      dispatch({
        type: VOTE_POST,
        postId,
        option
      })
    })
  }
}

export const deletePost = (postId, callback) => {
  return dispatch => {
    API.deletePost(postId).then(() => callback());
    dispatch({
      type: DELETE_POST,
      postId
    });
  }
}