import { combineReducers } from 'redux';
import {
  GET_CATEGORIES
} from '../actions/categories';
import {
  GET_POSTS,
  ADD_POST
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
  switch(action.type) {
    case GET_POSTS :
      return action.posts
    case ADD_POST:
      return state.concat(action.post)
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
