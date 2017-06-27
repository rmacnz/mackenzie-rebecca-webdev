(function() {
    angular
        .module("FundiesStaffPage")
        .controller("OptionsController", OptionsController);

    function OptionsController($routeParams, userService) {
        var model = this;
        init();

        function init() {
            // set the user who is looking at options
            model.userId = $routeParams["uid"];
            if (model.userId != null) {
                model.user = userService.findUserById(model.userId);
            }
        }
    }

})();
