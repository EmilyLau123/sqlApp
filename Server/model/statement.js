//var mongoose = require('mongoose');
import mongoose from 'mongoose';
const { Schema } = mongoose;
//import mongoose from 'mongoose';


const mongoUrl = 'mongodb+srv://emily:emily@cluster0.3i4a2.mongodb.net/sqlDb?retryWrites=true&w=majority'


mongoose.connect(mongoUrl);

//Schema of statement
const statementSchema = new Schema({
    title: String,
    description: String,
    images: String,
    hidden:{type:Number, enum:[0,1]},
    // submited_at: { type:Date, default:Date.now },
    // approved_at: { type:Date, default:Date.now },
    // author: String,

});
//model
export const Statement = mongoose.model('Statement', statementSchema, 'statements');

//CRUD
//Create
export const createStatement= (title, author, description, image, approved, submited_at, created_at) =>{
  const newStatement = new Statement({
      title: title,
      author: author,
      description: description,
      image: image,
      approved:approved,
      submited_at:submited_at,
      created_at:created_at
    });
    newStatement.save(function (err){
      if (err) console.log(err);
      console.log("created");
    });
    
}

//update
export const updateStatement= (Id) =>{
  Statement.findById(Id,function(err,docs){
      if (err) console.log(err);
      console.log(docs);
  });
}
//Delete
export const removeStatement= (Id) =>{
  Statement.findById(Id,function(err,docs){
      docs.remove();
      if (err) console.log(err);
      console.log("Deleted");
  });
}
