import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import { capitalize, timestampToDate } from '../utils/helpers';
import Divider from '@material-ui/core/Divider';
import { fetchPosts } from '../actions/posts';
import { fetchComments } from '../actions/comments';
import PostComments from './PostComments';

class SinglePost extends Component {
  static propTypes = {
    posts: PropTypes.array,
    comments: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchPosts();
    this.props.fetchComments(this.props.match.params.postId);
  }

  render() {
    const { comments, post } = this.props
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} md={2}>
          </Grid>
            {post && (
              <Grid item xs={12} md={8} key={post.id}>
                <h2>{capitalize(post.title)}</h2>
                <p>{post.body}</p>
                <small>Posted on <b>{timestampToDate(post.timestamp)}</b> by <b>{post.author}</b> at {post.category} / {post.commentCount} comments</small>
                <Divider />
                {comments && <PostComments comments={comments}/>}
              </Grid>
            )}
          <Grid item xs={12} md={2}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  const post = _.find(posts, { id: match.params.postId })
  return {
    post: post,
    comments: comments[match.params.postId],
  }
}

export default connect(mapStateToProps, {
  fetchPosts,
  fetchComments
})(SinglePost);
