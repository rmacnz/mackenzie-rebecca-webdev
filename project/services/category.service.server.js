var app = require("../../express");
var categoryModel = require("../model/category/category.model.server");

app.get("/api/category", findAllCategories);
app.get("/api/category/name/:catName", findCategoryByName);
app.post("/api/category", createCategory);
app.put("/api/category/:catId", editCategory);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

function findAllCategories(req, res) {
    categoryModel.findAllCategories()
        .then(function (results) {
            res.json(results);
        }, function (error) {
            console.log(error);
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

function createCategory(req, res) {
    var category = req.body;
    categoryModel.createCategory(category)
        .then(function (catCreated) {
            res.json(catCreated);
        }, function (error) {
            console.log(error);
        });
}

function editCategory(req, res) {
    var categoryId = req.params["catId"];
    var categoryData = req.body;
    categoryModel.editCategory(categoryId, categoryData)
        .then(function (catEdited) {
            res.json(catEdited);
        }, function (error) {
            console.log(error);
        });
}