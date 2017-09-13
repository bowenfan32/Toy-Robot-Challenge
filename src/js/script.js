
var robot = null;

var error = document.getElementById("error");
var canvas = document.getElementById("canvas");
var img = document.getElementById("img-robot");
var context = canvas.getContext("2d");


function promptError(err) {
    error.innerHTML = err;
}


function init() {
    for (var x = 1; x < 601; x += 100) {
        context.moveTo(x, 1);
        context.lineTo(x, 501);
    }

    for (var y = 1; y < 601; y += 100) {
        context.moveTo(1, y);
        context.lineTo(501, y);
    }

    context.strokeStyle = "#000";
    context.stroke();

    robot = new Robot(0, 0, "NORTH");
    drawRobot(robot);
}

function Robot(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
}

function drawRobot(newRobot) {

    context.drawImage(img, 10, 400 + 10, 80, 80);

}

init();