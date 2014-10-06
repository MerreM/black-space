
var DAMPING = 1;


$(document).ready(function(){

  function getNoise(x){
    return (x-(Math.random()*Math.abs(x*2)))
  }


  function fitToContainer(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  var display = document.getElementById('playful');
  var ctx = display.getContext('2d');
  var HYPER_DRIVE=false;
  var particles = [];
  var stars = [];
  var frequency = 0.2;
  var count = 0;
  var mode = false;
  var animate = true;
  var ALPHA = 1.0;
  var ParticleCount = 500;
  var width = $(display).parent().width()
  var height = $(display).parent().height()
  var mouse = { x: width * 0.5, y: height * 0.5 };
  var P_TAIL_SIZE = 5
  var S_TAIL_SIZE = 5
  var NOISE = 100;
  //
  fitToContainer(display);

  function onMousemove(e,display) {
    var rect = display.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  $("#playful").on("click",function(){
    init();
    mode = !mode;
  });

  display.addEventListener('mousemove', function(evt){
    onMousemove(evt,display);
  });

  function byte2Hex(n){
      var nybHexString = "0123456789ABCDEF";
      return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }

  function RGB2Color(r,g,b){
      return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  }

function changeColour(i){
    red   = Math.sin(frequency*i + 0) * 127 + 128;
    green = Math.sin(frequency*i + 2*Math.PI/3) * 127 + 128;
    blue  = Math.sin(frequency*i + 4*Math.PI/3) * 127 + 128;
    return RGB2Color(red,green,blue);
}


  function Particle(x, y, size) {
    if(size == null){
      this.star = false
      this.size=Math.random()*5;
    } else {
      this.star = true
      this.size = size;

    }
    this.history = []
    this.phase = 0+Math.random()*100;
    this.x = this.oldX = x;
    this.y = this.oldY = y;
  }

  Particle.prototype.integrate = function() {
    var velocityX = (this.x - this.oldX) * DAMPING;
    var velocityY = (this.y - this.oldY) * DAMPING;
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += velocityX;
    this.y += velocityY;
  };

  Particle.prototype.repel = function(x, y) {
    var dx = this.x - x;
    var dy = this.y - y;
    // dx+=Math.random();
    // dy+=Math.random();
    var distance = Math.sqrt(dx * dx + dy * dy);
    distance+=Math.random();
    this.x += dx / distance;
    this.y += dy / distance;
  };

  Particle.prototype.attract = function(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;
    // dx+=Math.random();
    // dy+=Math.random();
    var distance = Math.sqrt(dx * dx + dy * dy);
    distance+=Math.random();
    this.x += dx / distance;
    this.y += dy / distance;
  };

  Particle.prototype.draw = function(i) {
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    if(i!=null && !this.star){
      ctx.strokeStyle = changeColour(i);
    } else if (this.star){
      ctx.strokeStyle="#fff"
    } else {
      ctx.strokeStyle = changeColour(this.phase);
    }
    ctx.lineWidth = this.size;
    ctx.beginPath();
    ctx.moveTo(this.oldX, this.oldY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    
    this.backup()
    this.draw_backup();

    this.phase+=frequency
    if(this.phase>10000){
      this.phase=0;
    }
  };

  Particle.prototype.backup = function() {
    if(!this.star){
      var history = {colour:ctx.strokeStyle, previous_x:this.oldX, previous_y:this.oldY, current_x:this.x,current_y:this.y};
      this.history.splice(0,0,history);

      // {colour:ctx.strokeStyle, previous_x:this.oldX, previous_y:this.oldY, current_x:this.x,current_y:this.y}
      if (this.history.length>P_TAIL_SIZE){
        this.history.splice(P_TAIL_SIZE,this.history.length-P_TAIL_SIZE);
        // console.log(this.history);
        // BLURGH();
     }
    }
}

  Particle.prototype.draw_backup = function() {
    for (var i = 0; i < this.history.length; i++) {
      var history =this.history[i]
      if(i!=0){
        var history2 =this.history[i-1]
      }
      ctx.strokeStyle = history.colour;
      ctx.lineWidth = this.size-i;
      ctx.beginPath();
      ctx.moveTo(history.previous_x, history.previous_y);
      if(history2!=null){
        ctx.lineTo(history2.previous_x, history2.previous_y);
      }
      ctx.stroke();
    }
  }

  function init(){
    for (var i = 0; i < ParticleCount; i++) {
      stars[i] = new Particle(Math.random() * width, Math.random() * height,Math.random()*2);
    }
    for (var i = 0; i < ParticleCount; i++) {
      particles[i] = new Particle(Math.random() * width, Math.random() * height);
    }
  }

  init();

  function frame() {
    requestAnimationFrame(frame);
    if(animate){
      ctx.fillStyle = "rgba(35, 35, 35, "+ALPHA.toFixed(2)+")"
      ctx.fillRect(0,0,width,height);

      // ctx.clearRect(0, 0, width, height);
      for (var i = 0; i < stars.length; i++) {
        // stars[i].attract(stars[i].x+(5-(Math.random()*10)),stars[i].y+(5-(Math.random()*10)));
        stars[i].repel(width/2,height/2);
        // stars[i].repel(stars[i].x+(1-(Math.random()*2)),stars[i].y+(1-(Math.random()*2)));
        stars[i].integrate();
        stars[i].draw();
        if(stars[i].x>width || stars[i].x<0 || stars[i].y > height || stars[i].height<0 ){
          stars[i]= new Particle(Math.random() * width, Math.random() * height,Math.random()*2);
        }
      }
      if(!HYPER_DRIVE){
        for (var i = 0; i < particles.length; i++) {
          particles[i].attract(mouse.x, mouse.y);
          particles[i].attract(particles[i].x+getNoise(NOISE),particles[i].y+getNoise(NOISE));
          particles[i].integrate();
          if(mode===true){
            particles[i].draw(count);
          } else {
            particles[i].draw();
          }
          if (count>100000){
            count = 0;
          }
        }
        count++;
      }
    } 
  }


  requestAnimationFrame(frame);

  $("#frequency-control").text("Frequency "+frequency.toFixed(2));
  $("#alpha-control").text("Alpha "+ALPHA.toFixed(2));
  $(document).keydown(function(evt) {
    // console.log(evt.keyCode)
    if (evt.keyCode == 80) {
      animate = !animate;
    } else if (evt.keyCode==83){
      HYPER_DRIVE=!HYPER_DRIVE;
    } else if (evt.keyCode==37){
      frequency-=0.1;
      $("#frequency-control").text("Frequency "+frequency.toFixed(2));
    } else if (evt.keyCode==39){
      frequency+=0.1;
      $("#frequency-control").text("Frequency "+frequency.toFixed(2));
    } else if (evt.keyCode==221){
      ALPHA+=0.1;
      $("#alpha-control").text("Alpha "+ALPHA.toFixed(2));
    } else if (evt.keyCode==219){
      ALPHA-=0.1;
      $("#alpha-control").text("Alpha "+ALPHA.toFixed(2));
    }
  })
});