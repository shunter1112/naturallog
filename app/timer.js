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
  hours = current_date.getHours();
  minutes = current_date.getMinutes();
  seconds = current_date.getSeconds();
  return fillZero(2,hours) + ":" + fillZero(2,minutes) + ":" + fillZero(2,seconds); 
}

setInterval(function () {
  countdown.innerHTML = getCurrentTime();
}, 1000);

