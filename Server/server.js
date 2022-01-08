import express from 'express';
const app = express();
import {findStatement} from './model/statement.js';
import mongoose from 'mongoose';
const { Schema } = mongoose;
//CRUD
//Create

//Read


//Update

//Delete


app.get('/Statements',function(req,res){
    var re = findStatement();
    console.log("re",re);
    //res.status(200).json(re);
});

const server = app.listen(19006,function(){
    var host = server.address();
    var port = server.address().port;
    console.log(host);


})