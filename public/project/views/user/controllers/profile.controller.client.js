(function() {
    angular
        .module("RunescapeApp")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($location, userService, itemService, offerService, currentUser) {
        var model = this;
        init();

        function init() {
            model.headerTitle = "Profile";
            model.userId = currentUser._id;
            model.user = currentUser;
            model.message = null;

            model.updateUser = updateUser;
            model.deleteUser = deleteUser;
            model.unregister = unregister;
            model.logout = logout;
            initializeInventory(model.user.inventory);
            initializeOfferLists();
            if (currentUser.roles.indexOf("MEMBER") > -1) {
                userService
                    .findMemberInfo(currentUser.username)
                    .then(function (info) {
                        model.memberInfo = info;
                    });
                model.skillIdToName = skillIdToName;
            }
        }

        function initializeInventory(itemData) {
            if (itemData && itemData.length > 0) {
                model.userItems = [];
                var index;
                for (index in itemData) {
                    /*itemService.findItemById(itemData[index].item)
                        .then(function (foundItem) {
                            foundItem.quantity = itemData[index].num;
                            model.userItems.push(foundItem);
                        });*/
                    itemService.findItemByIdAPI(itemData[index].item)
                        .then(function (foundItem) {
                            foundItem.item.quantity = itemData[index].num;
                            model.userItems.push(foundItem.item);
                        });
                }
            }
        }

        // find all the offers for which this person was a poster or responder
        function initializeOfferLists() {
            var index;
            if (model.user.buys && model.user.buys.length > 0) {
                model.buyOffers = [];
                for (index in model.user.buys) {
                    offerService.findOfferById(model.user.buys[index])
                        .then(function (offerData) {
                            model.buyOffers.push(offerData);
                        });
                }
            }
            if (model.user.sells && model.user.sells.length > 0) {
                model.sellOffers = [];
                for (index in model.user.sells) {
                    offerService.findOfferById(model.user.sells[index])
                        .then(function (offerData) {
                           model.sellOffers.push(offerData);
                        });
                }
            }
        }


        // update this user based on the information they entered on the profile page
        function updateUser() {
            userService
                .updateUser(model.userId, model.user)
                .then(function() {
                    model.message = "User updated successfully.";
                });
        }

        // remove this user from the web service
        function deleteUser() {
            userService
                .deleteUser(model.userId)
                .then(function() {
                    $location.url("");
                });
        }

        function unregister() {
            userService
                .unregister()
                .then(function() {
                    $location.url("");
                });
        }

        // log out this user
        function logout() {
            userService.logout()
                .then(function() {
                    $location.url("");
                });
        }

        function skillIdToName(idNum) {
            var skills = ["Attack", "Defence", "Strength", "Constitution", "Ranged",
            "Prayer", "Magic", "Cooking", "Woodcutting", "Fletching", "Fishing",
            "Firemaking", "Crafting", "Smithing", "Mining", "Herblore", "Agility",
            "Thieving", "Slayer", "Farming", "Runecrafting", "Hunter", "Construction",
            "Summoning", "Dungeoneering", "Divination", "Invention"];
            return skills[idNum];
        }
    }
    
})();
