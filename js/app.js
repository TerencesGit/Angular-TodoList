(function(window) {
    var app = window.angular.module('TodoApp', []);
    app.controller('mainController', ['$scope', function($scope) {
            $scope.title='任务列表';
            $scope.text = '';
            $scope.todoList = [];
            for (var i = 0, len = localStorage.length; i < len; i++) {
                var key = localStorage.key(i);
                (function(val) {
                    $scope.todoList.push({ text: val });
                })(key)
            }
            $scope.add = function() {
                var text = $scope.text.trim();
                if (text) {
                    $scope.todoList.unshift({
                        text: text,
                        done: false
                    });
                    localStorage.setItem(text,new Date().getTime())
                    $scope.text = '';
                }
            }
            $scope.delete = function(todo) {
                var index = $scope.todoList.indexOf(todo);
                $scope.todoList.splice(index, 1);
                localStorage.removeItem(todo.text);
            }
            $scope.clear = function(){
                $scope.todoList.splice(0,$scope.todoList.length);
                localStorage.clear();
            }
            $scope.doneCount = function() {
                var temp = $scope.todoList.filter(function(item) {
                    return item.done;
                })
                return temp.length;
            }
        }]);
})(window)
