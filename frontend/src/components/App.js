import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Header from './Header';
import Home from './Home';
import SingleCategory from './SingleCategory';
import SinglePost from './SinglePost';
import AddPost from './AddPost';
import AddComment from './AddComment';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    const currentPath = window.location.pathname;

    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/:category" component={SingleCategory} />
        <Route exact path="/:category/:postId" component={SinglePost} />
        <Route exact path="/:category/:postId/comment" component={AddComment} />
        <Route exact path="/add-post" component={AddPost} />
        {currentPath.includes('add-post') || currentPath.includes('comment') ?
          <div></div>
        :
          <Button variant="fab" color="primary" component={Link} className="add-button" to="/add-post">
            <AddIcon />
          </Button>
        }
      </MuiThemeProvider>
    );
  }
}

export default App;
