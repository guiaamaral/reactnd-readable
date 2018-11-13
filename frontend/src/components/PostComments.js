import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import * as commentActions from '../actions/comments'
import { timestampToDate } from '../utils/helpers';

class PostComments extends Component {
  static propTypes = {
    comments: PropTypes.array
  }

  render() {
    const { comments } = this.props
    return (
      <div>
        {comments && comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.body}</p>
            <small>Posted on <b>{timestampToDate(comment.timestamp)}</b> by <b>{comment.author}</b></small>
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
