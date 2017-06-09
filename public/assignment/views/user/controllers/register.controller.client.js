(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, userService) {
        var model = this;
        model.register = register;

        function register() {
            //we have access to username, password, password_verify
            var findUsername = userService.findUserByUsername(model.user.username);
            if (findUsername != null) {
                model.message = "A user with this username already exists. Please choose another username or go to the login page if you already have an account."
            } else if (model.user.password === model.user.password_verify) {
                model.user = userService.createUser(model.user);
                $location.url("/user/" + model.user._id)
            } else {
                model.message = "Passwords did not match. Please try again."
            }
        }
    }
    
})();
