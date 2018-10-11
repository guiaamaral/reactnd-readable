import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { capitalize, timestampToDate, humanLink } from '../utils/helpers';
import { fetchCategories } from '../actions/categories';
import { fetchPosts } from '../actions/posts';
import Header from './Header';

class App extends Component {
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
        <Header />
        <Route exact path="/" render={()=>(
          <Grid container spacing={24}>
            <Grid item xs={12} md={3}>
              <List component="nav">
                <ListItem>
                  <ListItemText primary="Categories" />
                </ListItem>
                <Divider />
                {categories && categories.map(category => (
                  <ListItem button key={category.name} component={Link} to={`/category/${category.path}`}>
                    <ListItemText primary={capitalize(category.name)} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={9}>
              <List component="nav">
                {posts && posts.map(post => (
                  <ListItem button key={post.id} component={Link} to={(`/post/${humanLink(post.title)}`)}>
                    <Grid item xs={12}>
                      <h2>{capitalize(post.title)}</h2>
                      <small>Posted on <b>{timestampToDate(post.timestamp)}</b> by <b>{post.author}</b> at <a href={`/category/${post.category}`}>{post.category}</a> / {post.commentCount} comments</small>
                      <p>{post.body}</p>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        )} />
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
})(App);
