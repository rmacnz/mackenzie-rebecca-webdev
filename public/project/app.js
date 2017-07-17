(function(){
    angular
        .module("FundiesStaffPage",["ngRoute"])
        .controller("FSPController", fspController);

    function fspController($http) {
        var model = this;
        model.searchCalendar = searchCalendar;
        model.searchDetails = searchDetails;

        function searchCalendar(searchTerm) {
            // TODO: Update to search the Fundies 1 calendar for an event with this name
            var calendarListUrl = "https://www.googleapis.com/calendar/v3/users/me/calendarList";
            $http.get(calendarListUrl)
                .then(function(response) {
                    console.log(response);
                    model.results = response.data.Search;
                });
        }

        function searchDetails(event) {
            // TODO: Update to search the Fundies 1 calendar for the given event
            var calendarListUrl = "https://www.googleapis.com/calendar/v3/users/me/calendarList";
            $http.get(calendarListUrl)
                .then(function(response) {
                    console.log(response);
                    model.detailedResult = response.data;
                });
        }
    };
})();