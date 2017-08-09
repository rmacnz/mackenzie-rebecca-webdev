(function () {
    angular
        .module("RunescapeApp")
        .controller("OfferDetailController", OfferDetailController);

    function OfferDetailController(currentUser, $routeParams, $location, offerService, itemService, userService) {
        var model = this;
        init();

        function init() {
            model.user = currentUser;
            model.headerTitle = "Offer Details";
            model.offerId = $routeParams["offerid"];
            initializeOfferData(model.offerId);

            model.canBuy = canBuy;
            model.canSell = canSell;
            model.completeOffer = completeOffer;
        }

        function initializeOfferData(idNumber) {
            offerService.findOfferById(idNumber)
                .then(function (offerFound) {
                    model.offer = offerFound;
                    initializePosterData(model.offer.poster);
                    initializeResponderData(model.offer.responder);
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
            return model.offer && model.user && (model.offer.type === "SELL") && (!model.offer.completed) &&
                    userItemMatch(model.offer.item, model.user) &&
                    (model.user.gold >= (model.offer.pricePer * model.offer.num));
        }

        function canSell() {
            return model.offer && model.user && (model.offer.type === "BUY") && (!model.offer.completed) &&
                userItemMatch(model.offer.item, model.user) &&
                (model.user.inventory.indexOf(model.offer.item._id) > -1);
        }

        function userItemMatch(item, user) {
            return (!item.members) || (user.roles.indexOf("MEMBER") > -1);
        }

        function completeOffer() {
            model.offer.responder = model.user._id;
            model.offer.completed = true;
            offerService.updateOffer(model.offerId, model.offer)
                .then(function (status) {
                    updatePoster();
                });
        }

        function updatePoster() {
            userService.findUserById(model.offer.poster)
                .then(function (foundPoster) {
                    if (model.offer.type === "BUY") {
                        userService.updateUserSellComplete(foundPoster, model.offer.num * model.offer.pricePer)
                            .then(function (status) {
                                updateResponder();
                            });
                    } else if (model.offer.type === "SELL") {
                        userService.updateUserBuyComplete(foundPoster, model.offer.num, model.offer.item)
                            .then(function (status) {
                                updateResponder();
                            });
                    }
                });
        }

        function updateResponder() {
            if (model.offer.type === "BUY") {
                userService.respondToBuyOffer(model.user, model.offer.num * model.offer.pricePer, model.offer.num,
                model.offer.item, model.offer._id)
                    .then(function (status) {
                        $location.url("#!/profile");
                    });
            } else if (model.offer.type === "SELL"){
                userService.respondToSellOffer(model.user, model.offer.num * model.offer.pricePer, model.offer.num,
                    model.offer.item, model.offer._id)
                    .then(function (status) {
                        $location.url("#!/profile");
                    });
            }
        }
    }
})();