/**
 * Created by rolob on 5/18/2017.
 */
(function(){
    angular
        .module("TodoApp", [])
        .controller("TodoListController", TodoListController);

    function TodoListController($scope) {
        $scope.todos = [];

        $scope.addNote = addNote;
        $scope.editTodo = editTodo;
        $scope.updateTodo = updateTodo;
        $scope.removeTodo = removeTodo;

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
            $scope.todos.splice(index, 1);
        }
    }
})();