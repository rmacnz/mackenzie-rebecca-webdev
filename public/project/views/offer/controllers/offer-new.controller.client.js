(function () {
    angular
        .module("RunescapeApp")
        .controller("OfferNewController",OfferNewController);

    function OfferNewController(offerService, itemService, userService, currentUser, $routeParams, $location) {
        var model = this;
        init();

        function init() {
            model.headerTitle = "New Offer";
            model.user = currentUser;
            initializeOfferInfo();

            model.getSearchUrl = getSearchUrl;
            model.createOffer = createOffer;
        }

        function initializeOfferInfo() {
            var type = $routeParams["type"];
            var itemId = $routeParams["item"];
            var num = $routeParams["num"];
            var price = $routeParams["price"];
            if (type) {
                model.type = type;
            }
            if (itemId) {
                /*itemService.findItemById(itemId)
                    .then(function (itemData) {
                        model.item = itemData;
                    });*/
                itemService.findItemByIdAPI(itemId)
                    .then(function (itemData) {
                        model.item = itemData.item;
                        model.item._id = model.item.id;
                        model.price = model.item.current.price;
                    });
            }
            if (num) {
                model.num = num;
            }
            if (price) {
                model.price = price;
            }
        }

        function getSearchUrl() {
            var url = "#!/item/search?offer=true";
            if (model.type) {
                url = url + "&type=" + model.type;
            }
            if (model.num) {
                url = url + "&num=" + model.num;
            }
            if (model.price) {
                url = url + "&price=" + model.price;
            }
            return url;
        }

        function createOffer() {
            var errorMsg = validateOfferParams(model.type, model.item, model.num, model.price);
            if (errorMsg) {
                model.errormsg = errorMsg;
            } else {
                var offer = {
                    type: model.type,
                    item: model.item._id,
                    num: model.num,
                    pricePer: model.price
                }
                offerService.createOffer(offer, model.user._id)
                    .then(function (created) {
                        updateUserAfterCreation(created);
                    });
            }
        }

        function updateUserAfterCreation(offer) {
            if (offer.type === "BUY") {
                userService.updateUserCreateBuy(model.user, offer.num * offer.pricePer, offer._id)
                    .then(function (userUpdate) {
                        $location.url("#!/profile");
                    });
            } else if (offer.type === "SELL") {
                userService.updateUserCreateSell(model.user, offer.item._id, offer.num, offer._id)
                    .then(function (userUpdate) {
                        $location.url("#!/profile");
                    });
            } else {
                model.errormsg = "Could not update user after creation of offer.";
            }
        }

        function validateOfferParams(type, item, num, price) {
            if (!type) {
                return "Please select which type of offer you would like to create.";
            } else if (!item) {
                return "Please select which item you would like to " + type.toLowerCase() + ".";
            } else if (!num) {
                return "Please enter how many of this item you would like to " + type.toLowerCase() + ".";
            } else if (!price) {
                return "Please enter a price per item.";
            } else {
                if (num < 0 || Math.floor(num) != num || num == Infinity) {
                    return "Please enter a valid natural number for the number of items you would like to "
                        + type.toLowerCase() + ".";
                }
                if (price < 0 || Math.floor(price) != price || price == Infinity) {
                    return "Please enter a valid natural number for the price.";
                }
                if (type === "BUY") {
                    return validateBuyOfferParams(num, price);
                } else if (type === "SELL") {
                    return validateSellOfferParams(item._id, num);
                }
            }
        }

        function validateBuyOfferParams(numToBuy, pricePerItem) {
            //ensure that the user has enough gold and is not trying to purchase a members item if they are not a member
            if (model.user.roles.indexOf("ADMIN") > -1) {
                return null;
            }
            if (model.user.roles.indexOf("MEMBER") === -1 && model.item && model.item.members) {
                return "You cannot buy this item unless you are a member!";
            }
            if (model.user.gold < numToBuy * pricePerItem) {
                return "You cannot afford this.";
            }
            return null;
        }

        function validateSellOfferParams(itemId, numToSell) {
            // ensure that the user has enough of this item to sell
            if (model.user.roles.indexOf("ADMIN") > -1) {
                return null;
            }
            var currentItems = model.user.inventory;
            var index;
            for (index in currentItems) {
                if (currentItems[index].item === itemId) {
                    if (currentItems[index].num < numToSell) {
                        return "You do not have enough of this item to sell that many!";
                    } else {
                        return null;
                    }
                }
            }
            return "You do not own this item so you cannot sell it.";
        }
    }
})();