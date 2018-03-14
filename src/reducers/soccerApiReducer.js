import {
  SOCCER_DATA_REQUEST,
  SOCCER_DATA_SUCCESS,
  SOCCER_DATA_FAILURE
} from '../actions/types';

const initialState = {
  leagueData: [],
  teamData: [],
  matchData: []
};

export default function(state = initialState, action) {
  console.log(action)
  if (
    action.type === SOCCER_DATA_SUCCESS &&
    action.url === 'https://api.football-data.org/v1/competitions'
  )
    return {
      ...state,
      leagueData: action.payload
    };

  if (action.type === SOCCER_DATA_SUCCESS && action.url.indexOf('teams') > -1) {
    console.log('yes')
    return {
      ...state,
      teamData: action.payload.teams
    };
  }

  return state;
}
