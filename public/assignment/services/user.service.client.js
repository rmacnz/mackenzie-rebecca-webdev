(function(){
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonder.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@marley.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "cherrygarcia@gmail.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@ccs.neu.edu"}
        ];

        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            user.created = new Date();
            users.push(user);
            return user;
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
            for(var u in users) {
                if (users[u]._id === userId) {
                    users[u].username = user.username;
                    users[u].email = user.email;
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                }
            }
        }

        function deleteUser(userId) {
            var user = findUserById(userId);
            var index = users.indexOf(user);
            users.splice(index, 1);
        }
    }
})();