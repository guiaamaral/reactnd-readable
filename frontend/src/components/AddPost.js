import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { fetchCategories } from '../actions/categories';
import { addPost } from '../actions/posts'
import { capitalize, uuid } from '../utils/helpers.js';

class AddPost extends Component {
  static propTypes = {
    categories: PropTypes.array,
    posts: PropTypes.array
  };

  state = {
    category: ''
  };

  componentDidMount() {
    this.props.fetchCategories();
    document.body.classList.toggle('new-post')
  };
  
  componentWillUnmount() {
    document.body.classList.remove('new-post')
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  addPost = (e) => {
    e.preventDefault()

    const newPost = {
      id: uuid(),
      timestamp: Date.now(),
      title: e.target.title.value,
      body: e.target.body.value,
      author: e.target.author.value,
      category: e.target.category.value,
    }
    this.props.addPost(newPost, () => this.props.history.push('/'))
  };

  render() {
    const { categories } = this.props
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={2}>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={1} className="add-edit">
              <h2>Create a new post</h2>
              <form autoComplete="off" onSubmit={this.addPost}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      name="title"
                      id="standard-required"
                      label="Title"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth={true}
                      name="body"
                      id="standard-textarea"
                      label="Body"
                      margin="normal"
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth={true}
                      name="author"
                      id="standard-required"
                      label="Author"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth={true}
                      name="category"
                      id="standard-select-category"
                      select
                      label="Category"
                      margin="normal"
                      value={this.state.category}
                      onChange={this.handleChange('category')}
                    >
                      {categories && categories.map(category => (
                        <MenuItem key={category.path} value={category.path}>
                          {capitalize(category.name)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    posts: posts,
    categories: categories
  }
}

export default connect(mapStateToProps, {
  fetchCategories,
  addPost
})(AddPost);