# sharingan

use html5canvas

copy the screen and draw something


### usage

```

import Sharingan from "sharingan";

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

```


###  License

MIT

