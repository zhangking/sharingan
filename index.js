import Sharingan from "./lib/sharingan.js";

var s;
function takeScreenshot() {
    s = new Sharingan({
      element: document.getElementById('view'),
      container: document.body,
    });
    s.catch();
}

function getImg(){
  console.log(s.getData());
}

window.takeScreenshot = takeScreenshot;
window.getImg = getImg;
