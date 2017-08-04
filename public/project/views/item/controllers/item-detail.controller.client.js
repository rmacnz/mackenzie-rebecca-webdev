(function () {
    angular
        .module("RunescapeApp")
        .controller("ItemDetailController",ItemDetailController);
    
    function ItemDetailController(itemService, categoryService, currentUser, $routeParams) {
        var model = this;
        init();
        
        function init() {
            model.headerTitle = "Item Detail Page";
            model.user = currentUser;
            model.itemId = $routeParams["itemid"];
            initializeItemFromAPI();
            initializeOfferData();
        }
        
        function initializeOfferData() {
            var offer = $routeParams["offer"]
            if (offer) {
                model.offer = {
                    type: $routeParams["type"],
                    num: $routeParams["num"],
                    pricePer: $routeParams["price"]
                }
                model.urlParams = "offer=true";
                if (model.offer.type) {
                    model.urlParams = model.urlParams + "type=" + model.offer.type;
                }
                if (model.offer.num) {
                    model.urlParams = model.urlParams + "num=" + model.offer.num;
                }
                if (model.offer.pricePer) {
                    model.urlParams = model.urlParams + "price=" + model.offer.pricePer;
                }
            }
        }

        function initializeItemFromAPI() {
            itemService.findItemByIdAPI(model.itemId)
                .then(function (response) {
                    model.item = response.item;
                    itemService.findItemById(model.itemId)
                        .then(function (itemDetails) {
                        }, function (error) {
                            createItemFromAPI();
                        });
                });
        }

        function createItemFromAPI() {
            categoryService.findCategoryByName(model.item.type)
                .then(function(category) {
                    var newItem = {_id: model.itemId, name: model.item.name, category: category._id};
                    itemService.createItem(newItem)
                        .then(function (response) {
                            console.log("Added item to database from API.");
                        });
                });
        }
    }
})();