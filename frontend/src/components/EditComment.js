import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { editComment, fetchComments } from '../actions/comments';

class EditComment extends Component {
  static propTypes = {
    posts: PropTypes.array,
    comments: PropTypes.array,
  };

  editComment = (e) => {
    e.preventDefault();
    const postId = this.props.match.params.postId;
    const commentId = this.props.comment.id;
    const category = this.props.match.params.category;

    const editedComment = {
      timestamp: Date.now(),
      body: e.target.body.value
    }
    this.props.editComment(commentId, postId, editedComment,
      () => this.props.history.push(`/${category}/${postId}`));
  };

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={2}>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h2" color="inherit">
            Edit comment
          </Typography>
          <form autoComplete="off" onSubmit={this.editComment}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField
                  defaultValue={this.props.comment.body} 
                  fullWidth={true}
                  name="body"
                  id="standard-textarea"
                  label="Comment"
                  margin="normal"
                  multiline
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
        <Grid item xs={12} md={2}>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    comment: _.find(comments[match.params.postId], { id: match.params.commentId })
  }
}

export default connect(mapStateToProps, {
  editComment,
  fetchComments
})(EditComment);