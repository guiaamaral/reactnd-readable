import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { editPost } from '../actions/posts'

class EditPost extends Component {
  static propTypes = {
    posts: PropTypes.array
  };

  editPost = (e) => {
    e.preventDefault()
    const postId = this.props.post.id
    const category = this.props.post.category

    const editedPost = {
      title: e.target.title.value,
      body: e.target.body.value,
    }
    this.props.editPost(postId, editedPost,
      () => this.props.history.push(`/${category}/${postId}`)
    );
  };

  render() {
    const { post } = this.props
    return (
      <div>
        <Grid container>
          <Grid item xs={12} md={2}>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={1} className="add-edit">
              <h2>Edit post</h2>
              <form autoComplete="off" onSubmit={this.editPost}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={post.title}
                      fullWidth={true}
                      name="title"
                      id="standard-required"
                      label="Title"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={post.body}
                      fullWidth={true}
                      name="body"
                      id="standard-textarea"
                      label="Body"
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
            </Paper>
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ posts }, { match }) {
  return {
    post: _.find(posts, { id: match.params.postId }),
  }
}

export default connect(mapStateToProps, {
  editPost
})(EditPost);