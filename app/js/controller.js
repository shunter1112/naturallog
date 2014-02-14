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
          date: "2014/02/09",
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
  
  $scope.addLog = function(){
    var new_uuid = guid();
    $scope.logs.push({
      uuid : String(new_uuid),
      note_title : $scope.newLog,
      date_notes : [
        {
          date: String(getCurrentDate()),
          notes : []
        }
      ]
    });
    $scope.noteFilter = new_uuid;
    $scope.newLog = "";
  }
  
  $scope.resetLog = function(){ storage.clearAll(); }
  
  $scope.downloadLog = function(){
    
    /* cited from http://d.hatena.ne.jp/do_aki/20130225/1361763613 */
    
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    
    var filename = "";
    output_data = (function(){   
      var thatLog = $scope.logs.filter(function(item, index){
        if (item.uuid == $scope.noteFilter) return true;
      })[0];
      filename = thatLog.note_title;
      var output = [
        [thatLog.note_title,'',''],
        ['DATE','TIME','NOTE'],
      ]
      console.log(thatLog);
      
      for(var i in thatLog.date_notes){
        var dn = thatLog.date_notes[i];
        for(var j in dn.notes){
          var n = dn.notes[j];
          output.push([dn.date, n.time, n.content]);
        }
      }
      return output
    })();
    
    var csv_data = output_data.map(function(l){return l.join(',')}).join('\r\n');
    var blob = new Blob([bom, csv_data], { type: 'text/csv' });
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";    
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    
  }
  
  $scope.deleteLog = function(uuid){
    if(window.confirm('Are you sure to delete this log?')){
      var thatIndex; 
      for (var i in $scope.logs) if ($scope.logs[i].uuid == uuid) thatIndex = i;
      console.log(thatIndex);
      console.log($scope.logs[thatIndex]);
      $scope.logs.splice(thatIndex,1);
    }
  }
  
}]);
