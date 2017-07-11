import html2canvas from "html2canvas";
import Draw from './draw.js';

export default class sharingan{
    constructor(config){
        this.config = Object.assign({
            useCORS: true,
            allowTaint: false,
            type: 'pen',
            color:"red",
            linewidth:"2",
            style: "stroke",
            scale:1
        },config);
    }

    catch(cb){
        const { target,scale,element,useCORS,allowTaint,type,color,linewidth,style,container} = this.config;
        const self = this;
        element && html2canvas(element, {
            onrendered(canvas) {
                let x,y,w,h;
                let lx,ly,lw,lh;
                let arr=[];
                let obj = target.getContext("2d");
                let width = canvas.width * scale;
                let height = canvas.height * scale;

                target.style.cursor = 'pointer';
                target.width = width;
                target.height = height;

                console.log(canvas.height,height)

                obj.drawImage(canvas,0,0,canvas.width,canvas.height,0,0,width,height);
                let source = obj.getImageData(0,0,width,height);
                arr.push(source);

                target.onclick=(e) => {e.stopPropagation();}
                target.onmousedown=(e) => {
                    e.stopPropagation();
                    x=e.offsetX;
                    y=e.offsetY;
                    if(type=="pen"){
                        obj.beginPath();
                        obj.moveTo(x,y);
                    }
                    
                    var draw = new Draw(obj,{type:style,color:color,width:linewidth});

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