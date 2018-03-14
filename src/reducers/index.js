import {combineReducers} from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import soccerApiReducer from './soccerApiReducer';

export default combineReducers({
  auth: authReducer,
  review: reviewReducer,
  soccerData: soccerApiReducer
});