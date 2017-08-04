(function () {
    angular
        .module("RunescapeApp")
        .controller("ItemSearchController",ItemSearchController);

    function ItemSearchController(itemService, currentUser) {
        var model = this;
        init();

        function init() {
            model.headerTitle = "Item Search";
            model.user = currentUser;

            model.categories = [{id: 0, name: "Miscellaneous"},  {id: 1, name: "Ammo"}, {id: 2, name: "Arrows"},
                {id: 3, name: "Bolts"}, {id: 4, name: "Construction materials"},
                {id: 5, name: "Construction projects"}, {id: 6, name: "Cooking ingredients"},
                {id: 7, name: "Costumes"}, {id: 8, name: "Crafting materials"}, {id: 9, name: "Familiars"},
                {id: 10, name: "Farming produce"}, {id: 11, name: "Fletching materials"},
                {id: 12, name: "Food and drink"}, {id: 13, name: "Herblore materials"},
                {id: 14, name: "Hunting equipment"}, {id: 15, name: "Hunting produce"}, {id: 16, name: "Jewellery"},
                {id: 17, name: "Mage armour"}, {id: 18, name: "Mage weapons"},
                {id: 19, name: "Melee armour - low level"}, {id: 20, name: "Melee armour - mid level"},
                {id: 21, name: "Melee armour - high level"}, {id: 22, name: "Melee weapons - low level"},
                {id: 23, name: "Melee weapons - mid level"}, {id: 24, name: "Melee weapons - high level"},
                {id: 25, name: "Mining and smithing"}, {id: 26, name: "Potions"},
                {id: 27, name: "Prayer armour"}, {id: 28, name: "Prayer materials"}, {id: 29, name: "Range armour"},
                {id: 30, name: "Range weapons"}, {id: 31, name: "Runecrafting"},
                {id: 32, name: "Runes, spells, and teleports"}, {id: 33, name: "Seeds"},
                {id: 34, name: "Summoning scrolls"}, {id: 35, name: "Tools and containers"},
                {id: 36, name: "Woodcutting product"}, {id: 37, name: "Pocket items"}];

            model.searchItems = searchItems;
            model.findItemById = findItemById;
        }

        function searchItems() {
            if (model.category && model.searchTerm) {
                model.errormsg = null;
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

        function findItemById(itemId) {
            itemService
                .findItemById(itemId)
                .then(function (data) {
                    model.details = data.item;
                });
        }
    }
})();