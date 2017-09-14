
var robot = null;
var offset = 10;
var dir = ["NORTH", "EAST", "SOUTH", "WEST"];

var error = document.getElementById("error");
var canvas = document.getElementById("canvas");
var reportField = document.getElementById("report");
var img = document.getElementById("img-robot");
var context = canvas.getContext("2d");
document.getElementById("commandBtn").onclick = function() {
    parseCommand(document.getElementById("command").value);
}


function promptError(err) {
    error.innerHTML = err;
}


/*
 Core functions
*/

function place() {
    error.innerHTML = ""; // Clears previous error
    var x = document.getElementById("x-axis").value;
    var y = document.getElementById("y-axis").value;
    var dir = document.getElementById("direction").value.toUpperCase();

    if (isValid(x, y, dir)) { // Validates input values
        clearRobot(); // Clear previous drawing
        robot = new Robot(x * 100 + offset, y * 100 + offset, dir);
        drawRobot(robot);
        // Enable control buttons after robot has been placed
        document.getElementById("moveBtn").disabled = false;
        document.getElementById("rightBtn").disabled = false;
        document.getElementById("leftBtn").disabled = false;
    } 
    return false; // Prevent page refresh
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
    // Go to next direction index in a clockwise fashion
    if (index == 3) {
        robot.dir = dir[0];
    } else {
        robot.dir = dir[index + 1];
    }
    report();
}

function turnLeft() {
    var index = dir.indexOf(robot.dir);
    // Go to previous direction index in a counter clockwise fashion
    if (index == 0) {
        robot.dir = dir[3];
    } else {
        robot.dir = dir[index - 1];
    }
    report();
}

function report() {
    reportField.innerHTML = (robot.x - offset) / 100 + "," + (robot.y - offset) / 100 + "," + robot.dir;
}


/*
 Processes input command
*/

function parseCommand(command) {
    error.innerHTML = "";
    splitCommand = command.toUpperCase().split(" ");

    switch(splitCommand[0]) {
        case "PLACE":
            var position = splitCommand[1].split(",");
            var x = position[0];
            var y = position[1];
            var dir = position[2];
            if (isValid(x, y, dir)) {
                clearRobot();
                robot = new Robot(x * 100 + offset, y * 100 + offset, dir);
                drawRobot(robot);
                document.getElementById("moveBtn").disabled = false;
                document.getElementById("rightBtn").disabled = false;
                document.getElementById("leftBtn").disabled = false;
                return false; // Prevent page refresh
            } 
            break;
        case "MOVE":
            move();
            break;
        case "LEFT":
            turnLeft();
            break;
        case "RIGHT":
            turnRight();
            break;
    }
}


/*
 Input Validation
*/

function isValid(x, y, direction) {
    if (isNaN(x) || isNaN(y)) { // Check if value is numeric
        promptError("Please enter valid number!");
        return false;
    } else if (x < 0 || x > 4 || y < 0 || y > 4) { // Check index range
        promptError("Index out of bound");
        return false;
    } else if (!dir.includes(direction)) { // Check direction is valid
        promptError("Please enter valid direction!");
        return false
    }
    else return true;
}

// Check if a new move is out of bound
function outOfBound(newMove) {
    if (newMove > 410 || newMove < 10) {
        promptError("You shall not pass!");
        return true;
    } else return false;
}


/*
 Initialization
*/

function init() { 

    // Initialize canvas
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
    // Flips Y axis
    context.transform(1, 0, 0, -1, 0, canvas.height); 
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
     report();
}

init();