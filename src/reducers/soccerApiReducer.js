import {
  SOCCER_DATA_REQUEST,
  SOCCER_DATA_SUCCESS,
  SOCCER_DATA_FAILURE,
} from '../actions/types';

const initialState = {
  leagueData: [],
  teamData: {},
  matchData: [],
};

export default function(state = initialState, action) {
  if (action.type === 'GET_LEAGUES_SUCCESS') {
    return {
      ...state,
      leagueData: action.payload,
    };
  } else if (action.type === 'GET_TEAMS_SUCCESS') {
    return {
      ...state,
      teamData: {
        ...state.teamData,
        [action.leagueId]: action.payload,
      },
    };
  }

  return state;
}
