(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($location, $routeParams, userService) {
        var model = this;
        model.updateUser = updateUser;

        // set the user whose profile this is
        var userId = $routeParams["uid"];
        model.user = userService.findUserById(userId);

        // update this user based on the information they entered on the profile page
        function updateUser(user) {
            userService.updateUser(user._id, user);
        }
    }
    
})();
