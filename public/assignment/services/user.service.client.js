(function(){
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            createUser: createUser,
            findAllUsers: findAllUsers,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            unregister: unregister,
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user", user)
                .then(function(response) {
                    return response.data;
                });
        }

        // Return a list of all the users
        function findAllUsers() {
            return $http.get("/api/user")
                .then(function (response) {
                    return response.data;
                });
        }

        // Returns the user with this ID
        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/username?username=" + username;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        // Returns the user with the given username and password
        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function unregister() {
            return $http.delete("/api/user")
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var credentials = {
                username: username,
                password: password
            }
            return $http.post("/api/login", credentials)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function checkLoggedIn() {
            return $http.get("/api/checkLoggedIn")
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post("/api/logout")
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            return $http.post("/api/register", user)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();