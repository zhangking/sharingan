import Sharingan from "./lib/sharingan.js";

var s;
function takeScreenshot() {
    s = new Sharingan({
      element: document.getElementById('view'),
      target:document.querySelector('canvas'),
      scale:0.6
    });
    s.catch();
}

function getImg(){
  console.log(s.getData());
}

window.takeScreenshot = takeScreenshot;
window.getImg = getImg;
