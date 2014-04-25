var canvas = $("#main_canvas")[0];
var context = canvas.getContext('2d');
var DEBUG = true;

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Function.method('inherits', function (parent) {
    this.prototype = new parent();
    var d = {}, 
        p = this.prototype;
    this.prototype.constructor = parent; 
    this.method('uber', function uber(name) {
        if (!(name in d)) {
            d[name] = 0;
        }        
        var f, r, t = d[name], v = parent.prototype;
        if (t) {
            while (t) {
                v = v.constructor.prototype;
                t -= 1;
            }
            f = v[name];
        } else {
            f = p[name];
            if (f == this[name]) {
                f = v[name];
            }
        }
        d[name] += 1;
        r = f.apply(this, Array.prototype.slice.apply(arguments, [1]));
        d[name] -= 1;
        return r;
    });
    return this;
});

function coord(x,y){
    this.x=x;
    this.y=y;
    this.move_degrees = function(angle,distance){
        var rad = angle * Math.PI / 180
        return this.move(rad,distance);
    }
    this.move = function(angle,distance){
        var x = this.x + (Math.cos(angle) * distance) ;
        var y = this.y + (Math.sin(angle) * distance) ;
        return new coord(x,y);
    }
    this.rotate_degrees = function(angle,pivot){
        var rad = angle * Math.PI / 180
        return this.rotate(rad,pivot);
    }
    this.rotate = function(angle,pivot){
        // Calulate new positions relative to pivot.
        // Add 
        console.log("pivot",pivot);
        console.log("this",this);
        var relative = new coord((this.x-pivot.x),(this.y-pivot.y));
        var root = new coord(0,0); 
        console.log("relative",relative);
        var relative_distance = root.distance(relative);
        var pivot_angle = root.angle(relative);
        console.log("pivot_angle",pivot_angle);
        console.log("pivot_angle",root.angle_degrees(relative));
        var res = root.move(pivot_angle,relative_distance);
        // var res = this.move(pivot_angle+angle,relative_distance);
        console.log("Res:",res,"\n");
        return res;
    }
    this.distance = function(point){
        var x = this.x - point.x;
        var y = this.y - point.y;
        return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    }
    this.angle = function(point){
        console.log("this",this)
        console.log("point",point)
        var angle =  Math.PI+Math.atan2(this.y-point.y,this.y-point.y);
        return angle;
    }
    this.angle_degrees = function(point){
        return (this.angle(point) / Math.PI)* 180;
    }
    this.add = function(point){
        var x = this.x + point.x;
        var y = this.y + point.y;
        return new coord(x,y);
    }


}


function genericShape(){
    this.init = function(center){
        this.center = center;
        this.size = 1;
    }
    this.draw = function(){
        if (DEBUG){
                for (var i in this.points){
                    context.beginPath();
                    context.moveTo(this.center.x,this.center.y);
                    context.lineTo(this.points[i].x, this.points[i].y);
                    context.closePath();
                    context.lineWidth = 2;
                    context.strokeStyle = '#00'+i;
                    context.stroke();
                }
        }
        context.beginPath();
        context.moveTo(this.points[0].x,this.points[0].y);
        for (var i in this.points){
            context.lineTo(this.points[i].x, this.points[i].y);
        }
        context.closePath();
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.stroke();
    }
    this.update = function(x,y,z){

    } 
}


function newTriangle(){
    this.init = function(center){
        this.center = center;
        this.size = 150;
        this.points = [
            this.center.move_degrees(270,this.size),
            this.center.move_degrees(30,this.size),
            this.center.move_degrees(150,this.size)
        ]
    }
    this.update = function(x,y,z){
    }
    this.rotate = function(){
        for (var i in this.points){
            this.points[i] = this.points[i].rotate_degrees(10,this.center)
        }
    }
    this.init(new coord(200,200));
}
newTriangle.inherits(genericShape);

function SYMBOL(){
    var canvas = $("#main_canvas")[0];
    var context = canvas.getContext('2d');
    var MAX_Y = canvas.height;
    var MAX_X = canvas.width;
    var ALPHA = 1;
    var DONE = false;
    // fitToContainer(this.canvas);
    context.fillStyle = "rgba(37, 37, 37, "+ALPHA+")"
    context.fillRect(0,0,MAX_X,MAX_Y);
    var tri =new newTriangle();

    this.draw_triangle = function(){
        tri.draw();
    }

    this.update_triangle = function(){
        if(!DONE){
            tri.rotate();
            DONE = true;
        }
    }

    this.run = function(draw_background,update_background){
        window.requestAnimFrame = (function(callback) {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();

        // cloud = prepareObjects();
        cloud = [];
        function update(container){
            update_background();
            for(var i=0;i<container.length;i++){
                container[i].update(0,0);
            }
        }
        function draw(container){
            draw_background()
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
    this.run(this.draw_triangle,this.update_triangle);
}
var run_me = new SYMBOL();