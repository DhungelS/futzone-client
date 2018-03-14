import { FETCH_USER_SUCCESS, FETCH_USER_ERROR } from '../actions/types';

const initialState = {
  userData: null,
  err: false
}


export default function(state = initialState, action) {

  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload || false
      }
    case FETCH_USER_ERROR:
      return {
        ...state,
        err: action.payload
      }
    
    default:
      return state;
  }
}
