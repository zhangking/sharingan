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
        const { target,scale,element,useCORS,allowTaint,type,color,linewidth,style} = this.config;
        const self = this;
        element && html2canvas(element, {
            onrendered(canvas) {
                let x,y,w,h;
                let lx,ly,lw,lh;
                let arr=[];
                let obj = target.getContext("2d");
                let width = canvas.width * scale;
                let height = canvas.height * scale;

                target.style.cursor = "url('data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABOklEQVRYR+2W21HDMBBFTyognQQqgHQQOqAFOqEDoAJKSEpIOqAEOoC5M3hGsWXtw5rJj/1ry+fsrnTtDTe+Njfmswr07MAWeAcOwAl4Bn6sEfcSEPwI3BfAM7C3JHoJqOLHSrWmRC8BVS6Ju6jEEgG1/Qt4BVRpSiIrUM5cG02zTklkBGobzivxCbyUY4oK1ODD+7wSV8yIQAvulUh3wAO3JC7A0zgXPB2IwOck3v4TcpKMlkAGXko8AN+tOG4JLIEPzMnMxzJzAj3g1ZlHBBStO+trNnPfBddaawQZCTe8JaC0+gA0iohECN4S+AW0g5XvXokw3BIoo9WSSMEtAd33SKThHgFLYhG8JaDKy7+bWie0fpLt0WM7dwx1CpTfYwn96epUaE8M3Ykyr563vgWLXu5ZvAqsHfgD9TFiIelPhToAAAAASUVORK5CYII=') 5 40, auto";
                target.width = width;
                target.height = height;

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