var mongoose = require('mongoose');
const { Schema } = mongoose;

const mongoUrl = 'mongodb+srv://emily:emily@cluster0.3i4a2.mongodb.net/quizes?retryWrites=true&w=majority'


function main() {
  await mongoose.connect('mongodb://localhost/quizes');

}

//Schema of statement
const quizeSchema = new Schema({
    question: String,
    difficulty: {type: String, enum:['Easy', 'Medium','Hard']},
    answer:{type: Number, enum:[0,1,2,3]},
    options:[String, String, String, String],
    images: String,
    author: String,
    status:Number,
    submited_at: { type:Date, default:Date.now },
    approved_at: { type:Date, default:Date.now },
});

export default quizeSchema;