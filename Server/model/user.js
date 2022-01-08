import mongoose from 'mongoose';
//const { Schema } = mongoose;

const mongoUrl = 'mongodb+srv://emily:emily@cluster0.3i4a2.mongodb.net/user?retryWrites=true&w=majority'


function main() {
    await mongoose.connect('mongodb://localhost/users');

}

//Schema of statement
const userSchema = new Schema({
    name: String,
    nickName: String,
    icon: String,
    quizDone: [{quizID: Number, quizMark: Number, quizDate: Date}],
    role: String,
    approved:Boolean,
    token:String,
    last_access:{type:Date, default:Date.now},
    approved_at: { type:Date, default:Date.now },
    created_at: { type:Date, default:Date.now }
    
});

export default userSchema;