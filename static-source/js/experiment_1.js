var canvas = $('#experiment_1')[0];
var context = canvas.getContext('2d');
fitToContainer(canvas);

MAX_Y = canvas.height;
MAX_X = canvas.width;
GRAVITY = 0.01;
EDGE_THRES = 5;
FRICTION = 0.8;
POLY_COUNT = 100;
ALPHA = 0.3;
FACES = true;

var imageObj = new Image();

imageObj.src = "/img/favicon.png";

function RGB2Color(r,g,b){
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n){
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function changeColour(i){
    frequency = 0.1;
    red   = Math.sin(frequency*i + 0) * 127 + 128;
    green = Math.sin(frequency*i + 2*Math.PI/3) * 127 + 128;
    blue  = Math.sin(frequency*i + 4*Math.PI/3) * 127 + 128;
    return RGB2Color(red,green,blue);
}

function dObject(){
    this.init = function(){
        this.x_pos = (Math.random()*MAX_X);
        this.y_pos = (Math.random()*MAX_Y);
        this.x_speed=(Math.random()*10)-5;
        this.y_speed=(Math.random()*10)-5;
        this.alive = false;
        this.count = Math.random()*100;
        this.colour = 0x000000;
        this.x_edge = 0;
        this.y_edge = 0;
        this.gravity = true;
        this.friction = false;
        this.width = 10;
        this.height = 10;
        this.size = (Math.random()+3.5);
    }
    this.init();
    this.get_height = function(){
        return this.height*this.size;
    }
    this.get_width = function(){
        return this.width*this.size;
    }
    this.draw = function(context){
        this.colour=changeColour(this.count);
        this.count++;
        if(FACES){
            context.fillStyle=this.colour;
            context.fillRect(this.x_pos,this.y_pos,this.get_width(),this.get_height())
        } else {
            context.drawImage(imageObj,this.x_pos,this.y_pos,this.get_width(),this.get_height())
        }
    }
    this.update = function(x_accel, y_accel){
        if(this.friction){
            this.x_speed*=FRICTION;
        }
        if(this.gravity){
            y_accel+=GRAVITY;
        }
        this.x_speed+=x_accel;
        this.y_speed+=y_accel;
        this.x_pos+=this.x_speed;
        this.y_pos+=this.y_speed;
        if(Math.abs(this.x_speed) < 0.1){
            this.x_speed = 0;
        }
        if (this.x_pos+this.get_width()+this.x_speed >= MAX_X || this.x_pos+this.x_speed <= 0){
            this.x_speed=-this.x_speed;
            this.x_edge+=1;
            if(this.x_edge>EDGE_THRES){
                this.x_speed=0;
            }
        } else {
            this.x_edge=0;
        }
        if (this.y_pos+this.get_height()+this.y_speed >= MAX_Y || this.y_pos+this.y_speed <= 0){
            this.y_speed=-this.y_speed;
            this.y_edge+=1;
            if(this.y_edge>EDGE_THRES){
                this.y_speed=0;
                this.gravity = false;
                this.friction = true;
            }
        } else {
            this.friction = false;
            this.gravity = true;
            this.y_edge = 0;
        }
        if (this.x_speed == 0 && this.y_speed == 0){
            this.kill_object();
        }
    }
    this.kill_object = function(){
        this.init();
    }
}
function prepareObjects(){
    var cloud = new Array();
    for(var i=0;i<POLY_COUNT;i++){
        cloud.push(new dObject());
    }
    return cloud;
}
// explicitObject

// explicitWord

$(document).ready(function(){
    var canvas = $('#experiment_1')[0];
    var context = canvas.getContext('2d');
    fitToContainer(canvas);
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    cloud = prepareObjects();
    function update(container){
        for(var i=0;i<container.length;i++){
            container[i].update(0,0);
        }
    }
    function draw(container,context){
        for(var i=0;i<container.length;i++){
            container[i].draw(context);
        }   
    }

    function animate() {
        
        // update
        update(cloud);

        // clear
        context.fillStyle = "rgba(0, 0, 0, "+ALPHA+")"
        context.fillRect(0,0,MAX_X,MAX_Y);

        // draw stuff
        draw(cloud,context)

        // request new frame
        requestAnimFrame(function() {
            animate();
        });
    }
    animate();

});