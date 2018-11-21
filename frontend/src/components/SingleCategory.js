import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import UpIcon from '@material-ui/icons/ArrowDropUp';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import { capitalize, timestampToDate } from '../utils/helpers';
import { fetchCategories } from '../actions/categories';
import { fetchPosts, votePost } from '../actions/posts';
import ListCategories from './ListCategories';

class SingleCategory extends Component {
  static propTypes = {
    categories: PropTypes.array,
    posts: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    const currentCategory = this.props.match.params.category;
    const { categories, posts, fetchPosts, votePost } = this.props
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={3}>
            <ListCategories categories={categories} />
          </Grid>
          <Grid item xs={12} md={9}>
            {posts && posts.filter(post => post.category === currentCategory).map(post => (
              <Paper elevation={1} key={post.id} className="post">
                <Grid container>
                  <Grid item xs={1} className="vote">
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
                    <Link to={(`/${post.category}/${post.id}`)}><h2>{capitalize(post.title)}</h2></Link>
                    <small>Posted on <b>{timestampToDate(post.timestamp)}</b> by <b>{post.author}</b> at {post.category} / {post.commentCount} comments</small>
                    <p>{post.body}</p>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
          <Button variant="extendedFab" color="primary" component={Link} className="add-button" to="/add-post">
            <AddIcon /> Add new post
          </Button>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories: categories,
    posts: posts
  }
}

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPosts,
  votePost
})(SingleCategory);
