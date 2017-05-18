//server.js

var express=require('express');
var app= express();
var port=process.env.PORT || 8080;
var mongoose=require('mongoose');
var passport=require('passport');
var flash=require('connect-flash');
var morgan=require('morgan');
var cookieParser=require('cookie-parser');
var bodyParser=require('body-parser');
var session=require('express-session');

//db configuration
var configDB=require('./config/database.js');

mongoose.connect(configDB.url);//connecting to databse

// require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({secret:'lolololol'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log("Working on port"+port);