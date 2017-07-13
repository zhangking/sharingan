import Sharingan from "./lib/sharingan.js";

var s;
function takeScreenshot() {
    s = new Sharingan({
      element: document.getElementById('view'),
      target:document.querySelector('canvas'),
      scale:1
    });
    s.catch(function(){});
}

window.takeScreenshot = takeScreenshot;
