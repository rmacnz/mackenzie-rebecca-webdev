(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($location, $routeParams, userService) {
        var model = this;
        model.updateUser = updateUser;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            userService
                .findUserById(model.userId)
                .then(initializeUser);
        }


        // update this user based on the information they entered on the profile page
        function updateUser() {
            userService.updateUser(model.userId, model.user);
        }

        function initializeUser(user) {
            model.user = user;
        }
    }
    
})();
