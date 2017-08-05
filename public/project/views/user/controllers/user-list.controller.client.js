(function() {
    angular
        .module("RunescapeApp")
        .controller("UserListController", UserListController);

    function UserListController(userService, currentUser) {
        var model = this;
        init();

        function init() {
            model.user = currentUser;
            model.headerTitle = "Manage Users";
            userService.findAllUsers()
                .then(function (userList) {
                    model.userList = userList;
                });
        }
    }
})();