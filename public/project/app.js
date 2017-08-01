(function(){
    angular
        .module("RunescapeApp",["ngRoute"])
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
                            event.prettyDate = "From " + formatDate(event.start, true) + " to " + formatDate(event.end, true);
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
                    if (eventinfo.recurrence != null) {
                        eventinfo.isRecurring = true;
                        eventinfo.recur = parseRecurrence(eventinfo.recurrence[0]);
                        eventinfo.recur.date = formatRecurringDate(eventinfo.start, eventinfo.end);
                        eventinfo.recur.start = formatDate(eventinfo.start, false);
                        eventinfo.recur.end = formatDate(eventinfo.end, false);
                    } else {
                        eventinfo.isRecurring = false;
                        eventinfo.dateStart = formatDate(eventinfo.start, true);
                        eventinfo.dateEnd = formatDate(eventinfo.end, true);
                    }
                    model.detailedResult = eventinfo;
                });
        }

        function parseRecurrence(recurrence) {
            var freqsub = recurrence.substr(recurrence.indexOf("FREQ=")+5);
            var frequency = freqsub.substr(0, freqsub.indexOf(";"));
            var dateSub = recurrence.substr(recurrence.indexOf("UNTIL=")+6);
            var untilDate = dateSub.substr(0, dateSub.indexOf(";"));
            var untilYear = untilDate.substr(0,4);
            var untilMon = untilDate.substr(4,2);
            var untilDay = untilDate.substr(6,2);
            var result = {
                freq: frequency.toLowerCase(),
                until: formatDate({dateTime: new Date(untilYear+"-"+untilMon+"-"+untilDay)}, false)
            }
            return result;
        }

        function formatDate(dateObj, includeTime) {
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

            var result = monthNames[monthIndex] + ' ' + day + ', ' + year;
            if (includeTime) {
                result = result + " at " + formatDateTime(date);
            }
            return result;
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