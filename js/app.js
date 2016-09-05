(function(exports) {
    var app = angular.module('TodoApp', ['ngAnimate']);
    app.controller('mainController', ['$scope', function($scope) {
            var data = JSON.parse(localStorage.getItem('todos'));
            $scope.todoList = data || [];
            var saveTodo = function(){
                var todos = $scope.todoList.map(function(todo){
                    return {
                        text: todo.text,
                        done: todo.done
                    }
                })
                localStorage.setItem('todos',JSON.stringify(todos))    
            }
            $scope.$watch('todoList',function(){
                saveTodo()
                if($scope.todoList.length == $scope.doneCount()){
                     $scope.allDone = true
                }else {
                    $scope.allDone = false
                }
            },true)
            $scope.addTodo = function() {
                var text = $scope.text.trim();
                if (text) {
                    $scope.todoList.unshift({
                        text: text,
                        done: false
                    })
                    $scope.text = ""
                }
            }
            $scope.editTodo =function(todo){
                $scope.todoList.forEach(function(todo){ 
                    todo.edit = false 
                })
                todo.edit = true
            }
            $scope.updateTodo =function(todo){
                var text = todo.text.trim();
                if (text) {
                    todo.edit = false
                }  
            }
            $scope.removeTodo = function(todo) {
                var index = $scope.todoList.indexOf(todo);
                $scope.todoList.splice(index, 1);
            }        
            $scope.removeDone = function() {
                var doneList = $scope.todoList.filter(function(item) {
                    return item.done
                })
                for(var i = 0;i < doneList.length; i++){
                    $scope.todoList.splice($scope.todoList.indexOf(doneList[i]), 1)
                }
            }
            $scope.removeAll = function(){
                $scope.todoList.splice(0, $scope.todoList.length);
            }
            $scope.doneCount = function() {
                var dones = $scope.todoList.filter(function(item) {
                    return item.done
                })
                return dones.length
            }
            $scope.selectAll = function(value){
                $scope.todoList.forEach(function(item){
                  item.done = value
                })
            }
        }]);
})(window)
