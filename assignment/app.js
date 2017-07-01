var app = require("../express");

require("./services/user.service.server");

app.get("/hello", sayHello);
app.get("/websites", sendWebsites);

function sayHello() {
    console.log("Hello from assignment/app.js");
}

function sendWebsites(req, res) {
    var websites = [
        {name: "facebook"},
        {name: "facebook2"},
        {name: "facebook3"}
    ];
    res.send(websites);
}