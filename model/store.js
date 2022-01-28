import {createStore, combineReducers} from "redux";
import {statReducer,nicknameReducer, roleReducer, userIdReducer} from "./reducer.js";
// import roleReducer from "./reducer.js";


const authReducer = combineReducers({
    roleReducer,
    nicknameReducer,
    userIdReducer,
    statReducer
  });

const store = createStore(authReducer);
// const store = createStore(authReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// export const nicknameStore = createStore(nicknameReducer);
// export const roleStore = createStore(roleReducer);


export default store;
