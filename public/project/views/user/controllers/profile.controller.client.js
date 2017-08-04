(function() {
    angular
        .module("RunescapeApp")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($location, $routeParams, userService, currentUser) {
        var model = this;
        init();

        function init() {
            model.headerTitle = "Profile";
            model.userId = currentUser._id;
            model.user = currentUser;
            model.message = null;

            model.updateUser = updateUser;
            model.deleteUser = deleteUser;
            model.unregister = unregister;
            model.logout = logout;
            if (currentUser.roles.indexOf("MEMBER") > -1) {
                userService
                    .findMemberInfo(currentUser.username)
                    .then(function (info) {
                        model.memberInfo = info;
                    });
                model.skillIdToName = skillIdToName;
            }
        }


        // update this user based on the information they entered on the profile page
        function updateUser() {
            userService
                .updateUser(model.userId, model.user)
                .then(function() {
                    model.message = "User updated successfully.";
                });
        }

        // remove this user from the web service
        function deleteUser() {
            userService
                .deleteUser(model.userId)
                .then(function() {
                    $location.url("");
                });
        }

        function unregister() {
            userService
                .unregister()
                .then(function() {
                    $location.url("");
                });
        }

        // log out this user
        function logout() {
            userService.logout()
                .then(function() {
                    $location.url("");
                });
        }

        function skillIdToName(idNum) {
            var skills = ["Attack", "Defence", "Strength", "Constitution", "Ranged",
            "Prayer", "Magic", "Cooking", "Woodcutting", "Fletching", "Fishing",
            "Firemaking", "Crafting", "Smithing", "Mining", "Herblore", "Agility",
            "Thieving", "Slayer", "Farming", "Runecrafting", "Hunter", "Construction",
            "Summoning", "Dungeoneering", "Divination", "Invention"];
            return skills[idNum];
        }
    }
    
})();
