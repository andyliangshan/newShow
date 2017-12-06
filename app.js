var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect = require('connect');
var session = require('express-session');
var connectRedis = require('connect-redis');
var favicon = require('serve-favicon');
var cors = require('cors');
var PrettyError = require('pretty-error');
var compression = require('compression');
var methodOverride = require('method-override');



var app = express();
var RedisStore = connectRedis(session);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.locals._layoutFile = 'layout.html';
app.enable('trust proxy');

const staticDir = path.join(__dirname, 'public');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', '/images/favicon.ico')));
app.use(compression());
console.log(__dirname, '---------');
app.use(favicon(__dirname + '/public/images/32*32.ico'));
app.use(logger('dev'));
app.use(bodyParser.json()); // json类型的body数据
app.use(bodyParser.urlencoded({ extended: false })); // string 类型
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件目录
app.use('/public', express.static(staticDir, {maxAge: 3600000 * 24 * 365})); // 静态文件读取
app.use(session({
  secret: 'vShow-session',
  store: new RedisStore({
    port: 6379,
    host: '127.0.0.1',
    db: 0,
  }),
  resave: false,
  saveUninitialized: true,
  name: 'pc.vshow.sid',
}));

app.use('/', require('./routes/index'));


app.use(cors());
app.use(methodOverride());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var pe = new PrettyError();
pe.start();

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
console.log('❤️  sem listening on port 3000');
module.exports = app;
