(function () {
    angular
        .module("RunescapeApp")
        .controller("OfferSearchController",OfferSearchController);

    function OfferSearchController(offerService, itemService, currentUser, $routeParams) {
        var model = this;
        init();

        function init() {
            model.headerTitle = "Offer Search";
            model.user = currentUser;

            initializeUrlParams();

            model.searchOffers = searchOffers;
            model.getSearchUrl = getSearchUrl;
        }

        function initializeUrlParams() {
            model.search = {};
            var type = $routeParams["type"];
            var comp = $routeParams["comp"];
            var itemId = $routeParams["item"];
            if (type) {
                model.search.type = type;
            }
            if (comp) {
                model.search.completed = comp;
            }
            if (itemId) {
                itemService.findItemById(itemId)
                    .then(function (item) {
                        model.search.item = item;
                    }, function (error) {
                        console.log(error);
                    });
            }
        }

        function searchOffers() {
            if (model.search) {
                if (!model.search.type) {
                    model.errormsg = "Please select which type of offer to search for.";
                } else if (!model.search.item) {
                    model.errormsg = "Please select the item you would like to find an offer for.";
                } else {
                    if (model.search.completed == null) {
                        model.search.completed = false;
                    }
                    offerService
                        .findOffersByItem(model.search.type, model.search.completed, model.search.item._id)
                        .then(function (offers) {
                            model.searchResults = offers;
                        });
                }
            } else {
                model.errormsg = "Please enter some information to search for offers.";
            }
        }

        function getSearchUrl() {
            var url = "#!/item/search?offersearch=true";
            if (model.search) {
                if (model.search.type) {
                    url = url + "&type=" + model.search.type;
                }
                if (model.search.completed) {
                    url = url + "&comp=" + model.search.completed;
                }
            }
            return url;
        }
    }
})();