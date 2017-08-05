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
                    model.urlParams = model.urlParams + "&type=" + model.offer.type;
                }
                if (model.offer.num) {
                    model.urlParams = model.urlParams + "&num=" + model.offer.num;
                }
                if (model.offer.pricePer) {
                    model.urlParams = model.urlParams + "&price=" + model.offer.pricePer;
                }
            }
        }

        function initializeItemFromAPI() {
            itemService.findItemByIdAPI(model.itemId)
                .then(function (response) {
                    model.item = response.item;
                    model.item._id = model.item.id;
                    itemService.findItemById(model.itemId)
                        .then(function (itemDetails) {
                        }, function (error) {
                            createItemFromAPI();
                        });
                });
        }

        function createItemFromAPI() {
            /*categoryService.findCategoryByName(model.item.type)
                .then(function(category) {
                    var newItem = {_id: model.itemId, name: model.item.name, category: category._id};
                    itemService.createItem(newItem)
                        .then(function (response) {
                            console.log("Added item to database from API.");
                        });
                });*/
            var categories = ["Miscellaneous","Ammo", "Arrows",
                "Bolts", "Construction materials",
                "Construction projects", "Cooking ingredients",
                "Costumes", "Crafting materials", "Familiars",
                "Farming produce", "Fletching materials",
                "Food and Drink", "Herblore materials",
                "Hunting equipment", "Hunting produce", "Jewellery",
                "Mage armour", "Mage weapons",
                "Melee armour - low level", "Melee armour - mid level",
                "Melee armour - high level", "Melee weapons - low level",
                "Melee weapons - mid level", "Melee weapons - high level",
                "Mining and smithing", "Potions",
                "Prayer armour", "Prayer materials", "Range armour",
                "Range weapons", "Runecrafting",
                "Runes, spells, and teleports", "Seeds",
                "Summoning scrolls", "Tools and containers",
                "Woodcutting product", "Pocket items"];
            var catIndex = categories.indexOf(model.item.type);
            var newItem = {_id: model.itemId, name: model.item.name, category: catIndex};
            itemService.createItem(newItem)
                .then(function (response) {
                    console.log("Added item to database from API.");
                }, function (error) {
                    console.log("Error when adding item to database");
                    console.log(error);
                });
        }
    }
})();