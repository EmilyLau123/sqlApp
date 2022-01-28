import * as actions from './action';

const statInitState = {
  stat:[]
};

const userIdInitState = {
  user_id:""
};

const roleInitState = {
    role: 4
  };

const nicknameInitState = {
  nickname: "stranger"
};

export const statReducer = (state = statInitState, action) => {
  switch (action.type) {
    case actions.CHANGE_STAT:
    // state.nickname = [action.payload.nickname]
    // console.log(state.nickname,action.payload.nickname);
      return{
        ...state,
        stat: action.payload.stat
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
  
// export default nicknameReducer;
// export default roleReducer;


// export {authReducer};