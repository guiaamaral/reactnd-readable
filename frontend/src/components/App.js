import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/ArrowLeft';
import Header from './Header';
import Home from './Home';
import SingleCategory from './SingleCategory';
import SinglePost from './SinglePost';
import AddPost from './AddPost';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    const currentPath = window.location.pathname
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/category/:name" component={SingleCategory} />
        <Route exact path="/post/:postId" component={SinglePost} />
        <Route exact path="/add-post" component={AddPost} />
        {currentPath.includes('add-post') ?
          <Button variant="fab" color="primary" component={Link} to="/">
            <BackIcon />
          </Button>
        :
          <Button variant="fab" color="primary" component={Link} to="/add-post">
            <AddIcon />
          </Button>
        }
      </MuiThemeProvider>
    );
  }
}

export default App;
