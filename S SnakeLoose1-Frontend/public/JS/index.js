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


function createSnake(body) {
    ctx.fillStyle= "blue";
    ctx.fillRect(body.x, body.y , 15, 20)
}

function deploySnake() {
    snakeBody.forEach(createSnake)
}

deploySnake()



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

function snakeController() {
const head = {x: snakeBody[0].x, y}

}

//"ArrowUp"	0x26 (38) "ArrowRight"	0x27 (39) "ArrowLeft"	0x25 (37) "ArrowDown"	0x28 (40)
