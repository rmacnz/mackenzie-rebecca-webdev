(function() {
    angular
        .module("RunescapeApp")
        .controller("LoginController", LoginController);

    function LoginController($location, userService) {
        var model = this;
        model.login = login;

        function login() {
            if (model.user != null) {
                userService
                    .login(model.user.username, model.user.password)
                    .then(loginSuccess, loginFail);
            } else {
                model.errormsg = "Please enter a username and password.";
            }
        }

        function loginSuccess(user) {
            if (user != null) {
                $location.url("/");
            } else {
                loginFail("No such user");
            }
        }

        function loginFail(error) {
            console.log(error);
            userService.findUserByUsername(model.user.username)
                .then(nameSuccess, nameFail);
        }

        function nameSuccess(user) {
            console.log(user);
            if (user != null) {
                model.errormsg = "Incorrect password for user '" + model.user.username + "'.";
            } else {
                nameFail("No user with this username");
            }
        }

        function nameFail(error) {
            model.errormsg = "Could not find a user with the given credentials. Please try again.";
        }
    }
    
})();
