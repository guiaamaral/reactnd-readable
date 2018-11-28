import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import UpIcon from '@material-ui/icons/ArrowDropUp';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteComment, fetchComments, voteComment } from '../actions/comments';
import { fetchPosts } from '../actions/posts';
import { timestampToDate } from '../utils/helpers';

class PostComments extends Component {
  static propTypes = {
    comments: PropTypes.array,
    posts: PropTypes.array
  }

  render() {
    const { comments, deleteComment, fetchComments, fetchPosts, voteComment } = this.props
    return (
      <div>
        {comments && comments.map(comment => (
        <Grid container key={comment.id} className="comment-container">
          <Grid item xs={1} className="vote-comment">
            <UpIcon className="vote-up" onClick={() => {
              voteComment(comment.id, comment.parentId, "upVote");
              fetchComments();
            }} />
            <p className="vote-note">{comment.voteScore}</p>
            <DownIcon className="vote-down" onClick={() => {
              voteComment(comment.id, comment.parentId, "downVote");
              fetchComments();
            }} />
          </Grid>
          <Grid item xs={11} className="comment">
            <p>{comment.body}</p>
            <small>Posted on <b>{timestampToDate(comment.timestamp)}</b> by <b>{comment.author}</b></small>
              <Link to={`/${this.props.category}/${comment.parentId}/${comment.id}/edit`} className="edit-comment">
                <EditIcon />
              </Link>
              <DeleteIcon className="delete-comment" onClick={ () => {
                deleteComment(comment.id, () => {
                  fetchPosts();
                  fetchComments(comment.parentId);
                });
              }} />
          </Grid>
        </Grid>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  }
}

export default connect(mapStateToProps, {
  deleteComment,
  fetchComments,
  fetchPosts,
  voteComment
})(PostComments);
