var canvas = $("#main_canvas")[0];
var context = canvas.getContext('2d');
var DEBUG = true;

// OKay, here are a few hacks to make Javascript more likeable. Inheritance, and getClass etc.

// Object.prototype.getName = function() { 
//    var funcNameRegex = /function (.{1,})\(/;
//    var results = (funcNameRegex).exec((this).constructor.toString());
//    return (results && results.length > 1) ? results[1] : "";
// };

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

//Begin code proper.

function coord(x,y){
    this.x=x;
    this.y=y;
    this.move_degrees = function(angle,distance){
        var rad = angle * Math.PI / 180;
        return this.move(rad,distance);
    }
    this.move = function(angle,distance){
        var x = this.x + (Math.cos(angle) * distance);
        var y = this.y + (Math.sin(angle) * distance);
        return new coord(x,y);
    }
    this.rotate_degrees = function(angle,pivot){
        var rad = angle * Math.PI / 180;
        return this.rotate(rad,pivot);
    }
    this.rotate = function(angle,pivot){
        // Calulate new positions relative to pivot.
        // Add 
        var relative = new coord((this.x-pivot.x),(this.y-pivot.y));
        var root = new coord(0,0); 
        var relative_distance = root.distance(relative);
        var pivot_angle = root.angle(relative);
        var res = pivot.move(pivot_angle+angle,relative_distance);
        return res;
    }
    this.distance = function(point){
        var x = this.x - point.x;
        var y = this.y - point.y;
        return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    }
    this.angle = function(point){
        var angle =  Math.PI+Math.atan2(this.y-point.y,this.x-point.x);
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

function vector(angle,distance){
    this.name = "vector";
    this.angle = angle;
    this.distance=distance;
    this.to_coord = function(){
        return new coord(0,0).move(angle,distance);
    }
}

function particle(inCoord, inVel){
    this.name = "particle";
    this.life = 0;
    this.init = function (inCoord, inVel){
        this.location = inCoord;
        this.vector = inVel;
    }
    this.update = function(root, vector){
        // console.log("move")
        var current = root.distance(this.location)
        var res = this.location.move(this.vector.angle,this.vector.distance);
        // console.log(current)
        this.location = res;
        this.life+=1;
        if(this.life>100){
            return false
        }
        return true;
        // console.log(this.vector);
    }
    this.draw = function(){

        context.beginPath();
        context.arc(this.location.x, this.location.y, 2, 0, 2 * Math.PI, false);
        context.fillStyle = '#f00';
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = '#f00';
        context.stroke();
        // context.fillRect(this.location.x,this.location.y,10,10);
    }
    this.rotate = function(angle,center){
        this.location = this.location.rotate(angle,center);
    }
    this.init(inCoord,inVel);
}

function genericShape(){
    this.init = function(center){
        this.center = center;
        this.size = 1;
        this.children = [];
    }
    this.draw = function(){
        if (DEBUG){
                for (var i in this.points){
                    context.beginPath();
                    context.moveTo(this.center.x,this.center.y);
                    context.lineTo(this.points[i].x, this.points[i].y);
                    context.closePath();
                    context.lineWidth = 2;
                    context.strokeStyle = '#000';
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
        for (var i in this.points){
            this.children[i].draw();
        }
    }
    this.update = function(x,y,z){

    }
    this.rotate = function(angle_degrees){
        for (var i in this.points){
            this.points[i] = this.points[i].rotate_degrees(angle_degrees,this.center);
        }
        for (var i in this.children){
            if(this.children[i].name == 'particle' ){
                var rad = angle_degrees * Math.PI / 180;
                this.children[i].rotate(rad,this.center);
            } else {
                this.children[i].rotate(angle_degrees);
            }
        }
    }
}

function particleEffect(center,angle){
    this.name = "effect"
    this.init = function(center,angle){
        var rad = angle * Math.PI / 180;
        this.center = center;
        this.size = 75;
        this.root = this.center.move_degrees(angle,this.size);
        this.points = [
            this.center.move_degrees(angle,this.size),
        ]
        var accel = this.root.distance(this.center);
        this.children = [
            new particle(this.root,new vector(rad+Math.PI,-1)),
        ]
    }
    this.draw = function(){
        if (DEBUG){
            for (var i in this.points){
                context.beginPath();
                context.moveTo(this.center.x,this.center.y);
                context.lineTo(this.points[i].x, this.points[i].y);
                context.closePath();
                context.lineWidth = 2;
                context.strokeStyle = '#fff';
                context.stroke();
            }
        }
        for (var i in this.children){
            this.children[i].draw();
        }
    }
    this.update = function(x,y,z){
        this.root = this.points[0];
        var angle = this.center.angle(this.root);
        for (var i in this.children){
            if(!this.children[i].update(this.root,new vector(angle,0))){
                this.children.splice(i,1);
            } else if(this.children[i].life==50){
                this.children.push(new particle(this.root,new vector(angle+Math.PI,-1)));
            }
        }
    }
    this.init(center,angle);

}
particleEffect.inherits(genericShape);

function newTriangle(center){
    this.name  = "triangle"
    this.init = function(center){
        this.center = center;
        this.size = 150;
        this.points = [
            this.center.move_degrees(270,this.size),
            this.center.move_degrees(30,this.size),
            this.center.move_degrees(150,this.size)
            // this.center.move_degrees(0,this.size),
            // this.center.move_degrees(90,this.size),
            // this.center.move_degrees(180,this.size),
            // this.center.move_degrees(270,this.size)
        ]
        this.children = [
            new particleEffect(center,330),
            new particleEffect(center,210),
            new particleEffect(center,90),
        ]
    }
    this.update = function(x,y,z){
        this.rotate(1);
        for (var i in this.children){
            this.children[i].update(x,y,z);
        }
    }
    this.draw = function(){
        this.uber('draw');
        for (var i in this.points){
            context.beginPath();
            context.moveTo(this.center.x,this.center.y);
            context.lineTo(this.points[i].x, this.points[i].y);
            context.closePath();
            context.lineWidth = 2;
            context.strokeStyle = '#000';
            context.stroke();
        }
    }
    this.init(center);
}
newTriangle.inherits(genericShape);


function SYMBOL(){
    var canvas = $("#main_canvas")[0];
    var context = canvas.getContext('2d');
    var MAX_Y = canvas.height;
    var MAX_X = canvas.width;
    var ALPHA = 0.2;
    var DONE = false;
    // fitToContainer(this.canvas);
    context.fillStyle = "rgba(37, 37, 37, "+ALPHA+")"
    context.fillRect(0,0,MAX_X,MAX_Y);
    center = new coord(200,200)
    var tri =new newTriangle(center);
    var contents = [tri,
        ];

    this.run = function(contents){
        window.requestAnimFrame = (function(callback) {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();

        function update(){
            for(var i=0;i<contents.length;i++){
                contents[i].update(0,0,0);
            }
        }
        function draw(container){
            for(var i=0;i<contents.length;i++){
                contents[i].draw();
            }   
        }

        function animate() {
            
            // update
            update();
            // clear
            context.fillStyle = "rgba(37, 37, 37, "+ALPHA+")"
            context.fillRect(0,0,MAX_X,MAX_Y);

            // draw stuff
            draw();

            // request new frame
            requestAnimFrame(function() {
                animate();
            });
        }
        animate();
    }
    this.run(contents);
}
var run_me = new SYMBOL();

  init_box();
  // Specifying options
  var index = 0;
  var MAX = $(".text-side").length
  $(".text-side").hide();
  function showNext(){
    var prev = $(".text-side")[index];
    index++;
    if(index>=MAX){
      index=0;
    }
    var next = $(".text-side")[index];
    $(prev).animo({ animation:'flipOutY',duration:1,keep:false}, function(e) {
      $(prev).hide();
      $(next).show();
      $(next).animo({ animation:'flipInY', duration:1, keep:false});
    });
  }
  $(".text-side").on("click",showNext);
  $(".text-side").first().show();
