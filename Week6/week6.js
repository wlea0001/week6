const express = require("express");
//const mongodb = require("mongodb");
const bodyparser = require('body-parser');
const morgan = require('morgan');

const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('images'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan('common'));
app.listen(8080);

const mongoose = require('mongoose');
const Task = require('./Models/Task');
const Developer = require('./Models/Developer');
mongoose.connect('mongodb://' + process.argv[2]+ ':27017/taskDB', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/views/index.html');
    });
    app.get('/newtask', function (req, res) {
        res.sendFile(__dirname + '/views/newtask.html');
    });
    app.get('/deletetask', function (req, res) {
        res.sendFile(__dirname + '/views/deletetask.html');
    });
    app.get('/updateTask', function (req, res) {
        res.sendFile(__dirname + '/views/updatetask.html')
    });
    app.get('/addDeveloper', function (req, res) {
        res.sendFile(__dirname + '/views/adddeveloper.html')
    });
    app.get('/listDevelopers', function (req, res) {
        console.log('in method list developers');
        Developer.find({}, function (err, docs){
            console.log('Executing response');
            res.render('listdevelopers', { db: docs });
        });
    });
    app.get('/listtasks', function (req, res) {
        Task.find({}, function (err, docs){
            res.render(__dirname + '/views/listtasks', { db: docs });
        });
    });
    app.get('/deleteCompletedTasks', function (req, res) {
    Task.deleteMany({ 'status': 'Complete' }, function (err, doc) {
        console.log(doc);
    });
    res.redirect('/listtasks');// redirect the client to list users page
});

    app.post('/addDeveloper', function (req, res) {
        let devDetails = req.body;
        let developer1 = new Developer({
            _id: new mongoose.Types.ObjectId(),
            name: {
                firstName: devDetails.devFName,
                lastName: devDetails.devLName
            },
            level: devDetails.level,
            address: {
                State: devDetails.state,
                Suburb: devDetails.suburb,
                Street: devDetails.street,
                Unit: devDetails.unit
            }
        });
        developer1.save(function (err) { // do i need to close this
            if (err) throw err;
            console.log('HTML Task successfully Added to DB');
        res.redirect('/listdevelopers');
    });
});

app.post('/newtask', function (req, res) {
    let taskDetails = req.body;
    var task1 = new Task({
        _id: new mongoose.Types.ObjectId(), // fix this
        name: taskDetails.taskname,
        assignTo: taskDetails.assignTo, // need to have dropdown menu for developers 
        dueDate: new Date (taskDetails.taskdue),
        status: taskDetails.status,
        description: taskDetails.taskdesc
    });
    task1.save(function (err) {
        if (err) throw err;
        console.log('HTMLTask1 successfully Added to DB');
    });
    res.redirect('/listtasks');
});
});

app.post('/deletetask', function (req, res) {
    let taskDetails = req.body;
    Task.deleteMany({ '_id': taskDetails.taskid }, function (err, doc) {
        console.log(doc);
    });
    res.redirect('/listtasks');// redirect the client to list users page
});

app.post('/updatetask', function (req, res) {
    let taskDetails = req.body;
    console.log(taskDetails.taskid)
    console.log(taskDetails.status)
    Task.updateOne({ '_id': taskDetails.taskid }, { $set: { 'status': taskDetails.status } }, function (err, doc) {
        console.log(doc);
        console.log('Task updated');
    });
    res.redirect('/listtasks');// redirect the client to list users page
});

//sbal0014@student.monash.edu