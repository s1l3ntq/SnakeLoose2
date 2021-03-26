
  
  const baseUrl = "http://127.0.0.1:3000/games"
  const form = document.getElementById("scoreForm")
  const container = document.getElementById("container")
  
  const btnWindow = document.getElementById('btn-group');
  const gameBoard = document.getElementById('gameboard');
  const startgame = document.getElementById('startgame');
  const currentScore = document.getElementById("score");
  const scoreName = document.getElementById("scoreName");
  const submitScore = document.getElementById('SubmitScore')
  const highScore = document.getElementById("highscore")
  const highScoreGroup = document.getElementById("highscoregroup")
  const recentScore = document.getElementById("recentscores")
  
  highScore.addEventListener('click', getHighScores)
  
  
  
  
  
  
  //new game button "creating onetime -click toggle" What the function does
  startgame.addEventListener('click',  () => {
    btnWindow.style.display = "none"
    gameBoard.style.display = "block"
    // built in time function meaured in mili secs takes 2 args 
    setTimeout(function gameDelay() {
        game()
    }, 7000)
    let timeleft = 5;
    scoreName.style.display = 'none'
    currentScore.style.display = "none"
    setInterval(function downloadTimer() {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").style.left = "38%";
            document.getElementById("countdown").style.fontSize = "140px";
            document.getElementById("countdown").innerHTML = "Begin";
            setTimeout(function removeCountdown() {
                document.getElementById("countdown").style.display = "none";
                scoreName.style.display = 'block'
                currentScore.style.display = "block"
            }, 1000)

        } else {

            document.getElementById("countdown").innerHTML = timeleft;
        }
        timeleft -= 1;
    }, 1000);
});

// variables 
const canvas = document.getElementById("snakeboard");
const ctx = canvas.getContext("2d");


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
    let head = {x: snakeBody[0].x + xDirection, y: snakeBody[0].y + yDirection}
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
        
    }, 50)
}



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


function handleEndGame() {
    console.log("game over")
    ctx.font = "72px iomanoid"
    ctx.strokeText = "black"
    ctx.fillText("Game Over", 45, 50)
    scoreName.style.display = "none"
    currentScore.style.display = "none"
    createForm()

}



function createForm() {
    const myScore = document.createElement('form');
    myScore.setAttribute("class", "formSubmission")
    myScore.setAttribute('method', 'post');
    const myInput = document.createElement('input');
    myInput.setAttribute('type', 'text');
    myScore.setAttribute('placeholder', "Enter Username");
    myInput.setAttribute('name', 'name');
    myScore.setAttribute("id", "submit-score");
    myScore.appendChild(myInput);
    submitScore.appendChild(myScore);

    const finalScore = document.createElement("input")
    finalScore.setAttribute("hidden", "true")
    finalScore.value = score
    myScore.appendChild(finalScore)

    let s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit Score");
    myScore.appendChild(s);
    document.getElementById('submit-score').addEventListener('submit', function (e) {
        console.log("here")
        submitScores(e)
        e.preventDefault();
    })
    
}

  function snakeLoose() {
      getAllScores();
  }

  async function submitScores(s) {

      s.preventDefault();
      let q = document.getElementsByClassName("btn recentscores").value ;
      let score = document.getElementById("score");
      console.log(score.innerText)
      
      let scoreInfo = {
          name: s.target[0].value,
          score: score.innerText
        }
        
        fetch(baseUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(scoreInfo)
        })
        .then(getAllScores())
    }
    
    function getAllScores(){
      fetch(baseUrl)
        
        .then(r => r.json())
        .then(data => {
            data.forEach(d => {
                renderScore(d)
            })
        })
  }

  function getHighScores(){
      fetch("http://127.0.0.1:3000/high_scores")
      
        .then(r => r.json())
        .then(data => {
            data.forEach(d => {
                renderHighScore(d)
            })
        })
        
  }

  function renderHighScore(score) {
    const h3 = document.createElement("h3")
    h3.innerText = `${score.name}, ${score.score}`
    document.getElementById("lefttitle").innerHTML = "Top Scores"
    highScoreGroup.appendChild(h3)
  }
  

  function renderScore(score) {
      const h3 = document.createElement("h3")
      h3.innerText = `${score.name}, ${score.score}`
      document.getElementById("righttitle").innerHTML = "Recent Scores"
      recentScore.appendChild(h3)
      recentScore.style.visibility = "visible"
  }
