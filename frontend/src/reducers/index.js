import { combineReducers } from 'redux';
import posts from '../reducers/posts';
import categories from '../reducers/categories';
import { loadingBarReducer } from 'react-redux-loading'


export default combineReducers(
    {
        categories,
        posts ,
        loadingBar: loadingBarReducer,      
    }
);