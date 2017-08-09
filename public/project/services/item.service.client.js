(function () {
    angular
        .module('RunescapeApp')
        .factory('itemService', itemService);

    function itemService($http) {
        var api = {
            findItemsByNameAPI: findItemsByNameAPI,
            findItemByIdAPI: findItemByIdAPI,
            findItemById: findItemById,
            createItem: createItem
        };
        return api;

        function findItemsByNameAPI(category, itemName) {
            var url = "/api/rs/item/" + category + "/" + itemName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                });
        }

        function findItemByIdAPI(itemId) {
            var url = "/api/rs/item/" + itemId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                });
        }

        function findItemById(itemId) {
            var url = "/api/item/" + itemId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createItem(item) {
            return $http.post("/api/item", item)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();