import { RECEIVE_CATEGORIES, SET_CATEGORIES_FILTER } from '../actions/categories';

export default function categories( state={}, action){
    switch(action.type){
        case RECEIVE_CATEGORIES:
            return{
                ...state,
                ...action.categories
            }

        case SET_CATEGORIES_FILTER:
            console.log('state');
            console.log(state);            
            const indexFilter = Object.keys(state).filter(id => state[id].name.trim() === action.filter);
            console.log('indexFilter:');
            console.log(indexFilter);

            let categoryFiltered = {
                [''+indexFilter[0]+'']:{
                    ...state[indexFilter]
                }                    
            }            
            console.log('categoryFiltered:');
            console.log(categoryFiltered);
            return categoryFiltered;            
            
            default:
                return state;
    }
}
