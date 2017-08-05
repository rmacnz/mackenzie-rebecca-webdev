(function () {
    angular
        .module("RunescapeApp")
        .controller("OfferDetailController", OfferDetailController);

    function OfferDetailController(currentUser, $routeParams, offerService, itemService, userService) {
        var model = this;
        init();

        function init() {
            model.user = currentUser;
            model.headerTitle = "Offer Details";
            model.offerId = $routeParams["offerid"];
            initializeOfferData(model.offerId);

            model.canBuy = canBuy;
            model.canSell = canSell;
            model.buyOffer = buyOffer;
            model.sellOffer = sellOffer;
        }

        function initializeOfferData(idNumber) {
            offerService.findOfferById(idNumber)
                .then(function (offerFound) {
                    model.offer = offerFound;
                    initializeItemData(model.offer.item);
                    initializePosterData(model.offer.poster);
                    initializeResponderData(model.offer.responder);
                });
        }

        function initializeItemData(itemId) {
            /*itemService.findItemById(itemId)
                .then(function (itemFound) {
                    model.item = itemFound;
                });*/
            itemService.findItemByIdAPI(itemId)
                .then(function (itemFound) {
                    model.item = itemFound;
                });
        }

        function initializePosterData(posterId) {
            userService.findUserById(posterId)
                .then(function (userFound) {
                    model.poster = userFound;
                });
        }

        function initializeResponderData(responderId) {
            if (responderId) {
                userService.findUserById(responderId)
                    .then(function (userFound) {
                        model.responder = userFound;
                    })
            }
        }

        function canBuy() {
            return (model.offer.type === "SELL") && (!model.offer.completed) &&
                    userItemMatch(model.item, model.user) &&
                    (model.user.gold >= (model.offer.pricePer * model.offer.num));
        }

        function canSell() {
            return (model.offer.type === "BUY") && (!model.offer.completed) &&
                userItemMatch(model.item, model.user) &&
                (model.user.inventory.indexOf(model.item._id) > -1);
        }

        function userItemMatch(item, user) {
            return (!item.members) || (user.roles.indexOf("MEMBER") > -1);
        }

        function buyOffer() {
            // TODO: update the offer such that it is complete and I am the responder
            // TODO: update my list of buys such that this is one of them
            // TODO: update my gold count to be less now
            // TODO: update my inventory to have this item in it
        }

        function sellOffer() {
            // TODO: update the offer such that it is complete and I am the responder
            // TODO: update my list of sells such that this is one of them
            // TODO: update my inventory to no longer have this item in it
        }
    }
})();