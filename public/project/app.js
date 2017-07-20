(function(){
    angular
        .module("FundiesStaffPage",["ngRoute"])
        .controller("FSPController", fspController);

    function fspController($http, calendarService) {
        var model = this;
        model.searchCalendar = searchCalendar;
        model.searchDetails = searchDetails;

        function searchCalendar(searchTerm) {
            calendarService.searchCalendarForEvents(searchTerm)
                .then(function(events){
                    var index;
                    for (index in events) {
                        var event = events[index];
                        if (event.recurrence != null) {
                            event.prettyDate = formatRecurringDate(event.start, event.end);
                        } else {
                            event.prettyDate = "From " + formatDate(event.start) + " to " + formatDate(event.end);
                        }
                        events[index] = event;
                    }
                    model.results = events;
                });
        }

        function searchDetails(event) {
            // TODO: Update to search the Fundies 1 calendar for the given event
            calendarService.findEventById(event.id)
                .then(function(eventinfo) {
                    model.detailedResult = eventinfo;
                });
        }

        function formatDate(dateObj) {
            var date = new Date(dateObj.dateTime);
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return monthNames[monthIndex] + ' ' + day + ', ' + year + " at " + formatDateTime(date);
        }

        function formatRecurringDate(startObj, endObj) {
            var start = new Date(startObj.dateTime);
            var end = new Date(endObj.dateTime);
            var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday"];
            var dayOfWeekIndex = start.getDay();
            return dayNames[dayOfWeekIndex] + "s from " + formatDateTime(start) + " to " + formatDateTime(end);
        }

        function formatDateTime(date) {
            var hours = date.getHours();
            var time = "AM";
            if (hours > 12) {
                hours = hours - 12;
                time = "PM";
            }
            var mins = date.getMinutes() + "";
            if (mins.length < 2) {
                mins = "0" + mins;
            }
            return hours + ":" + mins + " " + time;

        }
    }
})();