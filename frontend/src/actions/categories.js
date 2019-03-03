import { showLoading, hideLoading } from 'react-redux-loading'
import { getCategories } from '../api/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SET_CATEGORIES_FILTER = 'SET_CATEGORIES_FILTER';

export function setCategoriesFilter(filter){
    return{
        type : SET_CATEGORIES_FILTER,
        filter
    }
}

export function receiveCategories(categories){
    return{
        type : RECEIVE_CATEGORIES,
        categories
    }
}

export function handleReceiveCategories() {
    return dispatch => getCategories().then((categories) => {
      dispatch(receiveCategories(categories));
    });
  }