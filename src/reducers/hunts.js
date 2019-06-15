import {
  CREATE_HUNT,
  CREATE_HUNT_SUCCESS,
  CREATE_HUNT_FAIL,
  GET_HUNTS,
  GET_HUNTS_SUCCESS,
  GET_HUNTS_FAIL,
  GET_HUNT_BY_ID,
  GET_HUNT_BY_ID_SUCCESS,
  GET_HUNT_BY_ID_FAIL
} from "../actions";

const initialState = {
  getHuntsLoading: false,
  getHuntsError: null,
  createHuntsLoading: false,
  createHuntsError: null,
  currentHunt: {},
  hunts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_HUNT:
      return state;
    case CREATE_HUNT_SUCCESS:
      return state;
    case CREATE_HUNT_FAIL:
      return state;

    case GET_HUNTS:
      return state;
    case GET_HUNTS_SUCCESS:
      return { ...state, hunts: action.payload };
    case GET_HUNTS_FAIL:
      return {...state, getHuntsError: action.payload.err.hunt};

    case GET_HUNT_BY_ID:
      return state;
    case GET_HUNT_BY_ID_SUCCESS:
      return { ...state, currentHunt: action.payload["target"] };
    case GET_HUNT_BY_ID_FAIL:
      return state;

    default:
      return state;
  }
};
