(function() {
    angular
        .module("FundiesStaffPage")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, userService) {
        var model = this;
        model.register = register;

        function register() {
            if (model.user != null && model.user.username != null && model.user.password != null) {
                var findUsername = userService.findUserByUsername(model.user.username);
                if (findUsername != null) {
                    model.errormsg = "A user with this username already exists. Please choose another username or go to the login page if you already have an account."
                } else if (model.user.password === model.user.password_verify) {
                    model.user = userService.createUser(model.user);
                    $location.url("/user/" + model.user._id)
                } else {
                    model.errormsg = "Passwords did not match. Please try again."
                }
            } else {
                model.errormsg = "Please enter a username and password."
            }
        }
    }
    
})();
