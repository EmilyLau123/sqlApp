export const CHANGE_NICKNAME = 'CHANGE_NICKNAME';
export const CHANGE_ROLE = 'CHANGE_ROLE';
export const CHANGE_USER_ID = 'CHANGE_USER_ID';
export const CHANGE_STAT = 'CHANGE_STAT';


export const changeStat = stat => ({
    type: CHANGE_STAT,
    payload: {
      stat,
    },
  });

export const changeNickname = nickname => ({
    type: CHANGE_NICKNAME,
    payload: {
      nickname,
    },
  });

export const changeRole = role => ({
  type: CHANGE_ROLE,
  payload: {
    role,
  },
});

export const changeUserId = user_id => ({
  type: CHANGE_USER_ID,
  payload: {
    user_id,
  },
})