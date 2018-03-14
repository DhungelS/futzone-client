import axios from 'axios';

import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_REVIEW_DATA_SUCCESS,
  FETCH_REVIEW_DATA_FAILURE,
  CREATE_REVIEW_DATA_SUCCESS,
  CREATE_REVIEW_DATA_FAILURE,
  SOCCER_DATA_SUCCESS,
  SOCCER_DATA_FAILURE,
  soccer_data_request,
} from './types';

const BASE_URL = 'https://api.football-data.org/v1';

export const fetchUser = () => dispatch => {
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: FETCH_USER_ERROR, payload: err }));
};

export const fetchReviewData = () => dispatch => {
  axios
    .get('/api/reviews')
    .then(res =>
      dispatch({ type: FETCH_REVIEW_DATA_SUCCESS, payload: res.data }),
    )
    .catch(err => dispatch({ type: FETCH_REVIEW_DATA_FAILURE, payload: err }));
};

export const postReviewData = values => dispatch => {
  axios
    .post('/api/reviews', values)
    .then(res =>
      dispatch({ type: CREATE_REVIEW_DATA_SUCCESS, payload: res.data }),
    )
    .catch(err => dispatch({ type: CREATE_REVIEW_DATA_FAILURE, payload: err }));
};

export const getLeagues = () => dispatch => {
  dispatch({ type: 'GET_LEAGUES_REQUEST' });

  axios
    .get(`${BASE_URL}/competitions`, {
      headers: { 'X-Auth-Token': '515c6488f516424d97ce5b2c4090d286' },
    })
    .then(res => {
      return dispatch({ type: 'GET_LEAGUES_SUCCESS', payload: res.data });
    })
    .catch(err => dispatch({ type: 'GET_LEAGUES_ERROR', payload: err }));
};

export const getTeams = (url, leagueId) => (dispatch, getState) => {
  dispatch({ type: 'GET_TEAMS_REQUEST' });

  const { teamData } = getState().soccerData;

  if (teamData[leagueId] && teamData[leagueId].length > 0) {
    dispatch({ type: 'TEAM_ALREADY_HERE' });
    return;
  }

  axios
    .get(url, {
      headers: { 'X-Auth-Token': '515c6488f516424d97ce5b2c4090d286' },
    })
    .then(res => {
      return dispatch({
        type: 'GET_TEAMS_SUCCESS',
        payload: res.data.teams,
        leagueId,
      });
    })
    .catch(err => dispatch({ type: 'GET_TEAMS_ERROR', payload: err }));
};
