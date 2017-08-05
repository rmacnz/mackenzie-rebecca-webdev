(function() {
    angular
        .module("RunescapeApp")
        .controller("HomeController", HomeController);

    function HomeController(currentUser) {
        var model = this;
        init();

        function init() {
            model.user = currentUser;
            if (currentUser && currentUser.roles.indexOf("ADMIN") > -1) {
                model.admin = true;
            }
        }
    }
})();