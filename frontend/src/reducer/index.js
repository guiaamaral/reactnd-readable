import { combineReducers } from 'redux';
import {
  GET_CATEGORIES
} from '../actions/categories';
import {
  GET_POSTS
} from '../actions/posts';
import {
  GET_COMMENTS
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
    default :
      return state
  }
}

function comments(state = [], action) {
  const { comments, postId} = action
  switch(action.type) {
    case GET_COMMENTS :
      return Object.assign({}, state, {[postId]: comments})
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
});
