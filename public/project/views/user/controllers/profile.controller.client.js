(function() {
    angular
        .module("RunescapeApp")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($location, $routeParams, userService, currentUser) {
        var model = this;
        init();

        function init() {
            model.userId = currentUser._id;
            model.user = currentUser;
            model.message = null;

            model.updateUser = updateUser;
            model.deleteUser = deleteUser;
            model.unregister = unregister;
            model.logout = logout;
        }


        // update this user based on the information they entered on the profile page
        function updateUser() {
            userService
                .updateUser(model.userId, model.user)
                .then(function() {
                    model.message = "User updated successfully.";
                });
        }

        // remove this user from the web service
        function deleteUser() {
            userService
                .deleteUser(model.userId)
                .then(function() {
                    $location.url("");
                });
        }

        function unregister() {
            userService
                .unregister()
                .then(function() {
                    $location.url("");
                });
        }

        // log out this user
        function logout() {
            userService.logout()
                .then(function() {
                    $location.url("");
                });
        }
    }
    
})();
