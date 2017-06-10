(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, userService) {
        var model = this;
        model.login = login;

        function login() {
            if (model.user != null) {
                var lookupUser = userService.findUserByCredentials(model.user.username, model.user.password);
                if (lookupUser != null) {
                    $location.url("/user/" + lookupUser._id);
                } else {
                    var lookupName = userService.findUserByUsername(model.user.username);
                    if (lookupName != null) {
                        model.errormsg = "Incorrect password for user '" + model.user.username + "'."
                    } else {
                        model.errormsg = "Could not find a user with the given credentials. Please try again."
                    }
                }
            } else {
                model.errormsg = "Please enter a username and password.";
            }
        }
    }
    
})();
