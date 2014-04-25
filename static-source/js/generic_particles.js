function create_experiment(options){
    this.canvas = $(options.canvas)[0];
    if(this.canvas==undefined){
        this.run=function(){

        }
        return;
    }
    var context = this.canvas.getContext('2d');
    fitToContainer(this.canvas);

    var MAX_Y = this.canvas.height;
    var MAX_X = this.canvas.width;
    var MAX_Z = 100;
    var GRAVITY = 0.01;
    var EDGE_THRES = 5;
    var FRICTION = 0.8;
    var POLY_COUNT = 5;
    var ALPHA = 0.5;
    var ICON = true;

    var imageObj = new Image();

    imageObj.src = "/static/favicon.ico";

    function RGB2Color(r,g,b){
        return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
    }

    function byte2Hex(n){
        var nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
    }

    function changeColour(i){
        if (this.rainbow){
            frequency = 0.1;
            red   = Math.sin(frequency*i + 0) * 127 + 128;
            green = Math.sin(frequency*i + 2*Math.PI/3) * 127 + 128;
            blue  = Math.sin(frequency*i + 4*Math.PI/3) * 127 + 128;
            return RGB2Color(red,green,blue);
        } else {
            // Black
            return RGB2Color(0,0,0);
        }
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
            this.rainbow = true;
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
        this.draw = function(){
            this.colour=changeColour(this.count);
            this.count++;
            if(ICON){
                context.drawImage(imageObj,this.x_pos,this.y_pos,this.get_width(),this.get_height())
            } else if (RECT) {
                context.fillStyle=this.colour;
                context.fillRect(this.x_pos,this.y_pos,this.get_width(),this.get_height())
            } else {
                context.beginPath();
                context.arc(this.x_pos, this.y_pos, this.size, 0, 2 * Math.PI, false);
                context.fillStyle=this.colour;
                context.fill();
                context.lineWidth = 0.1;
                context.strokeStyle = '#003300';
                context.stroke();
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

    this.run = function(){
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
        function draw(container){
            for(var i=0;i<container.length;i++){
                container[i].draw();
            }   
        }

        function animate() {
            
            // update
            update(cloud);
            // clear
            context.fillStyle = "rgba(37, 37, 37, "+ALPHA+")"
            context.fillRect(0,0,MAX_X,MAX_Y);

            // draw stuff
            draw(cloud);

            // request new frame
            requestAnimFrame(function() {
                animate();
            });
        }
        animate();
    }
    this.run();
}