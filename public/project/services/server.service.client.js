(function() {
    angular
        .module('FundiesStaffPage')
        .factory('serverService', serverService);

    function serverService($http) {
        var api = {
            findCalendarList: findCalendarList
        }
        return api;

        function findCalendarList() {
            return $http.get("/api/calendar/list")
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();