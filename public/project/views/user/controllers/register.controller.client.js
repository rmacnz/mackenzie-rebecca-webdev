(function() {
    angular
        .module("FundiesStaffPage")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, userService) {
        var model = this;
        model.register = register;

        function register() {
            if (model.user != null && model.user.username != null && model.user.password != null) {
                userService.findUserByUsername(model.user.username)
                    .then(nameSuccess, nameFail);
            } else {
                model.errormsg = "Please enter a username and password."
            }
        }

        function nameSuccess(user) {
            model.errormsg = "A user with this username already exists. Please choose another username or go to the login page if you already have an account."
        }

        function nameFail(error) {
            if (model.user.password === model.user.password_verify) {
                //model.user = userService.createUser(model.user);
                userService.createUser(model.user)
                    .then(createSuccess, createFail);
            } else {
                model.errormsg = "Passwords did not match. Please try again."
            }
        }

        function createSuccess(user) {
            model.user = user;
            $location.url("/user/" + user._id);
        }

        function createFail(error) {
            console.log("Failed to create user");
            console.log(error);
        }
    }
    
})();
