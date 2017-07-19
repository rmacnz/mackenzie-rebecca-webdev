(function() {
    angular
        .module('FundiesStaffPage')
        .factory('calendarService', calendarService);

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