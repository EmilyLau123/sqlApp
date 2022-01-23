
const express = require('express');
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
var Schema = mongoose.Schema;
const MongoClient = require("mongodb").MongoClient;
const assert = require('assert');
const app = express();
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');
const fs = require('fs');




const USER_ROLE = {
    student : 0,
    teacher : 1,
    admin : 2

}

const USER_STATUS = {
    approved: 1,
    rejected: 2,
    waiting: 3,
    banned: 4
}

//body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

//DB info
const mongoUrl = 'mongodb+srv://emily:emily@cluster0.3i4a2.mongodb.net/sqlDb?retryWrites=true&w=majority'
const dbName = "sqlDb";


mongoose.connect(mongoUrl);

//Schema of statement
const statementSchema = new Schema({
    title: String,
    author: String,
    description: String,
    image: String,
    approved:Boolean,
    submited_at: { type:Date, default:Date.now },
    approved_at: { type:Date, default:Date.now },
});
//model
const Statement = mongoose.model('Statement', statementSchema, 'statements');



//Db driver
const findDocument = (db, criteria, limit, collection, callback) => {
    // if(criteria == ''){
    // if(limit = 0){
    //     var cursor = db.collection(collection).find(criteria);
    // }else{
    console.log(criteria);

    if(limit == 10){
        var cursor = db.collection(collection).aggregate([
            { $match: criteria },
            { $sample: { size: limit } }
        ]);
    }else{
        var cursor = db.collection(collection).find(criteria).limit(limit);
    }
        
    // }
    // }else{
    //     criteria = JSON.stringify(criteria).replaceAll('"','');
    //     var cursor = db.collection('inventories').find({name:criteria});
    // }
    // console.log(criteria);
    
    // console.log(`findDocument: ${JSON.stringify(criteria)}`);
    cursor.toArray((err,docs) => {
        assert.equal(err,null);
        // console.log(`findDocument: ${docs.length}`);
        // console.log(`Document: ${JSON.stringify(docs[0])}`);
        callback(docs);
    });
};

const insertDocument = (db, collection, doc, callback) => {
    db.collection(collection).insertOne(doc, (err, result) => {
            assert.equal(err,null);
            console.log("inserted one document " + JSON.stringify(doc));
            callback(result);
        });
    };

const updateDocument = (db,criteria, collection, doc, callback) => {
    db.collection(collection).updateOne(criteria, doc, (err, result) => {
            assert.equal(err,null);
            console.log("updated one document " + JSON.stringify(doc));
            callback(result);
        });
    };

const deleteDocument = (db, criteria, collection, callback) => {
    db.collection(collection).deleteOne(criteria, (err, result) => {
            assert.equal(err,null);
            console.log("Deleted one document " + JSON.stringify(result));
            callback(result);
        });
    };

//https://mufyptest.herokuapp.com/
app.get('/', function(req,res){
    res.status(200).json("home");
});

//Login
app.post('/api/user/login/', function(req,res){
    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to statement server");
        const db = client.db(dbName);
        const collection = 'users';
        const limit = 1;
        const username = req.body.username;
        const password = req.body.password;
        const criteria = {};
        criteria['username'] = username;
        criteria['password'] = password;


        findDocument(db, criteria, limit, collection, (docs) => { 
            client.close();
            console.log("Closed DB connection");
            //res.status(200).render('list',{ninventories: docs.length, inventories: docs});
            // let result = `${JSON.stringify(docs)}`
            res.status(200).json(docs);
            });
        });
});


