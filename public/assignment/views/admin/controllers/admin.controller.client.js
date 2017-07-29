(function() {
    angular
        .module("WebAppMaker")
        .controller("AdminController", AdminController);

    function AdminController(currentUser) {
        var model = this;
        init();

        function init() {
            model.user = currentUser;
        }
    }
})();