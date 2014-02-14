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