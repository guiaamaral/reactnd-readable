import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import * as commentActions from '../actions/comments'
import { timestampToDate } from '../utils/helpers';

class PostComments extends Component {
  static propTypes = {
    comments: PropTypes.array
  }

  onDeleteComment = (comment) => {
    this.props.deleteComment(comment.id, () => {
      this.props.fetchComments(comment.parentId);
    })
  }

  render() {
    const { comments } = this.props
    return (
      <div>
        {comments && comments.map(comment => (
          <div className="comment" key={comment.id}>
            <p>{comment.body}</p>
            <small>Posted on <b>{timestampToDate(comment.timestamp)}</b> by <b>{comment.author}</b></small>
            <Button variant="outlined" className="edit-comment" component={Link} to={`/${this.props.category}/${comment.parentId}/${comment.id}/edit`}>
              <EditIcon />
            </Button>
            <Button variant="outlined" className="delete-comment" onClick={() => this.onDeleteComment(comment)}>
              <DeleteIcon />
            </Button>
            <Divider />
          </div>
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

export default connect(mapStateToProps,
  commentActions
)(PostComments);
