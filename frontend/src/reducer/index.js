import { combineReducers } from 'redux';
import {
  GET_CATEGORIES
} from '../actions/categories';
import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/posts';
import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../actions/comments';

function categories(state = [], action) {
  switch(action.type) {
    case GET_CATEGORIES :
      return action.res.categories
    default :
      return state
  }
}

function posts(state = [], action) {
  const { posts, post, postId, editPost } = action
  switch(action.type) {
    case GET_POSTS :
      return posts
    case ADD_POST:
      return state.concat(post)
    case EDIT_POST:
      return state.map(post => {
        if(post.id === postId) {
          post = editPost
        }
        return post
      })
    case DELETE_POST:
      return state
    default :
      return state
  }
}

function comments(state = [], action) {
  const { comments, commentId, editComment, postId } = action
  switch(action.type) {
    case GET_COMMENTS :
      return Object.assign({}, state, {[postId]: comments})
    case ADD_COMMENT:
      return Object.assign({}, state, {[postId]: comments})
    case EDIT_COMMENT:
      return {
        ...state,
        [postId]: state[postId].map(comment => {
          if(comment.id === commentId) {
            comment = editComment
          }
          return comment
        })
      }
    case DELETE_COMMENT:
      return state
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
});
