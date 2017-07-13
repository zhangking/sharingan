export default class Draw{
    constructor(obj,setting){
        this.obj=obj;
        this.type=setting.type||"stroke";
        this.color=setting.color||"#000";
        this.width=setting.width||"1";
        this.scale = setting.scale || 1;
    }

    init(){
        this.obj.strokeStyle=this.color;
        this.obj.fillStyle=this.color;
        this.obj.lineWidth=this.width;
    }
    rect(x,y,x1,y1){
        this.init();
        this.obj.beginPath();
        this.obj.rect(x/ this.scale,y/ this.scale,(x1-x)/ this.scale,(y1-y)/ this.scale);

        if(this.type=="stroke"){
            this.obj.stroke();
        }else if(this.type=="fill"){
            this.obj.fill();
        }
    }
    line(x,y,x1,y1){
        this.init();
        this.obj.beginPath();
        this.obj.moveTo(x/ this.scale,y/ this.scale);
        this.obj.lineTo(x1/ this.scale,y1/ this.scale);
        this.obj.stroke();
    }
    circle(x,y,x1,y1){
        this.init();
        var r=Math.sqrt(Math.pow((x-x1)/ this.scale,2)+Math.pow((y-y1)/ this.scale,2));
        this.obj.beginPath();
        this.obj.arc(x/ this.scale,y/ this.scale,r,0,2*Math.PI);
        if(this.type=="stroke"){
            this.obj.stroke();
        }else if(this.type=="fill"){
            this.obj.fill();
        }
    }
    pen(x,y,x1,y1){
        this.init();
        this.obj.save();
        this.obj.lineCap="round";
        this.obj.lineTo(x1 / this.scale,y1 / this.scale);
        this.obj.stroke();
        this.obj.restore();
    }
}