require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb+srv://nbaugh1:uq05ghfkzRVoeQLp@cluster1-mern-app-1.sil9vcp.mongodb.net/?retryWrites=true&w=majority';
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const notesRouter = require('./routes/notes');

const app = express();

mongoose.connect(CONNECTION_STRING);
const db = mongoose.connection;
// recover from errors
db.on('error', console.error.bind(console, 'connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/notes', notesRouter);

app.get('/notes*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public') + '/index.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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