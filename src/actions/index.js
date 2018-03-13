import axios from 'axios';
import {FETCH_USER_SUCCESS, FETCH_USER_ERROR} from './types';
export const fetchUser = () => dispatch => {
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER_SUCCESS, payload: res.data }))
    .catch(err => dispatch({type: FETCH_USER_ERROR, payload: err}))
};

