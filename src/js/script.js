
var robot = null;

var error = document.getElementById("error");
var canvas = document.getElementById("canvas");
var img = document.getElementById("img-robot");
var context = canvas.getContext("2d");
var offset = 10;

var dir = ["NORTH", "EAST", "SOUTH", "WEST"];


function promptError(err) {
    error.innerHTML = err;
}

function outOfBound(newMove) {
    if (newMove > 410 || newMove < 10) {
        promptError("You shall not pass!");
        return true;
    } else return false;
}

function place() {
    error.innerHTML = "";
    var x = document.getElementById("x-axis").value;
    var y = document.getElementById("y-axis").value;
    if (x >= 0 && x <=4 && y >=0 && y <=4) {
        clearRobot();
        robot = new Robot(x * 100 + offset, y * 100 + offset, "NORTH");
        drawRobot(robot);
        return false; // Prevent page refresh
    } else {
        promptError("Index out of bound!");
        return false;
    }
}


function move() {
    error.innerHTML = "";
    switch(robot.dir) {
        case "NORTH":
            if (!outOfBound(robot.y + 100)) {
                clearRobot();
                robot = new Robot(robot.x , robot.y + 100, robot.dir);
                drawRobot(robot);
            }
            break;
        case "EAST":
            if (!outOfBound(robot.x + 100)) {
                clearRobot();
                robot = new Robot(robot.x + 100, robot.y, robot.dir);
                drawRobot(robot);
            }
            break;
        case "SOUTH":
            if (!outOfBound(robot.y - 100)) {
                clearRobot();
                robot = new Robot(robot.x , robot.y - 100, robot.dir);
                drawRobot(robot);
            }
            break;
        case "WEST":
            if (!outOfBound(robot.x - 100)) {
                clearRobot();
                robot = new Robot(robot.x - 100 , robot.y, robot.dir);
                drawRobot(robot);
            }
            break;
    }
}

function turnRight() {
    var index = dir.indexOf(robot.dir);
    if (index == 3) {
        robot.dir = dir[0];
    } else {
        robot.dir = dir[index + 1];
    }
}

function turnLeft() {
    var index = dir.indexOf(robot.dir);
    if (index == 0) {
        robot.dir = dir[3];
    } else {
        robot.dir = dir[index - 1];
    }
}


function init() {
    robot = new Robot(0 + offset, 0 + offset, "NORTH");
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
    // drawRobot(robot);
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