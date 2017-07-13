import html2canvas from "html2canvas";
import Draw from './draw.js';

export default class sharingan{
    constructor(config){
        this.config = Object.assign({
            useCORS: true,
            allowTaint: false,
            type: 'pen',
            color:"red",
            linewidth:"4",
            style: "stroke",
            scale:1
        },config);
    }

    catch(cb){
        const { target,scale,element,useCORS,allowTaint,type,color,linewidth,style} = this.config;
        const self = this;

        const scaleby = 2;
        const w = window.innerWidth;  
        const h = window.innerHeight;
        const _canvas = document.createElement("canvas");  
            _canvas.width = w * scaleby;  
            _canvas.height = h * scaleby;  
            _canvas.style.width = w * scaleby + "px";  
            _canvas.style.height = h * scaleby + "px";  
        const _context = _canvas.getContext("2d");
            _context.scale(scaleby,scaleby);  
        
        const _scale = scale / scaleby;
        
        element && html2canvas(element, {
            canvas: _canvas, 
            onrendered(canvas) {
                let x,y,w,h;
                let lx,ly,lw,lh;
                let arr=[];
                let obj = target.getContext("2d");
                let width = canvas.width;
                let height = canvas.height;

                target.style.cursor = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAALGPC/xhBQAAARpJREFUOBGdkr1KA0EUhTcxEkSQQIpAihQWPoedD2BnIVsZQiBVEkiR7SwtBDsJqXwBLQwEgoWNjY2FjYUQ38Ei5Oc7sBeGLTKze+Djzsyecxh2N4ryq0zkHpYQQ2H1SW5TNsxukaZzQsewACvTvIBg3eFUaABHMEv3OruBIN3icm8wZl+FZ3iBQ/AqweGW2FrlKlChV0McFsxOvaegm/T2lLzzTC/dqzaO7A1s/8GzE28Dhhj0f1jQnZ+c18CrKxxrcMO2/uK87m3AcAkrsKA7vzlvQJAmuNywrX84bwY1YBrBATyCFWj+QguCJKNCU1DZQ7r/Y55CsK5x2i2eWFcggTPIJd3Eiv5Zd3KlU3OJOQd9lVd4A5Xl1g4YG2GGhwRfegAAAABJRU5ErkJggg==) 0 17,default";
                target.width = width;
                target.height = height;
                target.style.width = width;
                target.style.height = height;

                obj.drawImage(canvas,0,0,canvas.width,canvas.height,0,0,width,height);
                let source = obj.getImageData(0,0,canvas.width,canvas.height);
                arr.push(source);

                target.onclick=(e) => {e.stopPropagation();}
                target.onmousedown=(e) => {
                    e.stopPropagation();
                    x=e.offsetX;
                    y=e.offsetY;
                    if(type=="pen"){
                        obj.beginPath();
                        obj.moveTo(x / _scale ,y / _scale);
                    }
                    
                    var draw = new Draw(obj,{scale:_scale,type:style,color:color,width:linewidth});

                    target.onmousemove = (e) => {
                        w=e.offsetX;
                        h=e.offsetY;
                        obj.clearRect(0,0,width,height);
                        if(arr.length!=0){
                            obj.putImageData(arr[arr.length-1],0,0,0,0,width,height);
                        }
                        draw[type](x,y,w,h);
                    }
                    document.onmouseup=(e) => {
                        target.onmousemove=null;
                        document.onmouseup=null;
                        arr.push(obj.getImageData(0,0,width,height));
                    }
                }

                cb && cb(target);
            },
            useCORS: useCORS,
            allowTaint: allowTaint,
            width: window.innerWidth,
            height: window.innerHeight
        });
    }
}