var app = require('./express');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

var cookieParser = require('cookie-parser');
var session      = require('express-session');
app.use(cookieParser());
if (process.env.SESSION_SECRET) {
    app.use(session({ secret: process.env.SESSION_SECRET }));
} else {
    app.use(session({ secret: "local secret" }));
}

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

//require ("./test/app.js")(app);
require("./assignment/app.js");
require("./project/app.js");

// for lecture app
var lectureApp = require("./lectures/app.js");
lectureApp(app);

var port = process.env.PORT || 3000;

app.listen(port);