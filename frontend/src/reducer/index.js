import arraySort from 'array-sort';
import { combineReducers } from 'redux';
import {
  GET_CATEGORIES
} from '../actions/categories';
import {
  GET_POSTS,
  ADD_POST,
  EDIT_POST,
  VOTE_POST,
  DELETE_POST,
  SORT_BY
} from '../actions/posts';
import {
  GET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT,
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
  const { posts, postId, editPost, option, orderBy  } = action
  switch(action.type) {
    case GET_POSTS :
      return posts
    case ADD_POST:
      return {
        ...state.post
      }
    case EDIT_POST:
      return state.map(post => {
        if(post.id === postId) {
          post = editPost
        }
        return post
      })
    case VOTE_POST:
      return state.map(post => {
        if (post.id === postId) {
          if (option === "upVote") {
            post.voteScore += 1
          }
          if (option === "downVote") {
            post.voteScore -= 1
          }
        }
        return post
      })
    case DELETE_POST:
      return state
    case SORT_BY:
      return [].concat(arraySort(state, orderBy, {reverse: true}))
    default :
      return state
  }
}

function comments(state = [], action) {
  const { comments, commentId, editComment, option, postId } = action
  switch(action.type) {
    case GET_COMMENTS :
      return {
        ...state,
        [postId]: comments
      }
    case ADD_COMMENT:
      return {
        ...state,
        [postId]: comments
      }
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
    case VOTE_COMMENT:
      return {
        ...state,
        [postId]: state[postId].map(comment => {
          if (comment.id === commentId) {
            if (option === "upVote") {
              comment.voteScore += 1
            }
            if (option === "downVote") {
              comment.voteScore -= 1
            }
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
