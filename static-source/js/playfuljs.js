
var DAMPING = 1;


$(document).ready(function(){


  function fitToContainer(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  var display = document.getElementById('playful');
  var ctx = display.getContext('2d');
  var particles = [];
  var stars = [];
  var frequency = 0.2;
  var count = 0;
  var mode = false;
  var animate = true;
  var ALPHA = 0.2;
  var ParticleCount = 1000;
  var width = $(display).parent().width()
  var height = $(display).parent().height()
  var mouse = { x: width * 0.5, y: height * 0.5 };
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
      this.size=Math.random()*5;
    } else {
      this.size = size;

    }
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
    if(i!=null && isNumber(i)){
      ctx.strokeStyle = changeColour(i);
    } else if (i == "star"){
      ctx.strokeStyle="#fff"
    } else {
      ctx.strokeStyle = changeColour(this.phase);
    }
    ctx.lineWidth = this.size;
    ctx.beginPath();
    ctx.moveTo(this.oldX, this.oldY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    this.phase+=frequency
    if(this.phase>10000){
      this.phase=0;
    }
  };

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
        stars[i].attract(stars[i].x+(5-(Math.random()*10)),stars[i].y+(5-(Math.random()*10)));
        stars[i].integrate();
        stars[i].draw("star");
        if(stars[i].x>width || stars[i].x<0 || stars[i].y > height || stars[i].height<0 ){
          stars[i]= new Particle(Math.random() * width, Math.random() * height,Math.random()*2);
        }
      }
      for (var i = 0; i < particles.length; i++) {
        particles[i].attract(mouse.x, mouse.y);
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


  requestAnimationFrame(frame);

  $("#frequency-control").text("Frequency "+frequency.toFixed(2));
  $("#alpha-control").text("Alpha "+ALPHA.toFixed(2));
  $(document).keydown(function(evt) {
    if (evt.keyCode == 80) {
      animate = !animate;
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