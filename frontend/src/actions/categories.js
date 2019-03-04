import { showLoading, hideLoading } from 'react-redux-loading'
import { getCategories } from '../api/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SET_CATEGORIES_FILTER = 'SET_CATEGORIES_FILTER';

export function setCategoriesFilterAction(filter){
    return{
        type : SET_CATEGORIES_FILTER,
        filter
    }
}

export function receiveCategoriesAction(categories){
    return{
        type : RECEIVE_CATEGORIES,
        categories
    }
}

// export function handleReceiveCategories() {
//     return dispatch => getCategories().then((categories) => {
//       dispatch(receiveCategories(categories));
//     });
//   }

  export function handleReceiveCategories(){
    return(dispatch) =>{
        dispatch(showLoading())
        return getCategories()
            .then(({categories}) =>{
                dispatch(receiveCategoriesAction(categories));                
                dispatch(hideLoading())
            });
    }
}