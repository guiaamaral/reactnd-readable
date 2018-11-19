import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import { capitalize, timestampToDate } from '../utils/helpers';
import { fetchPosts, deletePost } from '../actions/posts';
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

  onDeletePost = () => {
    const postId = this.props.match.params.postId;
    this.props.deletePost(postId, () => {
      this.props.history.push('/')
    })
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
                <br/>
                <Button color="default" variant="contained" className="edit-post">
                  <EditIcon />
                </Button>
                <Button color="secondary" variant="contained" onClick={(e) => this.onDeletePost(e)}>
                  <DeleteIcon />
                </Button>
                {comments && <PostComments category={post.category} comments={comments}/>}
                <Button color="primary" variant="extendedFab" className="add-button" component={Link} to={`/${post.category}/${post.id}/comment`}>
                  <CommentIcon /> Add a Comment
                </Button>
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
  deletePost,
  fetchComments
})(SinglePost);
