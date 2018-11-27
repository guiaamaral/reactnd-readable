import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './Header';
import Home from './Home';
import SinglePost from './SinglePost';
import AddPost from './AddPost';
import EditPost from './EditPost';
import AddComment from './AddComment';
import EditComment from './EditComment';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/add-post" component={AddPost} />
        <Route exact path="/:category" component={Home} />
        <Route exact path="/:category/:postId" component={SinglePost} />
        <Route exact path="/:category/:postId/edit" component={EditPost} />
        <Route exact path="/:category/:postId/comment" component={AddComment} />
        <Route exact path="/:category/:postId/:commentId/edit" component={EditComment} />
      </MuiThemeProvider>
    );
  }
}

export default App;
