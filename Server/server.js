import express from 'express';
const app = express();
import {Statement} from './model/statement.js';
import {User} from './model/user.js';
import mongoose from 'mongoose';
const { Schema } = mongoose;
import bodyParser from 'body-parser';

// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
// app.use(express.json());
// //app.use(bodyParser);
// //Statement CRUD
// //Create
// app.get('/api/insertStatement/', function(req,res){
//     Statement.insertMany([{
//         title: "String",
//         author: "String",
//         description: "String",
//         image: "",
//         approved:false
//     }], function(err){
//         res.send(err);
//     })
// });
// //Read
// app.get('/api/retrieveStatements/',function(req,res){
//     Statement.find({},function(err,docs){
//         if (err) console.log(err);
//         console.log(docs);
//         res.json(docs);
//     });
// });

// //Update
// app.get('/api/updateStatement/', function(){
//     var ObjectId = mongoose.Types.ObjectId; 

//     Statement.updateOne({name:'test'}, {name:'updated'}, function(err){
//         if (err) console.log(err);
//         console.log("updated");
//     })
// });
// //Delete
// app.get('/api/deleteStatement/', function(){
//     Statement.deleteOne({_id:"61af3ac667b26c3314b3439b"}, function(err){
//         if (err) console.log(err);
//         console.log("deleted");

//     })
// });

// //Quiz CRUD
// //Create
// //SubmitForm
// app.get('/api/insertQuiz/', function(){

// });
// //Read
// app.get('/api/retrieveQuiz/',function(req,res){
//     Statement.find({},function(err,docs){
//         if (err) console.log(err);
//         console.log(docs);
//         res.json(docs);
//     });
// });
// //Update
// //Admin edit
// app.get('/api/updateQuiz/', function(){

// });
// //Delete
// //Admin edit
// app.get('/api/deleteQuiz/', function(){

// });

// //User CRUD

// //Create
// //SignUp
// app.post('/api/insertUser/', function(req, res){
//     console.log('BODY',req.body);
//     // User.insertMany({
//     //     username: req.body.username,
//     //     nickName: req.body.nickname,
//     //     password: req.body.password,
//     //     quizDone: [{quizID: 1, quizMark: 5}],
//     //     role: req.body.role,
//     //     approved:true,
//     //     token:"String"
//     // },function(req,err){
//     //     console.log(err);
//     //     console.log(req);

//     // })
// });
// //Read
// //SignUp (check duplication), SignIn, Account, Home
// app.get('/api/retrieveUser/',function(req,res){
//     Statement.find({},function(err,docs){
//         if (err) console.log(err);
//         console.log(docs);
//         res.json(docs);
//     });
// });
// //Update
// //Account setting, admin ban user
// app.get('/api/updateUser/', function(){

// });
// //Delete
// //admin 
// app.get('/api/deleteUser/', function(){

// });
// //others
app.get('/', function(req,res){
    res.json("home");
});
// app.get('/api/', function(req,res){
//     res.json("api");
// });


// app.get('/api/test/',function(req,res){
//     res.json("Backend");
//     //res.status(200).json(re);
// });

// const server = app.listen(8099,function(){
//     var host = server.address();
//     var port = server.address().port;
//     console.log(host);


// })
//process.env.PORT || 
app.listen(process.env.PORT || 8099);
console.log(process.env.PORT);
// const server = app.listen(process.env.PORT || 8099, () => {
// const port = server.address().port;
// console.log(`Server listening at port ${port}`);
// });

