(function(){
    angular
        .module('RunescapeApp')
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
            register: register,
            findMemberInfo: findMemberInfo,
            updateUserCreateBuy: updateUserCreateBuy,
            updateUserCreateSell: updateUserCreateSell,
            respondToSellOffer: respondToSellOffer,
            respondToBuyOffer: respondToBuyOffer,
            updateUserBuyComplete: updateUserBuyComplete,
            updateUserSellComplete: updateUserSellComplete
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
                }, function (error) {
                    console.log(error);
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
                }, function (error) {
                    console.log(error);
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

        function findMemberInfo(username) {
            var url = "/api/rs/member/" + username;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updateUserCreateBuy(user, totalPrice, offerId) {
            // remove gold, update buys
            if (user.roles.indexOf("ADMIN") === -1) {
                user.gold = user.gold - totalPrice;
            }
            user.buys.push(offerId);
            updateUser(user._id, user);
        }

        function updateUserCreateSell(user, itemId, numSold, offerId) {
            // update inventory, update sells
            if (user.roles.indexOf("ADMIN") === -1) {
                user.inventory = removeFromInventory(user.inventory, numSold, itemId);
            }
            user.sells.push(offerId);
            updateUser(user._id, user);
        }

        function respondToSellOffer(user, totalPrice, numBought, itemId, offerId) {
            // remove gold, update inventory, update buys
            if (user.roles.indexOf("ADMIN") === -1) {
                user.gold = user.gold - totalPrice;
                user.inventory = addToInventory(user.inventory, numBought, itemId);
            }
            user.buys.push(offerId);
            updateUser(user._id, user);
        }

        function respondToBuyOffer(user, totalPrice, numSold, itemId, offerId) {
            // add gold, update inventory, update sells
            if (user.roles.indexOf("ADMIN") === -1) {
                user.gold = user.gold + totalPrice;
                user.inventory = removeFromInventory(user.inventory, numSold, itemId);
            }
            user.sells.push(offerId);
            updateUser(user._id, user);
        }

        function updateUserBuyComplete(user, numBought, itemId) {
            // update inventory (gold removal already done)
            user.inventory = addToInventory(user.inventory, numBought, itemId);
            updateUser(user._id, user);
        }

        function updateUserSellComplete(user, totalPrice) {
            user.gold = user.gold + totalPrice;
            updateUser(user._id, user);
        }

        function addToInventory(inventory, num, id) {
            var itemFound = false;
            var index;
            for (index in inventory) {
                var currentItem = inventory[index];
                if (currentItem._id === id) {
                    itemFound = true;
                    inventory[index] = {
                        num: currentItem.num + num,
                        item: id
                    };
                }
            }
            if (!itemFound) {
                inventory.push({
                    num: num,
                    item: id
                });
            }
            return inventory;
        }

        function removeFromInventory(inventory, num, id) {
            var itemFound = false;
            var removeIndex = -1;
            var index;
            for (index in inventory) {
                var currentItem = inventory[index];
                if (currentItem._id === id) {
                    itemFound = true;
                    if (currentItem.num === num) {
                        removeIndex = index;
                    } else {
                        inventory[index] = {
                            num: currentItem.num - num,
                            item: id
                        };
                    }
                }
            }
            if (removeIndex > -1) {
                inventory.splice(removeIndex, 1);
            }
            return inventory;
        }

    }
})();