(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($location, $routeParams, userService) {
        var model = this;
        init();

        function init() {
            model.userId = $routeParams["uid"];
            model.message = null;
            userService
                .findUserById(model.userId)
                .then(initializeUser);
        }

        // set the user in the model
        function initializeUser(user) {
            model.user = user;

            model.updateUser = updateUser;
            model.deleteUser = deleteUser;
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
    }
    
})();
