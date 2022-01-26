import * as actions from './action';

const roleInitState = {
    role: [0]
  };

const nicknameInitState = {
  nickname: ["stranger"]
};

// export const roleReducer = (state = roleInitState, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

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
  
export default nicknameReducer;

// export {authReducer};