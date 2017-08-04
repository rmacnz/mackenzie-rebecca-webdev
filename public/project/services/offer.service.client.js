(function () {
    angular
        .module('RunescapeApp')
        .factory('auctionService', auctionService);

    function auctionService($http) {
        var api = {
            findAuctionsByItem: findAuctionsByItem
        };
        return api;

        function findAuctionsByItem(type, completed, itemName) {
            var url = "/api/auction?type=" + type + "text=" + itemName;
            if (!completed) {
                url = url + "completed=" + completed;
            }
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();