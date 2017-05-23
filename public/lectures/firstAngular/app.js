/**
 * Created by rolob on 5/18/2017.
 */
(function(){
    angular
        .module("TodoApp", [])
        .controller("TodoListController", TodoListController);

    function TodoListController($scope, $http) {
        init();

        $scope.addNote = addNote;
        $scope.editTodo = editTodo;
        $scope.updateTodo = updateTodo;
        $scope.removeTodo = removeTodo;

        function init() {
            $scope.todos = [];
            getTodosFromServer();
        }

        function getTodosFromServer() {
            $http.get("/api/todo")
                .then(function(response){
                    $scope.todos = response.data;
                });
        }

        function addNote(todo) {
            var newTodo = angular.copy(todo);
            $scope.todos.push(newTodo);
        }

        function editTodo(todo) {
            $scope.selectedIndex = $scope.todos.indexOf(todo);
            $scope.todo = angular.copy(todo);
        }

        function updateTodo(todo) {
            var newTodo = angular.copy(todo);
            $scope.todos[$scope.selectedIndex] = newTodo;
        }

        function removeTodo(todo) {
            var index = $scope.todos.indexOf(todo);
            $http.delete("/api/todo/" + index)
                .then(function(response){
                    $scope.todos = response.data;
                });
        }
    }
})();