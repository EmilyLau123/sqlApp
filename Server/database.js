var mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb+srv://emily:emily@cluster0.3i4a2.mongodb.net/sqlDb?retryWrites=true&w=majority'

export const show_statement_list = () =>{
    //const client = new MongoClient(mongoUrl);
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
}
