(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($location, $routeParams, userService) {
        var model = this;
        model.updateUser = updateUser;
        init();

        function init() {
            // set the user whose profile this is
            model.userId = $routeParams["uid"];
            model.user = userService.findUserById(model.userId);
        }


        // update this user based on the information they entered on the profile page
        function updateUser() {
            userService.updateUser(model.userId, model.user);
        }
    }
    
})();
