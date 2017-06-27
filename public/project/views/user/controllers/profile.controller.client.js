(function() {
    angular
        .module("FundiesStaffPage")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, userService) {
        var model = this;
        init();

        function init() {
            // set the user whose profile this is
            model.userId = $routeParams["uid"];
            model.user = userService.findUserById(model.userId);

            model.updateUser = updateUser;
        }


        // update this user based on the information they entered on the profile page
        function updateUser() {
            userService.updateUser(model.userId, model.user);
        }
    }
    
})();
