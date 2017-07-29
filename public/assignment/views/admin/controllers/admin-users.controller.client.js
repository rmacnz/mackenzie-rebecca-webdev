(function() {
    angular
        .module("WebAppMaker")
        .controller("AdminUserController", AdminUserController);

    function AdminUserController(currentUser, userService) {
        var model = this;
        init();

        function init() {
            model.user = currentUser;
            userService
                .findAllUsers()
                .then(function (userList) {
                    model.userList = userList;
                });

            model.deleteAccount = deleteAccount;
        }

        function deleteAccount(userId) {
            userService
                .deleteUser(userId)
                .then(function() {
                    init();
                });
        }
    }
})();