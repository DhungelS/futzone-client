import axios from 'axios';
import {FETCH_USER_SUCCESS, FETCH_USER_ERROR, FETCH_REVIEW_DATA_SUCCESS, FETCH_REVIEW_DATA_FAILURE} from './types';
export const fetchUser = () => dispatch => {
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER_SUCCESS, payload: res.data }))
    .catch(err => dispatch({type: FETCH_USER_ERROR, payload: err}))
};

export const fetchReviewData = () => dispatch => {
  axios
  .get('/api/reviews')
  .then(res => dispatch({type: FETCH_REVIEW_DATA_SUCCESS, payload: res.data}))
  .catch(err => dispatch({type: FETCH_REVIEW_DATA_FAILURE, payload: err}))
}

