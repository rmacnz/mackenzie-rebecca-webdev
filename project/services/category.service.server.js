var app = require("../../express");
var categoryModel = require("../model/category/category.model.server");

app.get("/api/category", findAllCategories);
app.get("/api/category/name/:catName", findCategoryByName);

function findAllCategories(req, res) {
    categoryModel.findAllCategories()
        .then(function (results) {
            res.json(results);
        });
}

function findCategoryByName(req, res) {
    var catName = req.params["catName"];
    categoryModel.findCategoryByName(catName)
        .then(function (category) {
            res.json(category);
        }, function (error) {
            console.log(error);
        });
}