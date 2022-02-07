import * as actions from './action';
import {USER_ROLE} from '../components/style/theme';
const statInitState = {
  stat:[]
};

const userIdInitState = {
  user_id:""
};

const roleInitState = {
    role: USER_ROLE.anonymous
  };

const nicknameInitState = {
  nickname: "stranger"
};

const usernameInitState = {
  nickname: "stranger"
};

const emailInitState = {
  email: ""
};

const passwordInitState = {
  password: ""
};

export const statReducer = (state = statInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_STAT:
    // state.nickname = [action.payload.nickname]
    // console.log(state.nickname,action.payload.nickname);
      return{
        ...state,
        // stat: action.payload.stat
        stat: [...state.stat, action.payload.stat]
        // ...state, nickname:[action.payload.nickname]
        // state
      }
    case actions.EMPTY_STAT:
    // state.nickname = [action.payload.nickname]
    // console.log(state.nickname,action.payload.nickname);
      return{
        ...state,
        // stat: action.payload.stat
        stat: action.payload.stat
        // ...state, nickname:[action.payload.nickname]
        // state
      }
    default:
      return state;
  }
};

export const usernameReducer = (state = usernameInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_USER_ID:
    // state.nickname = [action.payload.nickname]
    // console.log(state.nickname,action.payload.nickname);
      return{
        ...state,
        username: action.payload.username
        // ...state, nickname:[action.payload.nickname]
        // state
      }
    default:
      return state;
  }
};

export const userIdReducer = (state = userIdInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_USER_ID:
    // state.nickname = [action.payload.nickname]
    // console.log(state.nickname,action.payload.nickname);
      return{
        ...state,
        user_id: action.payload.user_id
        // ...state, nickname:[action.payload.nickname]
        // state
      }
    default:
      return state;
  }
};

export const roleReducer = (state = roleInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_ROLE:
    // state.nickname = [action.payload.nickname]
    // console.log(state.nickname,action.payload.nickname);
      return{
        ...state,
        role: action.payload.role
        // ...state, nickname:[action.payload.nickname]
        // state
      }
    default:
      return state;
  }
};

export const nicknameReducer = (state = nicknameInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_NICKNAME:
    // state.nickname = [action.payload.nickname]
    // console.log(state.nickname,action.payload.nickname);
      return{
        ...state,
        nickname: action.payload.nickname
        // ...state, nickname:[action.payload.nickname]
        // state
      }
    default:
      return state;
  }
};
  
export const emailReducer = (state = emailInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_EMAIL:
    // state.nickname = [action.payload.nickname]
    // console.log(state.nickname,action.payload.nickname);
      return{
        ...state,
        email: action.payload.email
        // ...state, nickname:[action.payload.nickname]
        // state
      }
    default:
      return state;
  }
};

export const passwordReducer = (state = passwordInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_PASSWORD:
    // state.nickname = [action.payload.nickname]
    // console.log(state.nickname,action.payload.nickname);
      return{
        ...state,
        password: action.payload.password
        // ...state, nickname:[action.payload.nickname]
        // state
      }
    default:
      return state;
  }
};
// export default nicknameReducer;
// export default roleReducer;


// export {authReducer};