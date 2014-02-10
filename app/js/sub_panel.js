var subPanelCaller = document.getElementById("SubPanelCaller");
var mainPanel = document.getElementById("MainPanel");

subPanelCaller.addEventListener("click",function(){
  mainPanel.classList.toggle("isOpened");
});