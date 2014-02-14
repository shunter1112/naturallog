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

  