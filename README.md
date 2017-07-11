# sharingan

use html5canvas

copy the screen and draw something

[demo](https://zhangking.github.io/sharingan/)

### params

| name | desc | type | default |
| --- | --- | --- | --- |
| type | type of drawing , one of `pen` `line`  `rect`  `circle` |  `string`  | `pen`  |
| color | color of drawing |  `string`  | `red`  |
| linewidth | width of line |  `number`  | `2`  |
| style | style of drawing |  `string`  | `stroke`  |
| scale | scale  |  `number`  | 1  |
| element | the element to copy  |  `element`  |  -  |
| target | the target canvas  |  `element`  | -  |


### usage

```html
<div id="container"></div>

<canvas id="target"> </canvas>

```


```javascript
import Sharingan from "sharingan";

var s;
function takeScreenshot() {
    s = new Sharingan({
      scale: 0.6,
      element: document.getElementById('container'),
      target: document.getElementById('target')
    });
    s.catch(function(target){});
}

```

###  License

MIT

