(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, userService) {
        var model = this;
        model.login = login;

        function login(user) {
            user = userService.findUserByCredentials(user.username, user.password);
            if (user != null) {
                $location.url("/user/" + user._id);
            } else {
                model.message = "Could not find a user with the given credentials. Please try again."
            }
        }
    }
    
})();
