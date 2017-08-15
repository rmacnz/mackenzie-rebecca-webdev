var mongoose = require("mongoose");
mongoose.Promise = require("q").Promise;

var categorySchema = require("./category.schema.server");
var categoryModel = mongoose.model("CategoryModel", categorySchema);

categoryModel.findAllCategories = findAllCategories;
categoryModel.findCategoryByName = findCategoryByName;
categoryModel.createCategory = createCategory;
categoryModel.editCategory = editCategory;

module.exports = categoryModel;

// find all the categories
function findAllCategories() {
    return categoryModel.find();
}

// find the category with this name
function findCategoryByName(categoryName) {
    return categoryModel.findOne({name: categoryName.toLowerCase()});
}

// create a category with this information
function createCategory(category) {
    return categoryModel.create(category);
}

// edit the name of the category
function editCategory(catId, catData) {
    return categoryModel.update({_id: catId}, {
        $set: {
            name: catData.name
        }
    });
}