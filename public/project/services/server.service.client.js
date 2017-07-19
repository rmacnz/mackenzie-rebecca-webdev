(function() {
    angular
        .module('FundiesStaffPage')
        .factory('serverService', serverService);

    function serverService($http) {
        var api = {
            findCalendarList: findCalendarList
        }
        return api;

        function findCalendarList(queryString) {
            return $http.get("/api/calendar/list?query="+queryString)
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });
        }
    }
})();