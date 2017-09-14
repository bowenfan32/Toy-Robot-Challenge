
var robot = null;

var error = document.getElementById("error");
var canvas = document.getElementById("canvas");
var img = document.getElementById("img-robot");
var context = canvas.getContext("2d");

var dir = ["NORTH", "EAST", "SOUTH", "WEST"];


function promptError(err) {
    error.innerHTML = err;
}


function move() {
    switch(robot.dir) {
        case "NORTH":
            clearRobot();
            robot = new Robot( robot.x , robot.y + 100, robot.dir);
            drawRobot(robot);
        case "EAST":
            clearRobot();
            robot = new Robot(robot.x + 100, robot.y, robot.dir);
            drawRobot(robot);
        case "SOUTH":
            clearRobot();
            robot = new Robot(robot.x, robot.y - 100, robot.dir);
            drawRobot(robot);
        case "WEST":
            clearRobot();
            robot = new Robot(robot.x - 100, robot.y, robot.dir);
            drawRobot(robot);
    }
}


function init() {
    robot = new Robot(0 + 10, 0 + 10, "EAST");
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
    context.transform(1, 0, 0, -1, 0, canvas.height)
    drawRobot(robot);
}

function Robot(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
}

function clearRobot() {
    context.clearRect(robot.x , robot.y, 80, 80);
}

function drawRobot(newRobot) {
    // context.scale(1, -1);
// context.save();
    // context.translate(50, 50);
    // context.scale(1, -1);

     context.drawImage(img, robot.x + 5, robot.y + 5, 80, 80);

}

init();