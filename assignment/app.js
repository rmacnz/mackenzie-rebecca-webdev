var express = require("../express");
express.get("/hello", sayHello);

function sayHello() {
    console.log("Hello from assignment/app.js");
}