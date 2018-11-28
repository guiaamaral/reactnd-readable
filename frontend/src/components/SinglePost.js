import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import UpIcon from '@material-ui/icons/ArrowDropUp';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import CommentIcon from '@material-ui/icons/Chat';
import VertIcon from '@material-ui/icons/MoreVert';
import { capitalize, timestampToDate } from '../utils/helpers';
import { fetchPosts, votePost, deletePost } from '../actions/posts';
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

  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onDeletePost = () => {
    const postId = this.props.match.params.postId;
    this.props.deletePost(postId, () => {
      this.props.history.push('/')
    })
  };

  render() {
    const { comments, post, fetchPosts, votePost } = this.props;
    const { anchorEl } = this.state;

    if(!post) {
      return (
      <div>
        <Grid container>
          <Grid item xs={12} md={2}>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={1} key={404}>
              <Grid container className="single-post">
                <Grid item xs={12} className="vote-single">
                  <h2 className="text-center">404</h2>
                  <p className="text-center">Post Not Found</p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
        </Grid>
      </div>
      )
    } else {
      return (
        <div>
          <Grid container>
            <Grid item xs={12} md={2}>
            </Grid>
            <Grid item xs={12} md={8}>
            {post && (
              <Paper elevation={1} key={post.id}>
                <Grid container className="single-post">
                  <Grid item xs={1} className="vote-single">
                    <UpIcon className="vote-up" onClick={() => {
                      votePost(post.id, "upVote");
                      fetchPosts();
                    }} />
                    <p className="vote-note">{post.voteScore}</p>
                    <DownIcon className="vote-down" onClick={() => {
                      votePost(post.id, "downVote");
                      fetchPosts();
                    }} />
                  </Grid>
                  <Grid item xs={11}>
                    <IconButton
                      aria-owns={anchorEl ? 'simple-menu' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                      className="post-options"
                    >
                      <VertIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={this.handleClose}
                    >
                      <MenuItem component={Link} to={`/${post.category}/${post.id}/edit`}>Edit</MenuItem>
                      <MenuItem onClick={(e) => this.onDeletePost(e)}>Delete</MenuItem>
                    </Menu>
                    <h2>{capitalize(post.title)}</h2>
                    <p>{post.body}</p>
                    <small>Posted on <b>{timestampToDate(post.timestamp)}</b> by <b>{post.author}</b> at {post.category} / <u>{post.commentCount} comments</u></small>
                    <br/>
                  </Grid>
                </Grid>
                {comments && <PostComments category={post.category} comments={comments}/>}
                <Fab color="primary" variant="extended" className="add-button" component={Link} to={`/${post.category}/${post.id}/comment`}>
                  <CommentIcon /> Add a Comment
                </Fab>
              </Paper>
            )}
            </Grid>
            <Grid item xs={12} md={2}>
            </Grid>
          </Grid>
        </div>
      );
    }
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
  votePost,
  deletePost,
  fetchComments
})(SinglePost);
