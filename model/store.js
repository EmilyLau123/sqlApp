import {createStore, combineReducers} from "redux";
import nicknameReducer from "./reducer.js";

// const authReducer = combineReducers({
//     // roleReducer,
//     nicknameReducer,
//   });
// createStore
  
// const authReducer = createStore(
//     // roleReducer,
//     nicknameReducer
//   );

const store = createStore(nicknameReducer);

export default store;
