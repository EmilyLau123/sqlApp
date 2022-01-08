var mongoose = require('mongoose');
const { Schema } = mongoose;

const mongoUrl = 'mongodb+srv://emily:emily@cluster0.3i4a2.mongodb.net/quizes?retryWrites=true&w=majority'


function main() {
  await mongoose.connect('mongodb://localhost/quizes');

}

//Schema of statement
const quizeSchema = new Schema({
    category: String,
    question: String,
    difficulty: {type: String, enum:['Easy', 'Medium','Hard']},
    answer:String,
    format:String,
    image: String,
    author: String,
    approved:Boolean,
    submited_at: { type:Date, default:Date.now },
    approved_at: { type:Date, default:Date.now },
});

export default quizeSchema;