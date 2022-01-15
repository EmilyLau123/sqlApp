import mongoose from 'mongoose';
const { Schema } = mongoose;

const mongoUrl = 'mongodb+srv://emily:emily@cluster0.3i4a2.mongodb.net/sqlDb?retryWrites=true&w=majority'


mongoose.connect(mongoUrl);


//Schema of statement
const userSchema = new Schema({
    username: String,
    nickname: String,
    password: String,
    quizDone: [{quizID: Number, quizMark: Number, quizDate: {type:Date, default:Date.now}}],
    role: String,
    approved:Boolean,
    token:String,
    last_access:{type:Date, default:Date.now},
    approved_at: { type:Date, default:Date.now },
    created_at: { type:Date, default:Date.now }
    
});

export const User = mongoose.model('User', userSchema, 'users');

export default User;