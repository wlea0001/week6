//Import packages
const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');
const morgan = require('morgan');
//Configure Express
const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('images'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan('common'));
app.listen(8080);
//Configure MongoDB
const MongoClient = mongodb.MongoClient;
// Connection URL
const url = "mongodb://localhost:27017/";
//reference to the database (i.e. collection)
let db;
//Connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    console.log("connected to mongodb server");
    
    db= client.db('FIt2095')
    db.createCollection('tasks')

});
//Routes Handlers
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.get('/newtask', function (req, res) {
    res.sendFile(__dirname + '/views/newtask.html');
});

//app.get('/listtasks', function (req, res) {
  //  res.sendFile(__dirname + '/views/listtasks.html');
    //db.collection('tasks').find({}).toArray(function (err, data) {
      //  res.render('listtasks.html', { db: db });
    //});
//});

app.get('/listtasks', function (req, res) {
    db.collection('tasks').find({}).toArray(function (err, data) {
        res.render(__dirname + '/views/listtasks', { db: data });
    });
});

//POST request: receive the details from the client and insert new document (i.e. object) to the collection (i.e. table)
app.post('/newtask', function (req, res) {
    let taskDetails = req.body;
    db.collection('tasks').insertOne({ ID: Math.round(Math.random()*1000), 
        name: taskDetails.taskname, 
        assign: taskDetails.assignTo,
        due: new Date (taskDetails.taskdue), 
        status: taskDsetails.status,
        description: taskDetails.taskdesc });
    res.redirect('/listtasks');
});

app.get('/deletetask', function (req, res) {
    res.sendFile(__dirname + '/views/deletetask.html');
});

app.post('/deletetask', function (req, res) {
    let userDetails = req.body;
    let filter = { ID: userDetails.taskid };
    db.collection('tasks').deleteOne(filter);
    res.redirect('/listtasks');// redirect the client to list users page
});
app.get('/deleteAllTasks', function (req, res) {
    db.collection('tasks').deleteMany()
    res.redirect('/listtasks');
});
app.get('/findtasks/:num1/:num2', function (req, res) {
    db.collection('tasks').find({ID:{$gt : parseInt(req.params.num1), $lt: parseInt(req.params.num2)}}).toArray(function(err, data){
    res.send(data)
    });
});

app.get('/updateTask', function (req, res) {
    res.sendFile(__dirname + '/views/updatetask.html')
});

app.post('/updatetask', function (req, res) {
    let taskDetails = req.body;
    let filter = { ID: taskDetails.id };
    let theUpdate = { $set: { name: taskDetails.newtaskname, 
        assign: taskDetails.newassignTo,
        due: taskDetails.newtaskdue, 
        status: taskDetails.newstatus,
        description: taskDetails.newtaskdesc } };
    db.collection('tasks').updateOne(filter, theUpdate);
    res.redirect('/listtasks');// redirect the client to list users page
});

//Math.round(Math.random()*1000;