//Read Statement for displaying list for student and teacher
// app.get('/api/retrieveStatements/:amount',function(req,res){
app.get('/api/statements/find/:searchText',function(req,res){
    // const amount = req.params.amount;
    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to statement server");
        const db = client.db(dbName);
        // if(amount == 'ALL'){
        //     const criteria = '';
        // }else{
        // const criteria = '{hidden:0}';
        // }
        const criteria = {};
        const searchText = req.params.searchText;
        console.log(searchText);
        var regex = new RegExp('^'+searchText);

        if(searchText != ""){
            criteria['title'] = {$regex: regex};
        }else{
            criteria['title'] = {$regex: /[a-zA-Z]/};

        }

        criteria['hide'] = 0;
        
        const collection = 'statements';
        const limit = 0;


        findDocument(db, criteria, limit,collection, (docs) => {
            client.close();
            console.log("Closed DB connection");
            //res.status(200).render('list',{ninventories: docs.length, inventories: docs});
            // let result = `${JSON.stringify(docs)}`
            res.status(200).json(docs);
            });
        });
});


//Add statement
app.post('/api/statement/insert/',function(req,res){
    // console.log('body',req.body);
    // console.log('params',req.params);
    // console.log('req',req);

    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to statement server");
        const db = client.db(dbName);
        
        const doc = {
            title:req.body.title,
            description: req.body.description,
            hide: 0,//auto approve for student
            submitted_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

            };
        
        const collection = 'statements';

        if (req.body.images.length > 0) {
            doc['images'] = req.body.images;
          
                // doc['images'] = "data:image/jpg;base64,"+new Buffer.from(req.body.images[0]).toString('base64');
      
    }

        insertDocument(db, collection, doc, (docs) => {
            client.close();
            console.log("Closed DB connection");
            // res.json(docs);
            res.status(200).json(docs);
            });
        });
});

//Read User
app.get('/api/find/users/',function(req,res){
    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to user server");
        const db = client.db(dbName);
        const criteria = '';
        const collection = 'users';
        const limit = 0;

        
        findDocument(db, criteria, limit, collection, (docs) => { 
            client.close();
            console.log("Closed DB connection");
            res.status(200).json(docs);
            });
        });
});

//Delete User
app.post('/api/user/delete/',function(req,res){
    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to user server");
        const db = client.db(dbName);
        const criteria = {};
        const collection = 'users';
        const limit = 1;
        criteria['_id'] = ObjectID(req.body.user_id)

        deleteDocument(db, criteria, collection, (docs) => { 
            client.close();
            console.log("Closed DB connection");
            res.status(200).json(docs);
            });
        });
});




//Read Quiz Request
app.get('/api/requests/find/',function(req,res){
    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to request server");
        const db = client.db(dbName);
        const criteria = '';
        criteria['hide'] = 0;
        const collection = 'questions';
        const limit = 0;

        
        findDocument(db, criteria, limit, collection, (docs) => {
            client.close();
            console.log("Closed DB connection");
            res.status(200).json(docs);
            });
        });
});

//Read Quiz questions
app.get('/api/questions/find/',function(req,res){
    const client = new MongoClient(mongoUrl);

    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to request server");
        const db = client.db(dbName);
        const criteria = "";
        const collection = 'questions';
        const limit = 0;

        findDocument(db, criteria, limit, collection, (docs) => {
            client.close();
            console.log("Closed DB connection");
            res.status(200).json(docs);
            });
        });
});

app.get('/api/questions/find/difficulty/:difficulty',function(req,res){
    const client = new MongoClient(mongoUrl);
    const  selectedDifficulty = req.params.difficulty;
    console.log("selectedDifficulty: ",selectedDifficulty);

    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to request server");
        const db = client.db(dbName);
        const criteria = {};
        criteria['status'] = 1;
        criteria['difficulty'] = parseInt(selectedDifficulty);

        console.log("criteria",criteria);
        const limit = 10;
        const collection = 'questions';

        

        findDocument(db, criteria, limit, collection, (docs) => {
            client.close();
            console.log("Closed DB connection");
            docs?res.status(200).json(docs):res.status(500).json(docs);
            
            });
        });
});

