import html2canvas from "html2canvas";
import Draw from './draw.js';

export default class sharingan{
    constructor(config){
        this.config = Object.assign({
            useCORS: true,
            allowTaint: false,
            type: 'rect',
            color:"red",
            linewidth:"2",
            style: "stroke",
            width:window.outerWidth,
            height:window.outerHeight
        },config);
    }

    getData(){
        return this.canvas.toDataURL();
    }

    catch(cb){
        const { element,useCORS,allowTaint,type,width,height,color,linewidth,style,container} = this.config;
        const self = this;
        element && html2canvas(element, {
            onrendered: function(canvas) {
                let x,y,w,h;
                let lx,ly,lw,lh;
                let cutdata;
                let arr=[];
                let cutflag=false;
                let obj= canvas.getContext("2d");

                arr.push(obj.getImageData(0,0,width,height));
                
                canvas.style.cursor = 'pointer';
                canvas.onmousedown=function(e){
                    x=e.offsetX;
                    y=e.offsetY;
                    if(type=="pen"){
                        obj.beginPath();
                        obj.moveTo(x,y);
                    }
                    if(type=="eraser"){
                        obj.clearRect(x-5,y-5,10,10);
                    }
                    if(cutflag&&type=="cut"){
                        if(arr.length!=0){
                            arr.splice(-1,1);
                        }
                    }
                    var draw = new Draw(obj,{type:style,color:color,width:linewidth});//实例化构造函数
                    canvas.onmousemove=function(e){
                        w=e.offsetX;
                        h=e.offsetY;
                        if(type!="eraser"){
                            obj.clearRect(0,0,width,height);
                            if(arr.length!=0){
                                obj.putImageData(arr[arr.length-1],0,0,0,0,width,height);
                            }
                        }
                        if(cutflag&&type=="cut"){
                            if(iscut){
                                obj.clearRect(lx,ly,lw-lx,lh-ly);
                            }
                            var nx=lx+(w-x);
                            var ny=ly+(h-y);
                            obj.putImageData(cutdata,nx,ny);
                        }else if(type=="poly"){
                            draw[type](x,y,w,h,n);
                        }else{
                            draw[type](x,y,w,h);
                        }

                    }
                    document.onmouseup=function(){
                        canvas.onmousemove=null;
                        document.onmouseup=null;
                        if(type=="cut"){
                            if(!cutflag){
                                cutflag=true;
                                cutdata=obj.getImageData(x+1,y+1,w-x-2,h-y-2);
                                lx=x;ly=y;lw=w;lh=h;
                                container.css({display:"none"});
                            }else{
                                cutflag=false;
                                container.css({display:"block"});
                            }
                        }
                        arr.push(obj.getImageData(0,0,width,height));
                    }
                }

                self.canvas = canvas;

                container && container.appendChild(canvas);

                cb && cb(canvas);

            },
            useCORS: useCORS,
            allowTaint: allowTaint,
            width: width,
            height: height
        });
    }
}