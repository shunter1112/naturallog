var naturalLog = angular.module('naturalLog', ['angularLocalStorage','ngCookies']);

naturalLog.controller('LogCtrl',['$scope','storage',function($scope, storage) {
    
  storage.bind($scope, 'logs', {defaultValue: [
    {note:'======ウォークショップの開始========', time:"12:33:20"},
    {note:'彼が喋り出した', time:"12:33:44"}
  ]}); 
 
  $scope.addTodo = function() {
    console.log();
    $scope.logs.push({note:$scope.logNote, time:getCurrentTime()});
    $scope.logNote = '';
    setTimeout(function(){
      
      var insideWindowTable = document.querySelector(".logbody table");
      var insideWindow = document.querySelector(".logbody");
      insideWindow.scrollTop = parseInt(window.getComputedStyle(insideWindowTable,null).getPropertyValue("height"));
      // console.log(parseInt(window.getComputedStyle(insideWindowTable,null).getPropertyValue("height")));
      // console.log(insideWindow.scrollTop);
    
    },50);

  };
  
}]);
