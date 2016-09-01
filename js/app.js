(function(window) {
    var app = window.angular.module('TodoApp', []);
    app.controller('mainController', ['$scope', function($scope) {
            $scope.title='任务列表';
            $scope.text = '';
            var data = JSON.parse(localStorage.getItem('todos'));
            $scope.todoList = data || [];
            // $scope.todoList = $scope.todoList.map(function(todo){
            //     return {
            //         text: todo.text,
            //         done: todo.done,
            //         edti: false
            //     }
            // })
            var saveTodo = function(){
                var todos = $scope.todoList.map(function(todo){
                    return {
                        text: todo.text,
                        done: todo.done
                    }
                })
                localStorage.setItem('todos',JSON.stringify(todos))    
            }
            $scope.addTodo = function() {
                var text = $scope.text.trim();
                if (text) {
                    $scope.todoList.unshift({
                        text: text,
                        done: false
                    });
                    saveTodo();
                    $scope.text = '';
                }
            }
            $scope.doneTodo =function(todo){
                saveTodo();
            }
            $scope.editTodo =function(todo){
                $scope.todoList.forEach((todo) => { todo.edit = false });
                todo.edit = true
            }
            $scope.updateTodo =function(todo){
                var text = todo.text.trim();
                if (text) {
                    saveTodo()
                    todo.edit = false
                }  
            }
            $scope.removeTodo = function(index) {
                $scope.todoList.splice(index, 1);
                saveTodo();
            }
            $scope.removeAll = function(){
                $scope.todoList.splice(0, $scope.todoList.length);
                saveTodo();
            }
            $scope.doneCount = function() {
                var dones = $scope.todoList.filter(function(item) {
                    return item.done;
                })
                return dones.length;
            }
        }]);
})(window)
