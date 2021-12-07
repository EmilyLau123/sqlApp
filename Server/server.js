const express = require('express')
var mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const app = express();

const mongoUrl = 'mongodb+srv://emily:emily@cluster0.3i4a2.mongodb.net/sqlDb?retryWrites=true&w=majority'

app.get('/statements',function(){
    console.log("client...");
    mongoose.connect(mongoUrl)
            .catch(error => console.log(error));
    // mongoose.connect('mongodb://localhost:19006/MyDb',
    //     {useMongoClient: true,}
    // );
    console.log("In...");
    //var statements = mongoose.model('statements', statementsSchema);
    const statementsSchema = new mongoose.Schema({});
    const Statement = mongoose.model('Statements', statementsSchema, 'statements');
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', (callback) => {
        console.log("retrieving...");
        
        Statement.find(function(err, results){
            if(err){
                return console.log(err);
            }
            db.close();
            return console.log(results);
        });
    });
});

const server = app.listen(19006,function(){
    var host = server.address();
    var port = server.address().port;
    console.log(host);


})