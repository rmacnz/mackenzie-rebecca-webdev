var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var categorySchema = require("./category.schema.server");
var categoryModel = mongoose.model("CategoryModel", categorySchema);

categoryModel.findAllCategories = findAllCategories;
categoryModel.findCategoryByName = findCategoryByName;

module.exports = categoryModel;

// find all the categories
function findAllCategories() {
    return categoryModel.find();
}

// find the category with this name
function findCategoryByName(categoryName) {
    return categoryModel.findOne({name: categoryName});
}