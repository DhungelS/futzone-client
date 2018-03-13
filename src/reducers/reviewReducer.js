import {FETCH_REVIEW_DATA_SUCCESS, FETCH_REVIEW_DATA_FAILURE} from '../actions/types';

const initialState = {
  reviewData: [],
  err: false
}

export default function(state = initialState, action) {
console.log(action)
  switch (action.type) {
    case FETCH_REVIEW_DATA_SUCCESS:
      return {
        ...state,
        reviewData: action.payload
      }
    case FETCH_REVIEW_DATA_FAILURE:
      return {
        ...state,
        reviewData: action.payload,
        err: true
      }
    
    default:
      return state;
  }
}
