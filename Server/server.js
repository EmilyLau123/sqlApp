import express from 'express';
const app = express();
import {Statement} from './model/statement.js';
import mongoose from 'mongoose';
const { Schema } = mongoose;
//CRUD
//Create

//Read


//Update

//Delete


app.get('/statements',function(req,res){
    //Read
    Statement.find({},function(err,docs){
        if (err) console.log(err);
        console.log(docs);
        res.json(docs);
    });
  
});

app.get('/Test',function(req,res){
    res.json("Backend");
    //res.status(200).json(re);
});

const server = app.listen(19009,function(){
    var host = server.address();
    var port = server.address().port;
    console.log(host);


})