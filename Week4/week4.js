let express = require('express');
let app = express();
let bodyParser = require('body-parser'); //enables body-parser

//setup view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let db = []; // initialise database

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

//Setup the static assets directories
app.use(express.static('images'));
app.use(express.static('css'));
app.get('/', function (req, res) {
    res.render('index.html');
});

//for new task
app.get('/newtask', function (rqe, res) {
    res.sendFile(__dirname + '/views/newtask.html');
});

app.post('/newTask', function (req, res) {
    db.push({
        taskname: req.body.taskname,
        taskdue: req.body.taskdue,
        taskdesc: req.body.taskdesc,
    });
    console.log(req.body.taskname);
    console.log(req.body.taskdue);
    console.log(req.body.taskdesc);
    res.sendFile(__dirname + '/views/newtask.html')
})

//for list tasks
app.get('/listTasks', function (req, res) {
    res.render('listtasks.html', { db: db});
});

app.listen(8080);