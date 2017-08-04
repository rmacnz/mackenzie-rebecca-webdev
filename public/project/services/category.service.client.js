//findCategoryByName
(function () {
    angular
        .module('RunescapeApp')
        .factory('categoryService', categoryService);

    function categoryService($http) {
        var api = {
            findAllCategories: findAllCategories,
            findCategoryByName: findCategoryByName
        };
        return api;

        function findAllCategories() {
            return $http.get("/api/category")
                .then(function (response) {
                    return response.data;
                });
        }

        function findCategoryByName(categoryName) {
            var url = "/api/category/name/" + categoryName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();