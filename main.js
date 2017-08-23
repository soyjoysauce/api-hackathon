$(document).ready(init);
var manager = null;
function init(){
    manager = new Manager();
    manager.viewManager.displayChart();
    console.log("init success");
}