var app = require("../express");
app.get("/hello", sayHello);

function sayHello() {
    console.log("Hello from assignment/app.js");
}