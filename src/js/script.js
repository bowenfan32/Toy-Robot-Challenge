
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
    output.innerHTML = err;
}
    
/*
 Core functions
*/

function place() {
    promptError(""); // Clears previous error
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
    promptError("");
    if (robot != null) {
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
    } else {
        promptError("Please place robot first!");
    }
}

function turnRight() {
    if (robot != null) {
        var index = dir.indexOf(robot.dir);
        // Go to next direction index in a clockwise fashion
        if (index == 3) {
            robot.dir = dir[0];
        } else {
            robot.dir = dir[index + 1];
        }
        report();
    } else {
        promptError("Please place robot first!");
    }
}

function turnLeft() {
    if (robot != null) {
        var index = dir.indexOf(robot.dir);
        // Go to previous direction index in a counter clockwise fashion
        if (index == 0) {
            robot.dir = dir[3];
        } else {
            robot.dir = dir[index - 1];
        }
        report();
    } else {
        promptError("Please place robot first!");
    }
}

function report() {
    if (robot != null) {
        reportField.innerHTML = (robot.x - offset) / 100 + "," + (robot.y - offset) / 100 + "," + robot.dir;
    } else {
        promptError("Please place robot first!");
    }
}


/*
 Processes input command
*/

function parseCommand(command) {
    promptError("");
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
        case "REPORT":
            report();
            break;
        default:
            promptError("Please enter valid command");
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
 Tests
*/
function runTest() {
    // Split into lines
    var lines = document.getElementById("testarea").value.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var splitCommand = lines[i].toUpperCase().split(" ");
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
            case "REPORT":
                if (robot != null) {
                    report();
                    var output = document.getElementById("output"); 
                    output.innerHTML = (robot.x - offset) / 100 + "," + (robot.y - offset) / 100 + "," + robot.dir;
                    break;
                }
            default:
                promptError("Please enter valid command");
                break;
        }
    }
}


/*
 Initialization
*/

function init() { 

    // Initialize canvas
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
    if (robot != null) {
        context.clearRect(robot.x , robot.y, 80, 80);
    }
}

function drawRobot(newRobot) {
     context.drawImage(img, robot.x, robot.y, 80, 80);
     report();
}

init();