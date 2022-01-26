export const CHANGE_NICKNAME = 'CHANGE_NICKNAME';
export const changeNickname = nickname => ({
    type: CHANGE_NICKNAME,
    payload: {
      nickname,
    },
  });