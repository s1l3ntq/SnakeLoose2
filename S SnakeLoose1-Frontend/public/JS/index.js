btnWindow = document.getElementById('btn-group');
gameBoard = document.getElementById('gameboard');
startgame = document.getElementById('startgame');


startgame.addEventListener('click', function () {
    btnWindow.style.display = "none"
    gameBoard.style.display = "block"
});

var canvas = document.getElementById("snakeboard");
var ctx = canvas.getContext("2d");

let snakeBody = [{x:200, y:100},
    {x:190, y:100},
    {x:180, y:100},
    {x:170, y:100}  
]

let xDirection = 10;
    
let ydirection = 0;


function createSnake(body) {
    ctx.fillStyle= "blue";
    ctx.fillRect(body.x, body.y , 15, 20)
}

function deploySnake() {
    snakeBody.forEach(createSnake)
}



window.addEventListener("keydown", function(e) {
    
    if (e.key === "ArrowUp") {
        console.log("you pressed up")
    }
    else if (e.key === "ArrowDown") {
        console.log("you pressed down")
    }
    else if (e.key === "ArrowRight") {
        console.log("you pressed right")
    }
    else if (e.key === "ArrowLeft") {
        console.log("you pressed left")
    }
    console.log(e)
  });

function snakeHead() {
const head = {x: snakeBody[0].x+xDirection, y: snakeBody[0].y+ydirection}
snakeBody.unshift(head)
snakeBody.pop
}
function game() {
    setTimeout(function delay(){
        clear()
        food()
        snakeHead()
        deploySnake()
        game()
    }, 1000)
}
game()



function clear() {
    ctx.fillStyle = "#9518dd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
    
function food() {
ctx.beginPath();
ctx.arc(300, 300, 10, 0, Math.PI * 2, false);
ctx.strokeStyle = "white";
ctx.stroke();
}