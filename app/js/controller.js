/*-----------------------------------------------------------------------------
  ---------------------------- Controller.js------------------------------------
  ----------------------------------------------------------------------------*/

var naturalLog = angular.module('naturalLog', ['angularLocalStorage','ngCookies']);
naturalLog.directive('ngBlur', function() {
  return function( scope, elem, attrs ) {
    elem.bind('blur', function() {
      scope.$apply(attrs.ngBlur);
    });
  };
});

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
          date: "2014/02/11",
          notes : [
            {time: "09:00:12", content: "今日は"},
            {time: "09:00:12", content: "こんな"},
            {time: "09:00:12", content: "ログを"},
            {time: "09:12:90", content: "取ったよぉ"}
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
  
  $scope.editNote = function(date_note,target,index){
     console.log(date_note.notes[index]);
     console.log(target);
     date_note.notes[index].content = target.innerText;
  }
  
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
    
     mainPanel.classList.toggle("isOpened");
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
      return output;
      
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

/*-----------------------------------------------------------------------------
  ---------------------------- Utility.js------------------------------------
  ----------------------------------------------------------------------------*/
  
  /* http://note19.com/2007/05/27/javascript-guid-generator/ */
  function S4() {
     return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  function guid() {
     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  /*
  * Timer Code
  */ 

  function fillZero(keta, num) {
    var src = new String(num);
    var cnt = keta - src.length;
    if (cnt <= 0) return src;
    while (cnt-- > 0) src = "0" + src; return src;
  }

  var target_date = new Date("Aug 15, 2019").getTime();
  var hours, minutes, seconds;
  var countdown = document.getElementById("currentTime");

  function getCurrentTime(){
    var current_date = new Date();
    var hours = current_date.getHours();
    var minutes = current_date.getMinutes();
    var seconds = current_date.getSeconds();
    return fillZero(2,hours) + ":" + fillZero(2,minutes) + ":" + fillZero(2,seconds); 
  }

  function getCurrentDate(){
    var current_date = new Date();
    var years = current_date.getFullYear();
    var month = current_date.getMonth()+1;
    var day = current_date.getDate();
    return fillZero(4,years) + "/" + fillZero(2,month) + "/" + fillZero(2,day); 
  }

  setInterval(function () {
    countdown.innerHTML = getCurrentTime();
  }, 1000);
  
/*-----------------------------------------------------------------------------
  ---------------------------- Sub_Panel.js------------------------------------
  ----------------------------------------------------------------------------*/

function changeInputSize(){

  var inputElm = document.querySelector("#MainPanel input[type='text']");
  var countdownElm = document.getElementById("currentTime");
  var submitButtonElm = document.querySelector("input.btn-primary");

  console.log("window-size : " + document.body.clientWidth);
  console.log("countdownElm : " + parseInt(window.getComputedStyle(countdownElm,null).getPropertyValue("width")));
  console.log("submitButton : " + parseInt(window.getComputedStyle(submitButtonElm,null).getPropertyValue("width")));

  var countdownHeight = parseInt(window.getComputedStyle(countdownElm,null).getPropertyValue("width"));
  var submitButtonHeight = parseInt(window.getComputedStyle(submitButtonElm,null).getPropertyValue("width"));
  var margin = 40;  

  var inputHeight = document.body.clientWidth - countdownHeight - submitButtonHeight - margin;
  //insideWindow.style.width = parseInt(window.getComputedStyle(insideWindowTable,null).getPropertyValue("height"));
  inputElm.style.width = inputHeight + "px";

};

changeInputSize();

window.addEventListener("resize", function(){
  changeInputSize();
});

var subPanelCaller = document.getElementById("SubPanelCaller");
var mainPanel = document.getElementById("MainPanel");

subPanelCaller.addEventListener("click",function(){
  mainPanel.classList.toggle("isOpened");
});


