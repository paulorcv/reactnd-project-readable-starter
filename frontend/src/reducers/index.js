import { combineReducers } from 'redux';
import posts from '../reducers/posts';
import categories from '../reducers/categories';
import comments from '../reducers/comments';
import preferences from '../reducers/preferences';
import { loadingBarReducer } from 'react-redux-loading'


export default combineReducers(
    {
        categories,
        posts ,
        comments,
        loadingBar: loadingBarReducer,   
        preferences  
    }
);