import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { capitalize, timestampToDate, humanLink } from '../utils/helpers';
import { fetchCategories } from '../actions/categories';
import { fetchPosts } from '../actions/posts';

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
        <div className="header">
          <h1>{capitalize("Readable")}</h1>
        </div>
        <Route exact path="/" render={()=>(
          <div className="content">
            <div className="categories">
              <ul>
                {categories && categories.map(category => (
                  <li key={category.name}>
                    <Link to={`/category/${category.path}`}>
                      {capitalize(category.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="posts">
              <ul>
                {posts && posts.map(post => (
                  <li key={post.id}>
                    <Link to={(`/post/${humanLink(post.title)}`)}>
                      <h2>{capitalize(post.title)}</h2>
                    </Link>
                    <small>Posted on <b>{timestampToDate(post.timestamp)}</b> by <b>{post.author}</b> at <a href={`/category/${post.category}`}>{post.category}</a> / {post.commentCount} comments</small>
                    <p>{post.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
