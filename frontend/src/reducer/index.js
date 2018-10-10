import { combineReducers } from 'redux';
import {
  GET_CATEGORIES
} from '../actions/categories';
import {
  GET_POSTS
} from '../actions/posts';

function categories(state = [], action) {
  switch(action.type) {
    case GET_CATEGORIES :
      return action.payload
    default :
      return state
  }
}

function posts(state = [], action) {
  switch(action.type) {
    case GET_POSTS :
      return action.payload
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts
});
