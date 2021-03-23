btnWindow = document.getElementById('btn-group');
gameBoard = document.getElementById('gameboard');
startgame = document.getElementById('startgame');

//new game button "creating onetime -click toggle" What the function does
startgame.addEventListener('click', function () {
    btnWindow.style.display = "none"
    gameBoard.style.display = "block"
});

// variables 
var canvas = document.getElementById("snakeboard");
var ctx = canvas.getContext("2d");


let score = 0
let bodyPart = 0

//snake body coordinate canvas on grid
let snakeBody = [{x:200, y:100},
    {x:190, y:100},
    {x:180, y:100},
    {x:170, y:100}  
]


let xDirection = 10;

let yDirection = 0;

let food = {
    x : randomTen(0, canvas.width - 10),
    y : randomTen(0, canvas.height - 10)
}

let hasEatenIt = snakeBody[0].x === food.x && snakeBody[0].y === food.y

//helper function to ramdomize by ten pixels food once snake has eaten it
function randomTen(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function randomizeFood() {
    
}

//creates the instance of the food object 
  function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'darkred';
    ctx.fillRect(150, 230, 10, 10);
    ctx.strokeRect(150, 230, 10, 10);
   }

//creating a single instace of the snake(object)
function createSnake(body) {
    ctx.fillStyle= "blue";
    ctx.fillRect(body.x, body.y , 10, 10);
    ctx.strokeStyle= "darkblue";  
    ctx.strokeRect(body.x, body.y, 10, 10);
}

//creating each instance of the snake(object)
//polymorphism all inheriting from the same 
function deploySnake() {
        snakeBody.forEach(createSnake)
    }
    

//handles keystrokes 
  window.addEventListener("keydown", function(e) {
    
    if (e.key === "ArrowUp" && yDirection !== 10 ) {
        xDirection = 0;
        yDirection = -10;
        
    }
    else if (e.key === "ArrowDown" && yDirection !== -10) {
        xDirection = 0;
        yDirection = 10;
        
    }
    else if (e.key === "ArrowRight" && xDirection !== -10) {
        xDirection = 10;
        yDirection = 0;
        
    }
    else if (e.key === "ArrowLeft" && xDirection !== 10) {
        xDirection = -10;
        yDirection = 0;  
    }

  });



//Defines the direction of the head movement
function moveSnake() {
    //Define the direction the head is moving
    var head = {x: snakeBody[0].x + xDirection, y: snakeBody[0].y + yDirection}
    //Changing coordinates, adding new positon to the array as snake object moves 
    snakeBody.unshift(head);
    if (hasEatenIt) {
        hasEaten()

    } else {
    //removes the current position of the tail
     snakeBody.pop();
    }
}

function hasEaten(){

        score += 10;
        document.getElementById("score").innerHTML = score;
        randomizeFood();
}


function game() {
    setTimeout(function delay(){
        
        if (has_game_ended()) return;

        clear()
        randomizeFood()
        drawFood()
        //food()
        deploySnake()
        moveSnake()
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