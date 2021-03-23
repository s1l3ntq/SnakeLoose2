btnWindow = document.getElementById('btn-group');
gameBoard = document.getElementById('gameboard');
startgame = document.getElementById('startgame');
currentScore = document.getElementById("score");
submitScore = document.getElementById('SubmitScore')
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


let foodx = 150
let foody = 230
let isRunning = true


//helper function to ramdomize by ten pixels food once snake has eaten it
function randomTen(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function randomizeFood() {
    foodx = randomTen(0, canvas.width - 10)
    foody = randomTen(0, canvas.height - 10)
}

//creates the instance of the food object 
  function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokestyle = 'darkred';
    ctx.fillRect(foodx, foody, 10, 10);
    ctx.strokeRect(foodx, foody, 10, 10);
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
    let hasEatenIt = snakeBody[0].x === foodx && snakeBody[0].y === foody
    //Changing coordinates, adding new positon to the array as snake object moves 
    snakeBody.unshift(head);
    if (hasEatenIt) {
        hasEaten()
    } else {
    //removes the current position of the tail
     snakeBody.pop();
    }
}

// calculate score then randomize placement of the food
function hasEaten(){

        score += 10;
        currentScore.innerHTML = score;
        randomizeFood();
}

//Main functionality of the game
function game() {
    setTimeout(function delay(){
        
        if (isRunning){
            clear()
            drawFood()
            deploySnake()
            moveSnake()
            has_game_ended()
            game()
        } else {
            handleEndGame()
        }
        
    }, 150)
}


game()




function clear() {
    ctx.fillStyle = "#9518dd";
    ctx.strokeStyle = "darkblue"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
//boolean that proctors end game
function has_game_ended()
{  
    //checks to see if snake has collided with self 
  for (let i = 4 ; i < snakeBody.length; i++) 
  {    
    const has_collided = snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y
        if (has_collided) {
      return isRunning = false
        }
    }
    const hitLeftWall = snakeBody[0].x < 0;  
    const hitRightWall = snakeBody[0].x > canvas.height -10;
    const hitToptWall = snakeBody[0].y < 0;
    const hitBottomWall = snakeBody[0].y > canvas.width - 10;
    // checks to see if snake collides with wall
   if (hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall) {

       return isRunning = false
   }
      
}

function renderScoreForm() {
     score = snakeBody.length 
     
     console.log(score)

}

function handleEndGame(){
    console.log("game over")
    ctx.font = "72px iomanoid"
    ctx.strokeText = "black"
    ctx.fillText("Game Over",45,100)


    let myScore = document.createElement('form');
        myScore.setAttribute("class", "formSubmission")
        myScore.setAttribute('action', "/");
        myScore.setAttribute('method', 'post');
    let myInput = document.createElement('input');
        myInput.setAttribute('type', 'text');
        myInput.setAttribute('name', 'playername');
        //myInput.setAttribute('value', id);
        myScore.appendChild(myInput);
        submitScore.appendChild(myScore);
        
        let finalScore = document.createElement("input")
        finalScore.setAttribute("hidden", "true")
        finalScore.value = score 
        myScore.appendChild(finalScore)
        
        let s = document.createElement("input");
        s.setAttribute("type", "submit");
        s.setAttribute("value", "Submit Score");
        myScore.appendChild(s);
        // myScore.submit();
}

// submitData: function(name, score) {
//     const config = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({'name': name, 'score': score, 'game_id': 1})
//     }
//     return fetch(`${domain}/api/snakeloose/add_score`, config)
//     .then(function(response) {
//       return response.text();
//     }).catch(function(error) {
//       alert("Failed to save score");
//       return error.message;
//     });
//   },

//   updateScore: function() {
//     fetch(`${domain}/api/trivia/trivia_top_10_players`).then(object => object.json()).then(object => app.fillScores(object))
//   }
// }

// document.addEventListener("DOMContentLoaded", app.init)
