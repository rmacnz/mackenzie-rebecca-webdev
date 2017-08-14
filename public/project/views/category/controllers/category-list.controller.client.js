(function() {
    angular
        .module("RunescapeApp")
        .controller("CategoryListController", CategoryListController);

    function CategoryListController(categoryService, currentUser, $location) {
        var model = this;
        init();

        function init() {
            model.id = null;
            model.name = null;
            model.user = currentUser;
            model.headerTitle = "Manage Categories";
            model.createCategory = createCategory;
            initializeCategories();
        }

        function initializeCategories() {
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
                        initializeCategories();
                        model.displayMsg = "Successfully created category '" + model.name + "'.";
                    })
            }
        }
    }
})();