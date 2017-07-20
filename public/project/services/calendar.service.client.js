(function() {
    angular
        .module('FundiesStaffPage')
        .factory('calendarService', calendarService);

    function calendarService($http) {
        var api = {
            searchCalendarForEvents: searchCalendarForEvents,
            findEventById: findEventById
        }
        return api;

        function searchCalendarForEvents(queryString) {
            return $http.get("/api/calendar/event?search="+queryString)
                .then(function(response) {
                    return response.data;
                }, function (error) {
                    console.log(error);
                });
        }

        function findEventById(eventId) {
            return $http.get("/api/calendar/event/"+eventId)
                .then(function(response) {
                    return response.data;
                }, function(error) {
                    console.log(error);
                })
        }
    }
})();