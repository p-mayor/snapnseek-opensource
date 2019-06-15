import { domain, jsonHeaders, handleJsonResponse } from "./constants";

// action types
export const GET_HUNTS = "GET_HUNTS";
export const GET_HUNTS_SUCCESS = "GET_HUNTS_SUCCESS";
export const GET_HUNTS_FAIL = "GET_HUNTS_FAIL";
export const END_OF_HUNTS = "END_OF_HUNTS";
export const GET_HUNT_BY_ID = "GET_HUNT_BY_ID";
export const GET_HUNT_BY_ID_SUCCESS = "GET_HUNT_BY_ID_SUCCESS";
export const GET_HUNT_BY_ID_FAIL = "GET_HUNT_BY_ID_FAIL";
export const CREATE_HUNT = "CREATE_HUNT";
export const CREATE_HUNT_SUCCESS = "CREATE_HUNT_SUCCESS";
export const CREATE_HUNT_FAIL = "CREATE_HUNT_FAIL";

const url = domain + "/targets";
export const getHunts = () => dispatch => {
  dispatch({
    type: GET_HUNTS
  });

  return fetch(url, {
    method: "GET",
    headers: jsonHeaders
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: GET_HUNTS_SUCCESS,
        payload: result.targets
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: GET_HUNTS_FAIL, payload: err.hunt })
      );
    });
};

export const getHuntById = huntId => (dispatch, getState) => {
  dispatch({
    type: GET_HUNT_BY_ID
  });

  return fetch(url + `/${huntId}`, {
    method: "GET",
    headers: jsonHeaders
  })
    .then(handleJsonResponse)
    .then(result => {
      let index = getState().hunts.hunts.findIndex(hunt => hunt.id === huntId);
      return dispatch({
        type: GET_HUNT_BY_ID_SUCCESS,
        payload: result,
        index: index
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: GET_HUNT_BY_ID_FAIL, payload: err.hunt })
      );
    });
};

export const createHunt = huntData => (dispatch, getState) => {
  dispatch({
    type: CREATE_HUNT
  });

  return fetch(url, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getState().auth.login.token}`
    },
    body: huntData
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: CREATE_HUNT_SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: CREATE_HUNT_FAIL, payload: err.message })
      );
    });
};

export const createHuntThenGetHunts = huntData => dispatch => {
  return dispatch(createHunt(huntData)).then(() => dispatch(getHunts()));
};

export default getHunts;
