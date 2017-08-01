(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, userService) {
        var model = this;
        model.login = login;

        function login() {
            if (model.user == null || ((model.user.username == null || model.user.username === "")
                && (model.user.password == null || model.user.password === ""))) {
                model.errormsg = "Please enter a username and password.";
            } else if (model.user.username == null || model.user.username === "") {
                model.errormsg = "Please enter a username.";
            } else if (model.user.password == null || model.user.password === "") {
                model.errormsg = "Please enter your password.";
            } else {
                userService
                    .login(model.user.username, model.user.password)
                    .then(loginSuccess, loginFail);
            }
        }

        function loginSuccess(user) {
            if (user != null) {
                $location.url("/profile");
            } else {
                loginFail("No such user");
            }
        }

        function loginFail(error) {
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
