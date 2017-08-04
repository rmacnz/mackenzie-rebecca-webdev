(function () {
    angular
        .module("RunescapeApp")
        .controller("ItemSearchController",ItemSearchController);

    function ItemSearchController(itemService) {
        var model = this;
        init();

        function init() {
            model.searchItems = searchItems;
        }

        function searchItems() {
            if (model.category && model.searchTerm) {
                itemService
                    .findItemsByName(model.category, model.searchTerm)
                    .then(function (items) {
                        model.searchResults = items;
                    });
            } else if (model.category) {
                model.errormsg = "Please enter a search term.";
            } else {
                model.errormsg = "Please select a category.";
            }
        }
    }
})();