
var DAMPING = 1;

function fitToContainer(canvas){
  canvas.style.width='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function Particle(x, y) {
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

function byte2Hex(n){
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b){
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function changeColour(i){
    frequency = 0.1;
    red   = Math.sin(frequency*i + 0) * 127 + 128;
    green = Math.sin(frequency*i + 2*Math.PI/3) * 127 + 128;
    blue  = Math.sin(frequency*i + 4*Math.PI/3) * 127 + 128;
    return RGB2Color(red,green,blue);
}

Particle.prototype.draw = function() {
  ctx.strokeStyle = changeColour(count);
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(this.oldX, this.oldY);
  ctx.lineTo(this.x, this.y);
  ctx.stroke();
};

var display = document.getElementById('playful');
var ctx = display.getContext('2d');
var particles = [];
//
fitToContainer(display);
display.style.width='100%';
display.style.height='100%';
display.width  = display.offsetWidth;
display.height = display.offsetHeight;


var width = display.width = window.innerWidth;
var height = display.height = window.innerHeight;
var mouse = { x: width * 0.5, y: height * 0.5 };

for (var i = 0; i < 200; i++) {
  particles[i] = new Particle(Math.random() * width, Math.random() * height);
}

display.addEventListener('mousemove', onMousemove);

function onMousemove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

requestAnimationFrame(frame);

var count = 0;

function frame() {
  requestAnimationFrame(frame);
  ctx.clearRect(0, 0, width, height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].attract(mouse.x, mouse.y);
    particles[i].integrate();
    particles[i].draw();
    count++;
    if (count>100000){
      count = 0;
    }
  }
}
