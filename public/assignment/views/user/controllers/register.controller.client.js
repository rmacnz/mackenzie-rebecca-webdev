(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, userService) {
        var model = this;
        model.register = register;

        function register() {
            if (model.user != null && model.user.username != null && model.user.username != ""
                && model.user.password != null && model.user.password != "") {
                userService.findUserByUsername(model.user.username)
                    .then(nameSuccess, nameFail);
            } else {
                model.errormsg = "Please enter a username and password."
            }
        }

        function nameSuccess(user) {
            if (user != null) {
                model.errormsg = "A user with this username already exists. Please choose another username or go to the login page if you already have an account."
            } else {
                nameFail("No such user");
            }
        }

        function nameFail(error) {
            if (model.user.password === model.user.password_verify) {
                //model.user = userService.createUser(model.user);
                userService.register(model.user)
                    .then(createSuccess);
            } else {
                model.errormsg = "Passwords did not match. Please try again."
            }
        }

        function createSuccess(user) {
            model.user = user;
            $location.url("/profile");
        }
    }
    
})();
