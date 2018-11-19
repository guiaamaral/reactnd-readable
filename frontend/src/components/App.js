import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './Header';
import Home from './Home';
import SingleCategory from './SingleCategory';
import SinglePost from './SinglePost';
import AddPost from './AddPost';
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
        <Route exact path="/:category" component={SingleCategory} />
        <Route exact path="/:category/:postId" component={SinglePost} />
        <Route exact path="/:category/:postId/comment" component={AddComment} />
        <Route exact path="/:category/:postId/:commentId/edit" component={EditComment} />
        <Route exact path="/add-post" component={AddPost} />
      </MuiThemeProvider>
    );
  }
}

export default App;
