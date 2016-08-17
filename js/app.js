(function(window) {
    window.angular.module('TodoApp', []);
    window.angular.module('TodoApp')
        .controller('mainController', ['$scope', function($scope) {
            $scope.text = '';
            $scope.todoList = [];
            for (var i = 0, len = localStorage.length; i < len; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                (function(val) {
                    $scope.todoList.push({ text: val });
                })(value)
            }
            $scope.add = function() {
                var text = $scope.text.trim();
                if (text) {
                    $scope.todoList.unshift({
                        text: text,
                        done: false
                    });
                    localStorage.setItem(new Date().getTime(), text)
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
