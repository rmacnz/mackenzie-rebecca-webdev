(function() {
    angular
        .module("RunescapeApp")
        .controller("UserEditController", UserEditController);

    function UserEditController($location, $routeParams, userService, currentUser) {
        var model = this;
        init();

        function init() {
            model.currentUser = currentUser;
            model.userId = $routeParams["userid"];
            if (currentUser && currentUser._id != model.userId) {
                userService.findUserById(model.userId)
                    .then(function (user) {
                        model.user = user;
                    })
            } else {
                model.user = currentUser;
            }
            model.message = null;

            model.updateUser = updateUser;
            model.deleteUser = deleteUser;
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

        // log out this user
        function logout() {
            userService.logout()
                .then(function() {
                    $location.url("");
                });
        }
    }

})();