import { RECEIVE_CATEGORIES, SET_CATEGORIES_FILTER } from '../actions/categories';

export default function categories( state={}, action){
    switch(action.type){
        case RECEIVE_CATEGORIES:
            return{
                ...state,
                ...action.categories
            }

        case SET_CATEGORIES_FILTER:
            
           const indexFilter = Object.keys(state).filter(id => state[id].name.trim() === action.filter);
            let categoryFiltered = {
                [indexFilter[0]]:{
                    ...state[indexFilter]
                }                    
            }            
            return categoryFiltered;            
            
            default:
                return state;
    }
}
