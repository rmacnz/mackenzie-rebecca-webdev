(function () {
    angular
        .module("RunescapeApp")
        .controller("ItemSearchController",ItemSearchController);

    function ItemSearchController(itemService, categoryService, currentUser, $location, $routeParams) {
        var model = this;
        init();

        function init() {
            model.headerTitle = "Item Search";
            model.user = currentUser;
            initializeUrlParams();

            categoryService.findAllCategories()
                .then(function (categories) {
                    var index;
                    for (index in categories) {
                        categories[index] = {
                            _id: categories[index]._id,
                            name: capitalize(categories[index].name)
                        }
                    }
                    model.categories = categories;
                });

            model.searchItems = searchItems;
            model.showDetails = showDetails;
        }

        function initializeUrlParams() {
            var offer = $routeParams["offer"];
            if (offer) {
                model.offer = {
                    type: $routeParams["type"],
                    num: $routeParams["num"],
                    pricePer: $routeParams["price"]
                };
                model.urlParams = "offer=true";
                if (model.offer.type) {
                    model.urlParams = model.urlParams + "&type=" + model.offer.type;
                }
                if (model.offer.num) {
                    model.urlParams = model.urlParams + "&num=" + model.offer.num;
                }
                if (model.offer.pricePer) {
                    model.urlParams = model.urlParams + "&price=" + model.offer.pricePer;
                }
            }
            var offerSearch = $routeParams["offersearch"];
            if (offerSearch) {
                model.offerSearch = {
                    type: $routeParams["type"],
                    comp: $routeParams["comp"]
                };
                model.urlParams = "offersearch=true";
                if (model.offerSearch.type) {
                    model.urlParams = model.urlParams + "&type=" + model.offerSearch.type;
                }
                if (model.offerSearch.comp) {
                    model.urlParams = model.urlParams + "&comp=" + model.offerSearch.comp;
                }
            }
        }
        
        function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function searchItems() {
            if (model.category && model.searchTerm) {
                model.errormsg = null;
                itemService
                    .findItemsByNameAPI(model.category, model.searchTerm)
                    .then(function (result) {
                        if (result && result.items) {
                            model.searchResults = result.items.filter(userCanView);
                        }
                    });
            } else if (model.category) {
                model.errormsg = "Please enter a search term.";
            } else {
                model.errormsg = "Please select a category.";
            }
        }

        function userCanView(item) {
            return (item.members === "false") || (model.user && model.user.roles.indexOf("MEMBER") > -1);
        }

        function showDetails(itemId) {
            var url = "/item/detail/"+itemId;
            if (model.urlParams) {
                url = url + "?" + model.urlParams;
            }
            $location.url(url);
        }
    }
})();