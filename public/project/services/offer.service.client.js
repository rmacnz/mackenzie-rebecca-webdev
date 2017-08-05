(function () {
    angular
        .module('RunescapeApp')
        .factory('offerService', offerService);

    function offerService($http) {
        var api = {
            createOffer: createOffer,
            findOfferById: findOfferById,
            findOffersByItem: findOffersByItem,
            findOffersByPosterId: findOffersByPosterId,
            findOffersByResponderId: findOffersByResponderId,
            updateOffer: updateOffer
        };
        return api;

        function createOffer(offer, userId) {
            offer.poster = userId;
            return $http.post("/api/offer", offer)
                .then(function (response) {
                    return response.data;
                })
        }

        function findOfferById(offerId) {
            var url = "/api/offer/" + offerId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findOffersByItem(type, completed, itemName) {
            var url = "/api/offer?type=" + type + "text=" + itemName;
            if (!completed) {
                url = url + "completed=" + completed;
            }
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateOffer(offerId, offer) {
            var url = "/api/offer/" + offerId;
            return $http.put(url, offer)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();