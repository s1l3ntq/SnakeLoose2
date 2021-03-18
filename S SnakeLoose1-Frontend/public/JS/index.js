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

// let snakeBox = [{X:350, y:250},
//     {x:340, y:250},
//     {x:330, y:250},
//     {x:320, y:250},
// ]

let xDirection = 10;
    
let yDirection = 0;


function createSnake(body) {
    ctx.fillStyle= "blue";
    ctx.fillRect(body.x, body.y , 10, 10);
    ctx.strokeStyle= "darkblue";  
    ctx.strokeRect(body.x, body.y, 10, 10);
}

// function createBox(box) {
//     ctx.fillStyle= "black";
//     ctx.fillRect(box.x, box.y, 10, 10);
//     ctx.strokeStyle= "white";
//     ctx.strokeRect(box.x, box.y, 10, 10)
// }

function deploySnake() {
    snakeBody.forEach(createSnake)
}

// function popOff() {
//     snakeBox.forEach(createBox)
// }



// window.addEventListener("keydown", function(e) {
    
//     if (e.key === "ArrowUp") {
//         xDirection = 0;
//         yDirection = -10;
//         console.log("you pressed up")
//     }
//     else if (e.key === "ArrowDown") {
//         xDirection = -10;
//         yDirection = 0;
//         console.log("you pressed down")
//     }
//     else if (e.key === "ArrowRight") {
//         xDirection = 10;
//         yDirection = 0;
//         console.log("you pressed right")
//     }
//     else if (e.key === "ArrowLeft") {
//         xDirection = -10;
//         yDirection = 0;  
//     }
//     console.log(e)
//   });



  window.addEventListener("keydown", function(e) {
    
    if (e.key === "ArrowUp" && yDirection !== 10 ) {
        xDirection = 0;
        yDirection = -10;
        console.log("you pressed up")
    }
    else if (e.key === "ArrowDown" && yDirection !== -10) {
        xDirection = 0;
        yDirection = 10;
        console.log("you pressed down")
    }
    else if (e.key === "ArrowRight" && xDirection !== -10) {
        xDirection = 10;
        yDirection = 0;
        console.log("you pressed right")
    }
    else if (e.key === "ArrowLeft" && xDirection !== 10) {
        xDirection = -10;
        yDirection = 0;  
    }
    console.log(e)
  });


  



function snakeHead() {
    var head = {x: snakeBody[0].x+xDirection, y: snakeBody[0].y+yDirection}
    snakeBody.unshift(head);
    snakeBody.pop();
}

// function box() {
//     var head = {X: snakeBox[0].x+xDirection, y: snakeBox[0].y+yDirection}
//     snakeBox.unshift(head);
//     snakeBox.pop();
// }

function game() {
    setTimeout(function delay(){

        clear()
        game()
        food()
        snakeHead()
        deploySnake()
    }, 500)
}

game()




function clear() {
    ctx.fillStyle = "#9518dd";
    ctx.strokeStyle = "darkblue"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
    
function food() {
ctx.beginPath();
ctx.arc(300, 300, 10, 0, Math.PI * 2, false);
ctx.strokeStyle = "white";
ctx.stroke();
}

