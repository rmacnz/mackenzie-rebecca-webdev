(function() {
    angular
        .module("RunescapeApp")
        .controller("HomeController", HomeController);

    function HomeController(currentUser) {
        var model = this;
        init();

        function init() {
            model.user = currentUser;
        }
    }
})();