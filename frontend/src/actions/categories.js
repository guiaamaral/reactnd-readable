import * as API from '../utils/ReadableAPI';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export const fetchCategories = () => {
  return(dispatch) => {
    API.fetchCategories().then(res => {
      dispatch({
        type: GET_CATEGORIES,
        res
      });
    });
  }
}
