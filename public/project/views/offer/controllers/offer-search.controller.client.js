(function () {
    angular
        .module("RunescapeApp")
        .controller("OfferSearchController",OfferSearchController);

    function OfferSearchController(offerService, currentUser) {
        var model = this;
        init();

        function init() {
            model.headerTitle = "Offer Search";
            model.user = currentUser;

            model.searchOffers = searchOffers;
        }

        function searchOffers() {
            if (model.search) {
                if (!model.search.type) {
                    model.errormsg = "Please select which type of offer to search for.";
                } else if (!model.search.text) {
                    model.errormsg = "Please enter the name of the item you are looking for.";
                } else {
                    if (model.search.completed == null) {
                        model.search.completed = false;
                    }
                    offerService
                        .findOffersByItem(model.search.type, model.search.completed, model.search.category, model.search.text)
                        .then(function (offers) {
                            model.searchResults = offers;
                        });
                }
            } else {
                model.errormsg = "Please enter some information to search for offers.";
            }
        }
    }
})();