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
        $scope.removeTodo = removeTodo;

        function addNote(todo) {
            var newTodo = {title: todo.title};
            $scope.todos.push(newTodo);
        }

        function removeTodo(index) {
            $scope.todos.splice(index, 1);
        }
    }
})();