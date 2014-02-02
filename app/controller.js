function LogCtrl($scope) {
  $scope.logs = [
    {note:'======ウォークショップの開始========', time:"12:33:20"},
    {note:'彼が喋り出した', time:"12:33:44"}];
 
  $scope.addTodo = function() {
    $scope.logs.push({note:$scope.logNote, time:getCurrentTime()});
    $scope.logNote = '';
  };
 
  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };
 
  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}
