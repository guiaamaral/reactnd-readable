import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { capitalize } from '../utils/helpers';

class ListCategories extends Component {
  static propTypes = {
    categories: PropTypes.array
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        <List component="nav">
          <ListItem>
            <ListItemText primary="Categories" />
          </ListItem>
          <Divider />
            <ListItem button component={Link} to="/">
              <ListItemText primary="All" />
            </ListItem>
          {categories && categories.map(category => (
            <ListItem button key={category.name} component={Link} to={`/${category.path}`}>
              <ListItemText primary={capitalize(category.name)} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default ListCategories;