//Add user
app.post('/api/user/insert/',function(req,res){
    // console.log('body',req.body);
    // console.log('params',req.params);
    // console.log('req',req);

    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to request server");
        const db = client.db(dbName);
        var fin_status = 0;
        console.log(req.body.role);
        if(req.body.role == USER_ROLE.student){
            fin_status = USER_STATUS.approved;
        }else{
            fin_status = USER_STATUS.waiting;
        }
        const doc = {
            username: req.body.username,
            nickname: req.body.nickname,
            password: req.body.password,
            quizDone: [],
            role: req.body.role,
            status: fin_status,//auto approve for student
            submitted_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

            };
        
        const collection = 'users';

        insertDocument(db, collection, doc, (docs) => {
            client.close();
            console.log("Closed DB connection");
            // res.json(docs);
            res.status(200).json(docs);
            });
        });
});

//Change User status
app.post('/api/user/status/change/',function(req,res){
    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to user server");
        const db = client.db(dbName);
        const criteria = {};
        const collection = 'users';
        const date = moment().format('YYYY-MM-DD HH:mm:ss');
        const doc = {$set:{status:req.body.status,
                            updated_at: date
                            },
                    };
        criteria['_id'] = ObjectID(req.body.user_id)

        updateDocument(db,criteria, collection, doc, (docs) => { 
            client.close();
            console.log("Closed DB connection");
            res.status(200).json(docs);
            });
        });
});

//Add quiz
app.post('/api/question/insert/',function(req,res){
    // console.log('body',req.body);
    // console.log('params',req.params);
    // console.log('req',req);

    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to quiz server");
        const db = client.db(dbName);
        const status = 1;
        const doc = {
            question: req.body.question,
            difficulty: req.body.difficulty,
            answer: req.body.answer,
            options: req.body.options,
            author:req.body.author,
            status:status,//auto approve for student,
            submitted_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            updated_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')

        };
        const collection = 'questions';

        insertDocument(db, collection, doc, (docs) => {
            client.close();
            console.log("Closed DB connection");
            // res.json(docs);
            console.log(docs);

            res.status(200).json(docs);
            });
        });
});

//Change User status
app.post('/api/question/status/change/',function(req,res){
    const client = new MongoClient(mongoUrl);
    console.log(req.body.status);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to question server");
        const db = client.db(dbName);
        const criteria = {};
        const collection = 'questions';
        const date = moment().format('YYYY-MM-DD HH:mm:ss');
        const doc = {$set:{status:req.body.status,
                            updated_at: date
                            },
                    };
        criteria['_id'] = ObjectID(req.body.question_id)

        updateDocument(db,criteria, collection, doc, (docs) => { 
            client.close();
            console.log("Closed DB connection");
            res.status(200).json(docs);
            });
        });
});

//Delete a question
app.post('/api/question/delete/',function(req,res){
    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to question server! ", req.body.question_id);
        const db = client.db(dbName);
        const criteria = {};
        const collection = 'questions';
        const limit = 1;
        criteria['_id'] = ObjectID(req.body.question_id)

        deleteDocument(db, criteria, collection, (docs) => { 
            client.close();
            console.log("Closed DB connection");
            res.status(200).json(docs);
            });
        });
});

//admin obj_id: 61e676a817b1701f87c00711
app.post('/api/user/update/',function(req,res){
    // console.log('body',req.body);
    // console.log('params',req.params);
    // console.log('req',req);
    var newArray = req.body.quizDone;
    var user_id = req.body.user_id;


    const client = new MongoClient(mongoUrl);
    client.connect((err) => {
        assert.equal(null, err);
        console.log("Connected successfully to user server");
        const db = client.db(dbName);
        const criteria = {};
        criteria['_id'] = ObjectID(user_id);
        const doc = {$push: { quizDone: newArray }}
        // {$set:{updated_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        //     }}
        // });
        const collection = 'users';

        updateDocument(db,criteria, collection, doc, (docs) => {
            client.close();
            console.log("Closed DB connection");
            // res.json(docs);
            res.status(200).json(docs);
            });
        });
});


app.listen(process.env.PORT || 8099);
console.log(process.env.PORT);

module.exports = app;
