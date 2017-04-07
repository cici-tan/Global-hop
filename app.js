var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// diff files connected diff vars
var routes = require('./routes/index');
var users = require('./routes/users');
var cityView = require('./routes/cityView');
var about = require('./routes/about');
var search = require('./routes/search');

var app = express();

// app.listen(3306,'52.38.139.161');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// open diff pages by routes
app.use('/homePage', routes);
app.use('/', routes);
app.use('/users', users);
app.use('/cityView', cityView);
app.use('/about', about);
// app.use('/search', search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.get('/search', function (req,res) {

  if(req.param('keyword')=='food'){
    console.log('Search: ' + req.param('keyword'));
  }
  console.log('search log');
  var i = req.get('keyword');
  switch (i){
    case 'food':
        console.log('food');
      res.send('about');
          break;
    case 'clothes':
      res.render('clothes', { title: 'clothes distribution' });
          break;
    case 'weather':
      res.render('weather', { title: 'weather distribution' });
          break;
  }

});

module.exports = app;
