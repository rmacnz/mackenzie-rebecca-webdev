(function () {
    angular
        .module("RunescapeApp")
        .controller("OfferNewController",OfferNewController);

    function OfferNewController(offerService, itemService, currentUser, $routeParams, $location) {
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
            var url = "#!/search/items?offer=true";
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
                    price: model.price
                }
                offerService.createOffer(offer, model.user._id)
                    .then(function (created) {
                        $location.url("#!/user/offers");
                    });
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
                return null;
            }
        }
    }
})();