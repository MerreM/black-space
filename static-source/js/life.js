GRID_COLOUR = "grey";
GRID_SIZE = 8;
LINE_WIDTH = 1;
TOO_FEW = 3;
OVER_POPULATION = 4;

MAX_X = 0;
MAX_Y = 0;

ANIMATE = true;

var mouse={};

$(document).ready(function(){
    function onClick(e,display,grid) {
        var rect = display[0].getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        var temp_x = mouse.x;
        index_x = Math.floor(mouse.x/GRID_SIZE);
        index_y = Math.floor(mouse.y/GRID_SIZE);
        grid[index_x][index_y] = !grid[index_x][index_y]
        return grid
    }
    function coordInBounds(x,y){
        if(x>=0 && x<MAX_X){
            if(y>=0 && y<MAX_Y){
                return true;
            }
        }
        return false
    }
    function getNeighbours(grid,x,y,alive){
        var live_neighbours = 0;
        for(var diff_x=-1; diff_x<2; diff_x++){
            for(var diff_y=-1; diff_y<2; diff_y++){
                var x_index = x+diff_x;
                var y_index = y+diff_y;
                if(coordInBounds(x_index,y_index) && !(diff_x==0 && diff_y==0 )){
                    if(grid[x_index][y_index]==true){
                        live_neighbours++;
                    }
                }   
            }
        }
        if(alive){
            if((live_neighbours==2 || live_neighbours==3)){
                return true;
            }
            return false;
        }  else {
            if (live_neighbours==3){
                return true;
            }
            return false;
        }
    }
    function generateNextGeneration(grid){
        var newGrid = generateGrid(grid.length,grid[0].length);
        for (var x=0; x<(grid.length); x++){
            newGrid[x] = new Array(grid[0].length);
            for(var y=0; y<grid[x].length; y++){
                newGrid[x][y] = getNeighbours(grid,x,y,grid[x][y]);
            }
        }
        return newGrid;
    }
    function generateFirstGrid(width,height){
        MAX_X=width;
        MAX_Y=height;
        var grid = new Array(width);
        for (var x=0; x<(width); x++){
            grid[x] = new Array(height);
            for(var y=0; y<grid[x].length; y++){
                grid[x][y] = (Math.random()*10)>6;
            }
        }
        return grid;
    }
    function generateGrid(width,height){
        var grid = new Array(width);
        for (var x=0; x<(width); x++){
            grid[x] = new Array(height);
            for(var y=0; y<grid[x].length; y++){
                grid[x][y] = false;
            }
        }
        return grid;
    }
    function drawGrid(context,grid){
        for(var x=0; x<(grid.length); x++){
            for(var y =0; y<(grid[x].length); y++){
                context.beginPath();
                context.rect(x*GRID_SIZE,y*GRID_SIZE,(x+1)*GRID_SIZE,(y+1)*GRID_SIZE);
                context.fillStyle = grid[x][y] ? "black" : "white";
                context.fill();
                context.strokeStyle = GRID_COLOUR;
                context.lineWidth = LINE_WIDTH;
                context.stroke();
            }
        }
    }
    var canvas = $("#game_of_life");
    var context = canvas[0].getContext('2d');
    var grid = generateFirstGrid(canvas.width()/GRID_SIZE,canvas.height()/GRID_SIZE);
    drawGrid(context,grid);
    window.requestAnimFrame = function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 3000);
        };
    }();
    canvas.on('click', function(evt){
        grid = onClick(evt,canvas,grid);
        drawGrid(context,grid);
    });
    var then = Date.now();
    var fps = 30;
    var interval = 1000/fps;
    function animate(){
        grid = generateNextGeneration(grid);
        drawGrid(context,grid);
        requestAnimFrame(function() {
            if(ANIMATE){
                animate();
            }
        });
    }
    animate();
    $(document).keydown(function(evt) {
        if (evt.keyCode == 80) {
          ANIMATE = !ANIMATE;
          if(ANIMATE){
            animate();
          }
        }
    });
});

