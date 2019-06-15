import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import auth from "./auth";
import hunts from "./hunts";
import guesses from "./guesses";
import users from "./users";

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    hunts,
    guesses,
    users
  });
