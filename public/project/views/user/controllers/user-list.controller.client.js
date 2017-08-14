(function() {
    angular
        .module("RunescapeApp")
        .controller("UserListController", UserListController);

    function UserListController(userService, currentUser, $location) {
        var model = this;
        init();

        function init() {
            model.user = currentUser;
            model.headerTitle = "Manage Users";
            model.editUser = editUser;
            userService.findAllUsers()
                .then(function (userList) {
                    model.userList = userList;
                });
        }

        function editUser(userId) {
            $location.url("/user/" + userId);
        }
    }
})();