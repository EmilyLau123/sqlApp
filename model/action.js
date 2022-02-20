export const CHANGE_NICKNAME = 'CHANGE_NICKNAME';
export const CHANGE_ROLE = 'CHANGE_ROLE';
export const CHANGE_USER_ID = 'CHANGE_USER_ID';
export const CHANGE_STAT = 'CHANGE_STAT';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const REPLACE_STAT = 'REPLACE_STAT';
export const REPLACE_REWARD = 'REPLACE_REWARD';
export const CHANGE_REWARD = 'CHANGE_REWARD';

export const replaceStat = stat => ({
    type: REPLACE_STAT,
    payload: {
      stat,
    },
  });

export const changeStat = stat => ({
    type: CHANGE_STAT,
    payload: {
      stat,
    },
  });

export const changeUsername = username => ({
    type: CHANGE_USERNAME,
    payload: {
      username,
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

export const changeEmail = email => ({
    type: CHANGE_EMAIL,
    payload: {
      email,
    },
  });
  
export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  payload: {
    password,
  },
});

export const replaceReward = reward => ({
    type: REPLACE_REWARD,
    payload: {
      reward,
    },
  });

export const changeReward = reward => ({
    type: CHANGE_REWARD,
    payload: {
      reward,
    },
  });
