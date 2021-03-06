import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import UpIcon from '@material-ui/icons/ArrowDropUp';
import DownIcon from '@material-ui/icons/ArrowDropDown';
import { capitalize, timestampToDate } from '../utils/helpers';
import { fetchCategories } from '../actions/categories';
import { fetchPosts, sortPost, votePost } from '../actions/posts';
import ListCategories from './ListCategories';

class Home extends Component {
  static propTypes = {
    categories: PropTypes.array,
    posts: PropTypes.array
  };

  state = {
    value: ''
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.props.sortPost(event.target.value);
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchPosts();
    document.body.classList.toggle('home')
  };
  
  componentWillUnmount() {
    document.body.classList.remove('home')
  };

  render() {
    const { categories, fetchPosts, match, posts, votePost } = this.props;

    const filterPosts = posts.filter(post => {
      if(match.params.category) {
        return post.category === match.params.category
      } else {
        return post
      }
    });  

    return (
      <div className="homepage">
        <Grid container>
          <Grid item xs={12} md={3}>
            <ListCategories categories={categories} />
          </Grid>
          <Grid item xs={12} md={9}>
            <form className="sort-by" autoComplete="off">
              <FormControl>
                <Select
                  inputProps={{
                    name: 'sort-by',
                    id: 'sort-by',
                  }}
                  value={this.state.value}
                  onChange={this.handleChange}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>Sort By</em>
                  </MenuItem>
                  <MenuItem value="timestamp">Date</MenuItem>
                  <MenuItem value="voteScore">Vote Score</MenuItem>
                </Select>
              </FormControl>
            </form>
            {filterPosts.map(post => (
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
                    <small>Posted on <b>{timestampToDate(post.timestamp)}</b> by <b>{post.author}</b> at {post.category} / <u>{post.commentCount} comments</u></small>
                    <p>{post.body}</p>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
          <Fab variant="extended" color="primary" component={Link} className="add-button" to="/add-post">
            <AddIcon /> Add new post
          </Fab>
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
  sortPost,
  votePost
})(Home);
