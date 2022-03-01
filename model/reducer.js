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

const rewardInitState = {
  reward:[]
};

export const statReducer = (state = statInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_STAT:
      return{
        ...state,
        stat: [...state.stat, action.payload.stat]
      }
    case actions.REPLACE_STAT:
      return{
        ...state,
        stat: action.payload.stat
      }
    default:
      return state;
  }
};

export const rewardReducer = (state = rewardInitState, action) => {
  switch (action.type) {
    case actions.REPLACE_REWARD:
      return{
        ...state,
        reward: action.payload.reward
      }
    case actions.CHANGE_REWARD:
      return{
        ...state,
        reward: [...state.reward, action.payload.reward]
      }
    default:
      return state;
  }
};

export const usernameReducer = (state = usernameInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_USERNAME:
      return{
        ...state,
        username: action.payload.username
      }
    default:
      return state;
  }
};

export const userIdReducer = (state = userIdInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_USER_ID:
      return{
        ...state,
        user_id: action.payload.user_id
      }
    default:
      return state;
  }
};

export const roleReducer = (state = roleInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_ROLE:
      return{
        ...state,
        role: action.payload.role
      }
    default:
      return state;
  }
};

export const nicknameReducer = (state = nicknameInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_NICKNAME:
      return{
        ...state,
        nickname: action.payload.nickname
      }
    default:
      return state;
  }
};
  
export const emailReducer = (state = emailInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_EMAIL:
      return{
        ...state,
        email: action.payload.email
      }
    default:
      return state;
  }
};

export const passwordReducer = (state = passwordInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_PASSWORD:
      return{
        ...state,
        password: action.payload.password
      }
    default:
      return state;
  }
};


// export default nicknameReducer;
// export default roleReducer;


// export {authReducer};