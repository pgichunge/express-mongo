var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var teamsRouter = require('./routes/teams');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);

console.log('This log signifies an automatic build');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Database Connection
const dbConnectionString = 'mongodb://localhost/';
const dbName = 'premierLeague';
const MONGODB_URI = process.env.MONGODB_URI || dbConnectionString + dbName;
mongoose.connect(MONGODB_URI)
const db = mongoose.connection;

// Check Connection
db.once('open', () => {
  console.log('Database connected successfully')
})

// Check for DB Errors
db.on('error', (error) => {
  console.error(error);
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
