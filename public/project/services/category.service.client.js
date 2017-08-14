//findCategoryByName
(function () {
    angular
        .module('RunescapeApp')
        .factory('categoryService', categoryService);

    function categoryService($http) {
        var api = {
            findAllCategories: findAllCategories,
            findCategoryByName: findCategoryByName,
            createCategory: createCategory
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

        function createCategory(id, name) {
            return $http.post("/api/category", {_id: id, name: name})
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                });
        }

        function editCategory(category) {
            var url = "/api/category/" + category._id;
            return $http.put(url, category)
                .then(function (response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                })
        }
    }
})();