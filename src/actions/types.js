export const FETCH_USER_SUCCESS = 'fetch_user_success';
export const FETCH_USER_ERROR = 'fetch_user_error';
export const FETCH_REVIEW_DATA_SUCCESS = 'fetch_review_data_sucess';
export const FETCH_REVIEW_DATA_FAILURE = 'fetch_review_data_failure';
export const CREATE_REVIEW_DATA_SUCCESS = 'create_review_data_sucess';
export const CREATE_REVIEW_DATA_FAILURE = 'create_review_data_failure';
export const SOCCER_DATA_REQUEST = 'SOCCER_DATA_REQUEST';
export const soccer_data_request = () => ({
  type: SOCCER_DATA_REQUEST,
  

});
export const SOCCER_DATA_SUCCESS = 'fetch_soccer_data_success';
export const soccer_data_success= (url) => ({
  type: SOCCER_DATA_SUCCESS,
  url

});

export const SOCCER_DATA_FAILURE = 'fetch_soccer_data_success';
