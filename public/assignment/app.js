/**
 * Created by rolob on 5/19/2017.
 */
(function(){
    angular
        .module("LoginApp",[])
        .controller("LoginController", LoginController);

    function LoginController($scope) {
        function loginUser(user) {
            console.log(user);
        }
    }
})();