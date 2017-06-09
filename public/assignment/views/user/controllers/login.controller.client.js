(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($scope) {
        var vm = this;
        $scope.login = login;

        function login(user) {
            var users = [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];

            var matchboth = false;
            var matchname = false;

            for (var u in users) {
                var atindex = users[u];
                if (atindex.username === user.username) {
                    matchname = true;
                    if (atindex.password === user.password) {
                        matchboth = true;
                    }
                }
            }

            if (matchboth) {
                $scope.message = "Welcome " + user.username + "!";
            } else if (matchname) {
                $scope.message = "Credentials were incorrect for user '" + user.username + "'.";
            } else {
                $scope.message = "No user with username '" + user.username + "' was found.";
            }


            //user = UserService.findUserByCredentials(user.username, user.password);
        }
    }
    
})();
