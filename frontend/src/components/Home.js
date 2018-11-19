import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import { capitalize, timestampToDate } from '../utils/helpers';
import { fetchCategories } from '../actions/categories';
import { fetchPosts } from '../actions/posts';
import ListCategories from './ListCategories';

class Home extends Component {
  static propTypes = {
    categories: PropTypes.array,
    posts: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  render() {
    const { categories, posts } = this.props
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} md={3}>
            <ListCategories categories={categories} />
          </Grid>
          <Grid item xs={12} md={9}>
            <List component="nav">
              {posts && posts.map(post => (
                <ListItem button key={post.id} component={Link} to={(`/${post.category}/${post.id}`)}>
                  <Grid item xs={12}>
                    <h2>{capitalize(post.title)}</h2>
                    <small>Posted on <b>{timestampToDate(post.timestamp)}</b> by <b>{post.author}</b> at {post.category} / {post.commentCount} comments</small>
                    <p>{post.body}</p>
                  </Grid>
                </ListItem>
              ))}
            </List>
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
  fetchPosts
})(Home);
