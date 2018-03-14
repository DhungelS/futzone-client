import axios from 'axios';

import {FETCH_USER_SUCCESS, FETCH_USER_ERROR, FETCH_REVIEW_DATA_SUCCESS, FETCH_REVIEW_DATA_FAILURE, CREATE_REVIEW_DATA_SUCCESS, CREATE_REVIEW_DATA_FAILURE, SOCCER_DATA_SUCCESS, SOCCER_DATA_FAILURE, soccer_data_request} from './types';

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

export const postReviewData = (values) => dispatch => {
  axios
  .post('/api/reviews', values)
  .then(res => dispatch({type: CREATE_REVIEW_DATA_SUCCESS, payload: res.data}))
  .catch(err => dispatch({type: CREATE_REVIEW_DATA_FAILURE, payload: err}))
}

export const getSoccerData = (url) => dispatch => {
  dispatch(soccer_data_request());
axios
.get(url, {headers: { 'X-Auth-Token': '515c6488f516424d97ce5b2c4090d286'}})
.then(res => dispatch({type: SOCCER_DATA_SUCCESS, payload: res.data, url}))
.catch(err => dispatch({type: SOCCER_DATA_FAILURE, payload: err}))
}