import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { addComment } from '../actions/comments';
import { uuid } from '../utils/helpers.js';

class AddComment extends Component {
  static propTypes = {
    posts: PropTypes.array
  };

  addComment = (e) => {
    e.preventDefault();
    const postId = this.props.match.params.postId;
    const category = this.props.match.params.category;

    const newComment = {
      id: uuid(),
      timestamp: Date.now(),
      body: e.target.body.value,
      author: e.target.author.value,
      parentId: postId
    }
    this.props.addComment(newComment, postId, () => this.props.history.push(`/${category}/${postId}`));
  };

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h2" color="inherit">
            Add a comment
          </Typography>
          <form autoComplete="off" onSubmit={this.addComment}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  name="body"
                  id="standard-textarea"
                  label="Comment"
                  margin="normal"
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="author"
                  id="standard-required"
                  label="Author"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts
  }
}

export default connect(mapStateToProps, {
  addComment
})(AddComment);