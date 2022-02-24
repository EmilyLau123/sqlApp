import {Dimensions, StyleSheet} from 'react-native';


export const COLORS = {
    primary:"#5facdd",
    secondary: "#77afac",

    attention:"#d9cc35",
    black: "#61696f",
    white:"#eeefef",

    background:"#004274",

}

export const SIZES = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    round:5,
    icon: 15,
    text: 13,
    title: 16,
    padding:5,
    margin:5,
    tabBarheight:90,
    listPaddingBottom: 180

}

export const ICONS = {
    approved: 'checkmark-circle-outline',
    rejected: 'close-circle-outline',
    waiting: 'clipboard',
    banned: 'skull-outline',
    others: 'help-outline',
    retrieved: 'happy',
    notRetrieved: 'happy-outline',

}

export const STRINGS = {
    home: "Home",
    statements: "Statements",
    statementDetail: "Statement Detail",
    account: "Account",
    accountSetting: "Account Setting",
    userList: "User List",
    requestList: "Request List",
    logOut: "Log Out",
    login: "Login",
    signIn: "Sign In",
    submitHistory: "View History"

}

export const USER_STATUS = {
    approved: 1,
    rejected: 2,
    waiting: 3,
    banned: 4

}

export const USER_ROLE = {
    student: 0,
    teacher: 1,
    admin: 2,
    anonymous: 3
}

export const REQUEST_STATUS = {
    approved: 1,
    rejected: 2,
    waiting: 3,

}

export const DIFFICULTY = {
    easy: 0,
    medium: 1,
    hard: 2,

}

export const ANSWER = {
    option1: 0,
    option2: 1,
    option3: 2,
    option4: 3,
}

export const REWARDS = [
    "First quiz that got all correct !!",
    "First quiz that got all wrong !!",
    "Earn accumnlate 30 points in quizzes !!",
    "Earn accumnlate 70 points in quizzes !!",
    "doQuiz5days",
    "doQuiz10days"
]

export const STYLES = StyleSheet.create({
    input: {
      height: 40,
      margin: 10,
      borderWidth: 1,
      padding: 5,
      borderRadius: 4,
  },
  });