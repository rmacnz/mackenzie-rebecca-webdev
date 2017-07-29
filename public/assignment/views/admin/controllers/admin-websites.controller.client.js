(function() {
    angular
        .module("WebAppMaker")
        .controller("AdminWebsiteController", AdminWebsiteController);

    function AdminWebsiteController(currentUser) {
        var model = this;
        init();

        function init() {
            model.user = currentUser;
        }
    }
})();