var app = require("../express");
var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;
var connectionString = 'mongodb://localhost/webdev'; // for local

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds157349.mlab.com:57349/heroku_zhk37gk1';
}
mongoose.connect(connectionString);

require("./services/user.service.server");
require("./services/website.service.server");
require("./services/page.service.server");
require("./services/widget.service.server");