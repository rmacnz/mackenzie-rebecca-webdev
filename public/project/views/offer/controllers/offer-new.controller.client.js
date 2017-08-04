(function () {
    angular
        .module("RunescapeApp")
        .controller("AuctionNewController",AuctionNewController);

    function AuctionNewController(auctionService, itemService, currentUser, $routeParams, $location) {
        var model = this;
        init();

        function init() {
            model.headerTitle = "New Auction";
            model.user = currentUser;
            initializeAuctionInfo();

            model.searchForItem = searchForItem;
            model.createAuction = createAuction;
        }

        function initializeAuctionInfo() {
            var type = $routeParams["type"];
            var itemId = $routeParams["itemId"];
            var num = $routeParams["num"];
            var price = $routeParams["price"];
            if (type) {
                model.type = type;
            }
            if (itemId) {
                itemService.findItemById(itemId)
                    .then(function (itemData) {
                        model.item = itemData;
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
            var url = "#!/search/items?";
            if (model.type) {
                url = url + "type=" + model.type;
            }
            if (model.num) {
                url = url + "num=" + model.num;
            }
            if (model.price) {
                url = url + "price=" + model.price;
            }
            return url;
        }

        function createAuction() {
            var errorMsg = validateAuctionParams(model.type, model.item, model.num, model.price);
            if (errorMsg) {
                model.errormsg = errorMsg;
            } else {
                var auction = {
                    type: model.type,
                    item: model.item._id,
                    num: model.num,
                    price: model.price
                }
                auctionService.createAuction(auction)
                    .then(function (created) {
                        $location.url("#!/user/auctions");
                    });
            }
        }

        function validateAuctionParams(type, item, num, price) {
            if (!type) {
                return "Please select which type of auction you would like to create.";
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