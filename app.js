var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , index = require('./routes/index')
  , http = require('http')
  , path = require('path');
var session = require('express-session');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'lib'
            });
 
connection.connect();
 
global.db = connection;
 
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
 
app.get('/', routes.index);
app.get('/signup', user.signup);
app.post('/signup', user.signup);
app.get('/login', index.login);
app.post('/login', user.login);
app.get('/home/dashboard', user.dashboard);
app.get('/home/logout', user.logout);
app.get('/home/issuedbooks', user.issuedbooks); 
app.get('/home/booklist', user.booklist);
app.get('/home/profile',user.profile);


app.listen(8080,function(){
  console.log('we are on port 8080');
});
