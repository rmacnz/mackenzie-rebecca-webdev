(function () {
    angular
        .module('RunescapeApp')
        .factory('itemService', itemService);

    function itemService($http) {
        var api = {
            findItemsByName: findItemsByName,
            findItemById: findItemById
        };
        return api;

        function findItemsByName(category, itemName) {
            var url = "http://services.runescape.com/m=itemdb_rs/api/catalogue/items.json?category="
                + category + "&alpha=" + itemName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                });
        }

        function findItemById(itemId) {
            var url = "http://services.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=" + itemId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();