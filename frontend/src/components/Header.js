import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';

class Header extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <div className="back-icon">
              <IconButton color="inherit" aria-label="Back" component={Link} to="/">
                <LeftArrowIcon className="menu" />
              </IconButton>
            </div>
            <Typography variant="h6" color="inherit">
              Readable
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;