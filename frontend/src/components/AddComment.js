import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
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

    const newComment = {
      id: uuid(),
      timestamp: Date.now(),
      postId: this.props.postId,
      body: e.target.body.value,
      author: e.target.author.value,
    }
    //console.log(newComment)
    this.props.addComment(newComment, this.props.postId, () => this.props.history.push(`/post/${this.props.postId}`));
  };

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} md={2}>
          </Grid>
            <Grid item xs={12} md={8}>
              <form autoComplete="off" onSubmit={this.addComment}>
                <TextField
                  name="author"
                  id="standard-required"
                  label="Author"
                  margin="normal"
                />
                <TextField
                  name="body"
                  id="standard-textarea"
                  label="Comment"
                  margin="normal"
                  multiline
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
        </Grid>
      </div>
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