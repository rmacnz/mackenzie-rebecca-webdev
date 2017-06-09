(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, userService) {
        var model = this;
        model.login = login;

        function login() {
            var lookupUser = userService.findUserByCredentials(model.user.username, model.user.password);
            if (lookupUser != null) {
                $location.url("/user/" + lookupUser._id);
            } else {
                model.message = "Could not find a user with the given credentials. Please try again."
            }
        }
    }
    
})();
