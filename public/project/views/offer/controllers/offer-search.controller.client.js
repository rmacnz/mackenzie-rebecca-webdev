(function () {
    angular
        .module("RunescapeApp")
        .controller("AuctionSearchController",AuctionSearchController);

    function AuctionSearchController(auctionService, currentUser) {
        var model = this;
        init();

        function init() {
            model.headerTitle = "Auction Search";
            model.user = currentUser;

            model.searchAuctions = searchAuctions;
        }

        function searchAuctions() {
            if (model.search) {
                if (!model.search.type) {
                    model.errormsg = "Please select which type of auction to search for.";
                } else if (!model.search.text) {
                    model.errormsg = "Please enter the name of the item you are looking for.";
                } else {
                    if (model.search.completed == null) {
                        model.search.completed = false;
                    }
                    auctionService
                        .findAuctionsByItem(model.search.type, model.search.completed, model.search.category, model.search.text)
                        .then(function (auctions) {
                            model.searchResults = auctions;
                        });
                }
            } else {
                model.errormsg = "Please enter some information to search for auctions.";
            }
        }
    }
})();