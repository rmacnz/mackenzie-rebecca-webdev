(function() {
    angular
        .module("RunescapeApp")
        .controller("CategoryListController", CategoryListController);

    function CategoryListController(categoryService, currentUser, $location) {
        var model = this;
        init();

        function init() {
            model.category = currentUser;
            model.headerTitle = "Manage Categorys";
            model.createCategory = createCategory;
            categoryService.findAllCategories()
                .then(function (categoryList) {
                    model.categoryList = categoryList;
                });
        }

        function createCategory() {
            if (model.id != null && model.name) {
                model.displayMsg = null;
                categoryService.createCategory(model.id, model.name)
                    .then(function (response) {
                        model.displayMsg = "Successfully created category '" + model.name + "'.";
                    })
            }
        }
    }
})();