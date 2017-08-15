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
            model.addUser = addUser;
            initializeUserList();
        }

        function initializeUserList() {
            userService.findAllUsers()
                .then(function (userList) {
                    model.userList = userList;
                });
        }

        function editUser(userId) {
            $location.url("/user/" + userId);
        }

        function addUser() {
            if (!model.new) {
                model.errormsg="You have not entered any information for this user.";
                return;
            } else if (!model.new.username) {
                model.errormsg="You must enter a username for this user.";
                return;
            } else if (!model.new.password) {
                model.errormsg = "You must enter a password for this user.";
                return;
            }
            if (!model.new.gold) {
                model.new.gold = 1000;
            }
            model.new.roles = ["USER"];
            userService.findMemberInfo(model.new.username)
                .then(foundMemberInfo, continueRegistration);
        }

        function foundMemberInfo(memberInfo) {
            if (memberInfo && memberInfo.name) {
                model.new.roles.push("MEMBER");
                model.new.memberInfo = {
                    totalSkill: memberInfo.totalskill,
                    totalXP: memberInfo.totalxp,
                    combat: memberInfo.combatlevel,
                    skills: memberInfo.skillvalues
                }
            }
            continueRegistration();
        }

        function continueRegistration() {
            userService.createUser(model.new)
                .then(createSuccess);
        }

        function createSuccess(user) {
            model.new = null;
            initializeUserList();
        }
    }
})();