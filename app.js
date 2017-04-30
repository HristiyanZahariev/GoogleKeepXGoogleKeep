var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt-nodejs');
var session      = require('express-session');
var auth = require("./api/config/auth")(); 
var methodOverride = require('method-override');

var routes = require('./api/routes/index');
var users  = require('./api/routes/users');
var notes  = require('./api/routes/notes');
var project = require('./api/routes/projects')

var User = require('./api/models/user');

var app = express();

// app.use(logger('dev'));
app.use(bodyParser.json());
 app.use(cookieParser()); // read cookies (needed for auth)
 app.use(bodyParser.urlencoded({ extended: false }));

// // required for passport
app.use(session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: true }}))

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session
// var LocalStrategy   = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());
// routes ==================================================================

app.use('/', routes);
app.use('/users', users);
app.use('/notes', notes);
app.use('/projects', project);

// passport.use(new LocalStrategy(function(username, pass, cb){
//   var hashedPass = bcrypt.hashSync(pass)
//   User.findOne({
//     where: {
//       username: username
//     }
//   }).then(function(user, err){
//     if (err) { return cb(err); }
//     if (!user) { 
//     return cb(null, false); }
//     if (!bcrypt.compareSync(pass, user.password)){ 
//       return cb(null, false); }
//     return cb(null, user);
//   })
// }))

// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//   User.findById(id).then(function (user) {
//     cb(null, user);
//   });
// });

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(function(req,res,next){
//   if(req.user){
//     res.locals.user = req.user.username
//   }
//   next()
// })

//app.use(auth.initialize());

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;