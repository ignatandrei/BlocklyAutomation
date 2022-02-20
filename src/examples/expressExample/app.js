var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const version = require('./package.json');
const options = require('./swaggerOptions');
const swaggerSpec = swaggerJsdoc(options);



var indexRouter = require('./routes/index');
var controller1 = require('./routes/controller1');
var controller2 = require('./routes/controller2');

var app = express();

function swaggerDocs(app, port) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
  })
}

swaggerDocs(app, 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api', controller1);
app.use('/api', controller2);
var dirBlockly= path.join(__dirname , 'node_modules','node2-blockly','docs');
console.log('blockly folder',dirBlockly);
app.use("/BlocklyAutomation", express.static(dirBlockly));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('404',req.path);
  if(req.path.startsWith("/BlocklyAutomation")){
    console.log('test');
    res.sendFile(path.join(dirBlockly, 'index.html'));
    return;
  }
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
