(function() {
    angular
        .module("FundiesStaffPage")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.view.client.html",
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/options", {
                templateUrl: "views/user/templates/options.view.client.html",
                controller: "OptionsController",
                controllerAs: "model"
            })
            .when("/options/:uid", {
                templateUrl: "views/user/templates/options.view.client.html",
                controller: "OptionsController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            });
    }
})();
