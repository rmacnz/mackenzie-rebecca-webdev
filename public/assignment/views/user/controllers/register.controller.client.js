(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, $routeParams, userService) {
        var model = this;
        model.register = register;

        function register(user) {
            //we have access to username, password, password_verify
            var findUsername = userService.findUserByUsername(user.username);
            if (findUsername != null) {
                model.message = "A user with this username already exists. Please choose another username or go to the login page if you already have an account."
            } else if (user.password === user.password_verify) {
                user = userService.createUser(user);
                $location.url("/user/" + user._id)
            } else {
                model.message = "Passwords did not match. Please try again."
            }
        }
    }
    
})();
