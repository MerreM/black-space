
var DAMPING = 0.999;

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
  // distance+=Math.random();
  this.x += dx / distance;
  this.y += dy / distance;
};

Particle.prototype.draw = function() {
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
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

function frame() {
  requestAnimationFrame(frame);
  ctx.clearRect(0, 0, width, height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].attract(mouse.x, mouse.y);
    particles[i].integrate();
    particles[i].draw();
  }
}
