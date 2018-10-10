import { combineReducers } from 'redux';
import {
  GET_CATEGORIES
} from '../actions/categories';

function categories(state = [], action) {
  switch(action.type) {
    case GET_CATEGORIES :
      return action.payload
    default :
      return state
  }
}

export default combineReducers({
  categories
});
