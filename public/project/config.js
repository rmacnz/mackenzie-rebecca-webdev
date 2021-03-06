(function() {
    angular
        .module("RunescapeApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    currentUser: findCurrentUser
                }
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model",
                resolve: {
                    currentUser: verifyLogout
                }
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model",
                resolve: {
                    currentUser: verifyLogout
                }
            })
            .when("/profile", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: verifyLogin
                }
            })
            .when("/user/:userid", {
                templateUrl: "views/user/templates/user-edit.view.client.html",
                controller: "UserEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: verifyCanEdit
                }
            })
            .when("/item/search", {
                templateUrl: "views/item/templates/item-search.view.client.html",
                controller: "ItemSearchController",
                controllerAs: "model",
                resolve: {
                    currentUser: findCurrentUser
                }
            })
            .when("/offer/search", {
                templateUrl: "views/offer/templates/offer-search.view.client.html",
                controller: "OfferSearchController",
                controllerAs: "model",
                resolve: {
                    currentUser: findCurrentUser
                }
            })
            .when("/item/detail/:itemid", {
                templateUrl: "views/item/templates/item-detail.view.client.html",
                controller: "ItemDetailController",
                controllerAs: "model",
                resolve: {
                    currentUser: findCurrentUser
                }
            })
            .when("/offer/new", {
                templateUrl: "views/offer/templates/offer-new.view.client.html",
                controller: "OfferNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: verifyLogin
                }
            })
            .when("/offer/detail/:offerid", {
                templateUrl: "views/offer/templates/offer-detail.view.client.html",
                controller: "OfferDetailController",
                controllerAs: "model",
                resolve: {
                    currentUser: findCurrentUser
                }
            })
            .when("/users", {
                templateUrl: "views/user/templates/user-list.view.client.html",
                controller: "UserListController",
                controllerAs: "model",
                resolve: {
                    currentUser: verifyAdmin
                }
            })
            .when("/categories", {
                templateUrl: "views/category/templates/category-list.view.client.html",
                controller: "CategoryListController",
                controllerAs: "model",
                resolve: {
                    currentUser: verifyAdmin
                }
            });
    }

    function verifyLogin($q, $location, userService) {
        var deferred = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === "0") {
                    deferred.reject();
                    $location.url("/login");
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function verifyLogout($q, $location, userService) {
        var deferred = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === "0") {
                    deferred.resolve(null);
                } else {
                    deferred.reject();
                    $location.url("/profile");
                }
            });
        return deferred.promise;
    }

    function findCurrentUser($q, userService) {
        var deferred = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === "0") {
                    deferred.resolve(null);
                } else {
                    deferred.resolve(currentUser);

                }
            });
        return deferred.promise;
    }

    function verifyAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === "0") {
                    deferred.reject();
                    $location.url("/login");
                } else if (currentUser.roles.indexOf("ADMIN") === -1) {
                    deferred.reject();
                    $location.url("/profile");
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function verifyCanEdit($q, $location, $route, userService) {
        var userId = $route.current.params["userid"];
        var deferred = $q.defer();
        userService.checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser == "0") {
                    deferred.reject();
                    $location.url("/");
                } else if (currentUser.roles.indexOf("ADMIN") > -1) {
                    deferred.resolve(currentUser);
                } else if (currentUser._id === userId) {
                    deferred.resolve(currentUser);
                } else {
                    deferred.reject();
                    $location.url("/user/" + currentUser._id);
                }
            });
        return deferred.promise;
    }
})();
