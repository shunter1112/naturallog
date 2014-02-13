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
  hours = current_date.getHours();
  minutes = current_date.getMinutes();
  seconds = current_date.getSeconds();
  return fillZero(2,hours) + ":" + fillZero(2,minutes) + ":" + fillZero(2,seconds); 
}

setInterval(function () {
  countdown.innerHTML = getCurrentTime();
}, 1000);

/* 
* Input Size Adjusting
*/ 

function changeInputSize(){
  
  var inputElm = document.querySelector("input[type='text']");
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