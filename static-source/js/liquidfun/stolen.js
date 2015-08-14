// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BG","BG",
    "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BG","BK","RD","RD","RD",
    "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","RD","RD","RD",
    "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","RD",
    "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","RD","BK",
    "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","RD","BK","BK",
    "BK","BK","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","RD","BK","BK","BK",
    "BK","RD","RD","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","BK","BK","BR",
    "BG","BG","RD","RD","RD","RD","RD","RD","BL","BL","BL","BL","BL","BK","BK","BR",
    "BG","BG","BG","BK","BL","BL","RD","BL","BL","YL","BL","BL","YL","BL","BR","BR",
    "BK","BG","BK","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
];

function getRgbColor(colorType)
{
    var colorHash = {
        // "BK":0x000000, // black
        "BK":0xDCAA6B, // cardbord color
        "WH":0xFFFFFF, // white
        "BG":0xFFCCCC, // beige
        "BR":0x800000, // brown
        "RD":0xFF0000, // red
        "YL":0xFFFF00, // yellow
        "GN":0x00FF00, // green
        "WT":0x00FFFF, // water
        "BL":0x0000FF, // blue
        "PR":0x800080  // purple
    };
    return colorHash[colorType];
}

var scene, camera, renderer, pc;
var world = null;
var timeStep = 1.0 / 60.0;
var velocityIterations = 8;
var positionIterations = 3;
var g_groundBody = null;
var test;
var METER = 100;
var OFFSET_X = 0;
var OFFSET_Y = 0 ;
var windowWidth = 400;
var windowHeight = 460;
function tick() {
    world.Step(timeStep, velocityIterations, positionIterations);

    var particles = world.particleSystems[0].GetPositionBuffer();
    var colors = [];
    for (var i = 0; i < particles.length / 2; i++)
    {       
        var x = particles[i * 2] * METER + OFFSET_X;
        var y = 465 - particles[(i * 2) + 1] * METER + OFFSET_Y;
        var z = 0;                                       
        var vertex = new THREE.Vector3(x, y, z);
        pc.geometry.vertices[i] = vertex;
    }
    pc.geometry.verticesNeedUpdate = true;

    renderer.render(scene, camera);    
    requestAnimationFrame(tick);
}

function WaveMachine() {
    var bdDef = new b2BodyDef();
    var bobo = world.CreateBody(bdDef);
    var wg = new b2PolygonShape();
    wg.SetAsBoxXYCenterAngle(
        windowWidth / METER / 2,
        0.05,
        new b2Vec2(windowWidth / METER / 2, windowHeight / METER + 0.05),
        0
    );
    bobo.CreateFixtureFromShape(wg, 5);
    var wgl = new b2PolygonShape(); 
    wgl.SetAsBoxXYCenterAngle(
        0.05,
        windowHeight / METER / 2,
        new b2Vec2(-0.05, windowHeight / METER / 2),
        0
    );
    bobo.CreateFixtureFromShape(wgl, 5);
    var wgr = new b2PolygonShape();
    wgr.SetAsBoxXYCenterAngle(
        0.05,
        windowHeight / METER / 2,
        new b2Vec2(windowWidth / METER + 0.05,
        windowHeight / METER / 2),
        0
    );
    bobo.CreateFixtureFromShape(wgr, 5);
    var psd = new b2ParticleSystemDef();
    psd.radius = 0.03;
    psd.dampingStrength = 1;
    psd.flags = b2_springParticle;
    // psd.pressureStrength = 0.1;
    // psd.springStrength = 0.001;
    psd.repulsiveStrength = 0.2;
    psd.elasticStrength = 200;
    var particleSystem = world.CreateParticleSystem(psd);
    var box = new b2PolygonShape();
    box.SetAsBoxXYCenterAngle(
        1.25, 
        1.25, 
        new b2Vec2(windowWidth / 2 / METER, -windowHeight / 4 / METER), 
        0
    );
    var particleGroupDef = new b2ParticleGroupDef();
    particleGroupDef.shape = box;
    var particleGroup = particleSystem.CreateParticleGroup(particleGroupDef);
}

WaveMachine.prototype.Step = function() {
    world.Step(timeStep, velocityIterations, positionIterations);
    this.time += 1 / 60;
}

function testSwitch(testName) {
    world.SetGravity(new b2Vec2(0, 10));
    var bd = new b2BodyDef;
    g_groundBody = world.CreateBody(bd);
    test = new window[testName];
}

function init() {
    var width = 465; 
    var height = 465;
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff));
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(200, 200, 500);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    var container = document.createElement('div');
    var element =$("#mario");
    element.append(container);
    container.appendChild(renderer.domElement);
    testSwitch("WaveMachine");

    var particles = world.particleSystems[0].GetPositionBuffer();
    var geometry = new THREE.Geometry();
    var colors = [];
    for (var i = 0; i < particles.length/2; i++)
    {       
        var x = particles[i * 2] * METER + OFFSET_X;
        var y = particles[(i * 2) + 1] * METER + OFFSET_Y;
        var z = 0;
        var vertex = new THREE.Vector3(x, y, z);
        var x0 = Math.floor( (x-72) / 16 );
        var y0 = Math.floor( (242+y) / 16 );
        var pos = x0 + y0 * 16;
        if ( x0 >= 0 && x0 < 16 
          && y0 >= 0 && y0 < 16
          && pos < dataSet.length ) {
            color = new THREE.Color(getRgbColor(dataSet[pos]));
        } else {
            color = new THREE.Color(0xffffff);
        }
        geometry.vertices.push(vertex);
        colors.push(color);
    }
    geometry.colors = colors;
    var material = new THREE.PointCloudMaterial({
        size : 10,
        transparent : false,
        opacity : 1,
        vertexColors : true
    });
    scene.remove(pc);
    pc = new THREE.PointCloud(geometry, material);
    scene.add(pc); 

    tick();
}

function onload() {
    var gravity = new b2Vec2(0, 10);
    world = new b2World(gravity);
    init();
}

onload();
