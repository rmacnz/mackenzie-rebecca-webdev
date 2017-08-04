var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var categorySchema = require("./category.schema.server");
var categoryModel = mongoose.model("CategoryModel", categorySchema);

categoryModel.findAllCategories = findAllCategories;

module.exports = categoryModel;

// find all the categories
function findAllCategories() {
    return categoryModel.find();
}