(function () {
    angular
        .module('RunescapeApp')
        .factory('offerService', offerService);

    function offerService($http) {
        var api = {
            createOffer: createOffer,
            findOfferById: findOfferById,
            findOffersByItem: findOffersByItem,
            updateOffer: updateOffer
        };
        return api;

        function createOffer(offer, userId) {
            offer.poster = userId;
            return $http.post("/api/offer", offer)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                })
        }

        function findOfferById(offerId) {
            var url = "/api/offer/" + offerId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findOffersByItem(type, completed, itemId) {
            var url = "/api/offer?type=" + type + "&item=" + itemId;
            if (!completed) {
                url = url + "&completed=" + completed;
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
                }, function (error) {
                    console.log(error);
                });
        }
    }
})();