import {FETCH_REVIEW_DATA_SUCCESS, FETCH_REVIEW_DATA_FAILURE, CREATE_REVIEW_DATA_SUCCESS, CREATE_REVIEW_DATA_FAILURE} from '../actions/types';

const initialState = {
  reviewData: [],
  err: false
}

export default function(state = initialState, action) {

  switch (action.type) {
    case FETCH_REVIEW_DATA_SUCCESS:
      return {
        ...state,
        reviewData: action.payload
      }
    case FETCH_REVIEW_DATA_FAILURE:
      return {
        ...state,
        err: action.payload
      }
      case CREATE_REVIEW_DATA_SUCCESS:
      return {
        ...state,
        reviewData: [...state.reviewData, action.payload]
      }
      case CREATE_REVIEW_DATA_FAILURE:
      return {
        ...state,
        err: action.payload
      }
    
    default:
      return state;
  }
}
