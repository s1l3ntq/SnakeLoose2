btnWindow = document.getElementById('btn-group');
gameBoard = document.getElementById('gameboard');
startgame = document.getElementById('startgame');


startgame.addEventListener('click', function () {
    btnWindow.style.display = "none"
    gameBoard.style.display = "block"
});

var canvas = document.getElementById("snakeboard");
var ctx = canvas.getContext("2d");


let score = 0
let bodyPart = 0

let snakeBody = [{x:200, y:100},
    {x:190, y:100},
    {x:180, y:100},
    {x:170, y:100}  
]


let xDirection = 10;

let yDirection = 0;

let food = {
    x : Math.floor(Math.random()*17+1)* xDirection,
    y : Math.floor(Math.random()*15+3)* yDirection
}



function createSnake(body) {
    ctx.fillStyle= "blue";
    ctx.fillRect(body.x, body.y , 10, 10);
    ctx.strokeStyle= "darkblue";  
    ctx.strokeRect(body.x, body.y, 10, 10);
}



function randomTen(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function createFood() {
    foodX = randomTen(0, canvas.width - 10);
    foodY = randomTen(0, canvas.height - 10);
    snakeBody.forEach(function isFoodOnSnake(part) {
        const hasEaten = part.x == foodX && part.y == foodY
        if (hasEaten)
        createFood();
        drawFood()
    });
}

// function drawFood() {
//    ctx.beginPath();
//    ctx.arc(230, 300, 5, 0, Math.PI * 2, false);
//    ctx.strokeStyle = "white";
//    ctx.stroke();
// }
  function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'darkred';
    ctx.fillRect(150, 230, 10, 10);
    ctx.strokeRect(150, 230, 10, 10);
   }

function deploySnake() {
    snakeBody.forEach(createSnake)
}



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
    const hasEatenIt = snakeBody[0].x === food.X && snakeBody[0].y === food.y;
    if (hasEatenIt) {
        score += 10;
        document.getElementById("score").innerHTML = score;
        createFood();
    } else {
    snakeBody.pop();
    }
}


function game() {
    setTimeout(function delay(){
        
        if (has_game_ended()) return;

        clear()
        createFood()
        drawFood()
        //food()
        snakeHead()
        deploySnake()
        game()
        //snakeEats()
    }, 150)
}


game()
//snakeEats()




function clear() {
    ctx.fillStyle = "#9518dd";
    ctx.strokeStyle = "darkblue"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function has_game_ended()
{  
  for (let i = 1; i < snakeBody.length; i++) 
  {    
    const has_collided = snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y
    if (has_collided)
       { console.log("Collided") }
      //return true
    }
    const hitLeftWall = snakeBody[0].x < 1;  
    const hitRightWall = snakeBody[0].x >= canvas.height -10;
    const hitToptWall = snakeBody[0].y < 1;
    const hitBottomWall = snakeBody[0].y >= canvas.width - 10;
    
    return (hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall) 
      

    


}

function renderScoreForm() {
     score = snakeBody.length 
     
     console.log(score)

}