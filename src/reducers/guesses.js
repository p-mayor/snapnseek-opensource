import {
    CREATE_GUESS,
    CREATE_GUESS_SUCCESS,
    CREATE_GUESS_FAIL,
    GET_GUESSES,
    GET_GUESSES_SUCCESS,
    GET_GUESSES_FAIL,
    GET_GUESS_BY_ID,
    GET_GUESS_BY_ID_SUCCESS,
    GET_GUESS_BY_ID_FAIL
  } from "../actions";
  
  const initialState = {
    getGuessLoading: false,
    getGuessError: null,
    createGuessLoading: false,
    createGuessError: null,
    currentGuess: {},
    guesses: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case CREATE_GUESS:
        return state;
      case CREATE_GUESS_SUCCESS:
        return state;
      case CREATE_GUESS_FAIL:
        return state;
  
      case GET_GUESSES:
        return state;
      case GET_GUESSES_SUCCESS:
        return { ...state, guesses: action.payload };
      case GET_GUESSES_FAIL:
        return state;
  
      case GET_GUESS_BY_ID:
        return state;
      case GET_GUESS_BY_ID_SUCCESS:
        return { ...state, currentGuess: action.payload["guess"] };
      case GET_GUESS_BY_ID_FAIL:
        return state;
  
      default:
        return state;
    }
  };

