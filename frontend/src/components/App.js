import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { capitalize } from '../utils/helpers';
import { fetchCategories } from '../actions/categories';

class App extends Component {
  static propTypes = {
    categories: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    const { categories } = this.props
    return (
      <div>
        {capitalize("Readable")}
        <Route exact path="/" render={()=>(
          <ul>
            {categories && categories.map(category => (
              <li key={category.name}>
                <Link to={`/${category.path}`}>
                  {capitalize(category.name)}
                </Link>
              </li>
            ))}
          </ul>
        )} />
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories
  }
}

export default connect(mapStateToProps, {
  fetchCategories
})(App);
