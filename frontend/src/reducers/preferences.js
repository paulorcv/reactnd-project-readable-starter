import { ORDER_BY } from '../actions/preferences';

export default function preferences(state = {orderBy: 'newest'}, action) {
  switch (action.type) {
    case ORDER_BY:
    return {
        orderBy: action.orderBy,
      };
    default:
      return state;
  }
}
