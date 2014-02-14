var naturalLog = angular.module('naturalLog', ['angularLocalStorage','ngCookies']);

naturalLog.controller('LogCtrl',['$scope','storage',function($scope, storage) {
    
  var default_uuid = "8982a835-bc35-edb3-4252-646f622e0d25";
  /*
  [
  { 
    uuid : ""
    note_title : "Title of note",
    date_notes:[
      {
        date: "When / YYYY/MM/DD"
        notes : [
          {
            note: "Content",
            time: "When it was / HH:mm:ss"
          },...
        ]
      },...
    ]
  },...
  ] 
  */
    
  storage.bind($scope, 'logs', {defaultValue: [
    {
      uuid : default_uuid,
      note_title : "広島大学第１回WS",
      date_notes : [
        {
          date: "2014/02/10",
          notes : [
            {time: "09:00:12", content: "ワークショップ開始"},
            {time: "09:00:12", content: "どうしたものかなぁ"},
            {time: "09:00:12", content: "困ったね"},
            {time: "09:12:90", content: "ワークショップで焦る人続出"}
          ]
        }
      ]
    },
    {
      uuid : String(guid()),
      note_title : "九州大学第１回WS",
      date_notes : [
        {
          date: "2014/02/14",
          notes : [
            {time: "09:00:12", content: "はあ"},
            {time: "09:00:12", content: "どうのかなぁ"},
            {time: "09:00:12", content: "たね"},
            {time: "09:12:90", content: "ョップで焦る人続出"}
          ]
        },
        {
          date: "2014/02/12",
          notes : [
            {time: "09:00:12", content: "テス"},
            {time: "09:00:12", content: "どぁ"},
            {time: "09:00:12", content: "たね"},
            {time: "09:12:90", content: "ョッ続出"}
          ]
        }
      ]
    }
  ]
  }); 
  storage.bind($scope, 'noteFilter', {defaultValue: default_uuid} );
 
  $scope.addNote = function() {

    var thatLog = $scope.logs.filter(function(item, index){
      if (item.uuid == $scope.noteFilter) return true;
    });

    var thatDateNote 
    while(!thatDateNote){
      thatDateNote = thatLog[0].date_notes.filter(function(item, index){
        if (item.date == getCurrentDate()) return true;
      });
      if(thatDateNote.length==0) {
        thatDateNote = null;
        thatLog[0].date_notes.push({date: String(getCurrentDate()), notes: []})
      }
    }

    thatDateNote[0].notes.push({ content:$scope.noteContent, time:getCurrentTime()});

    $scope.noteContent = '';
    setTimeout(function(){
      
      var insideWindowTable = document.querySelector(".logbody table");
      var insideWindow = document.querySelector(".logbody");
      insideWindow.scrollTop = parseInt(window.getComputedStyle(insideWindowTable,null).getPropertyValue("height"));
      // console.log(parseInt(window.getComputedStyle(insideWindowTable,null).getPropertyValue("height")));
      // console.log(insideWindow.scrollTop);
    
    },50);
  };
  
  $scope.resetLog = function(){ storage.clearAll(); }
  
}]);
