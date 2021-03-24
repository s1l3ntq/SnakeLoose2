const baseUrl = "http://127.0.0.1:3000/games"
const form = document.getElementById("scoreForm")
//form.addEventListener("submit", submitScore)
const container = document.getElementById("container")

btnWindow = document.getElementById('btn-group');
gameBoard = document.getElementById('gameboard');
startgame = document.getElementById('startgame');
currentScore = document.getElementById("score");
scoreName = document.getElementById("scoreName");
submitScore = document.getElementById('SubmitScore')
highScore = document.getElementById("highscore")

highScore.addEventListener('click', getHighScores)





//new game button "creating onetime -click toggle" What the function does
startgame.addEventListener('click', function () {
    btnWindow.style.display = "none"
    gameBoard.style.display = "block"
    setTimeout(function gameDelay() {
        game()
    }, 7000)
    var timeleft = 5;
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

function renderScoreForm() {
     score = snakeBody.length 
     
     console.log(score)

}

// function handleEndGame(){
//     console.log("game over")
//     ctx.font = "72px iomanoid"
//     ctx.strokeText = "black"
//     ctx.fillText("Game Over",45,100)
//     createForm()

// }

function handleEndGame() {
    console.log("game over")
    ctx.font = "72px iomanoid"
    ctx.strokeText = "black"
    ctx.fillText("Game Over", 45, 100)
    scoreName.style.display = "none"
    currentScore.style.display = "none"
    createForm()

}



function createForm() {
    let myScore = document.createElement('form');
    myScore.setAttribute("class", "formSubmission")
    // myScore.setAttribute('action', "http://127.0.0.1:3000/games");
    myScore.setAttribute('method', 'post');
    let myInput = document.createElement('input');
    myInput.setAttribute('type', 'text');
    myScore.setAttribute('placeholder', "Enter Username");
    myInput.setAttribute('name', 'name');
    myScore.setAttribute("id", "submit-score");
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
    document.getElementById('submit-score').addEventListener('submit', function (e) {
        console.log("here")
        submitScores(e)
        e.preventDefault();
    })
    //  myScore.submit();
}


//  function submitData(name, score) {
    //     const config = {
        //       method: 'POST',
//       headers: {
    //         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//       },
//       body: JSON.stringify({'name': name, 'score': score, 'game_id': 1})
//     }
//     return fetch(baseUrl, config)
//     .then(function(response) {
    //       return response.text();
    //     }).catch(function(error) {
        //       //alert("Failed to save score");
//       return error.message;
//     });
//   }




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
        // .then(r => r.json())
        // .then(data =>console.log(data))
        
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
    const div = document.createElement("h2")
    div.innerText = `${score.name}, ${score.score}`
    btnWindow.appendChild(div)
  }
  

  function renderScore(score) {
      const div = document.createElement("h2")
      div.innerText = `${score.name}, ${score.score}`
      submitScore.appendChild(div)
  }

//   function handleScores(recentScores) {
//       recentScores.forEach(s =>displayRecentScores(s))
//   }
  
//   function displayRecentScores(scores) {
//     let score = document.getElementById("score");
//     const get = {
//         name: scores.target[0].value,
//           score : score.innerText
          
//         }
//         fetch(baseUrl, {
//         method: 'get',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(get)
//     })
//     .then(r=>r.json())
//         .then(data =>getAllScores())
//         .catch(function(error) {
//         alert("Failed to display score");
//         return error.message;
//     });
// }

// fetch('url').then(data => data.json()).then(scores => displayScores(scores))
// function  displayScores(scores) {
// scores.map(score => {
// const parent = document.getElementById('parent_example')
// const element = document.createElement('div');
// element.innerHTML = `${score.name} scored: ${score.score}`
// parent.appendChild(element)
// })
// }

// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById('score').addEventListener("click", () => renderPage())
//   })

//   function renderPage() {
//     document.getElementById('carousel-parent').insertAdjacentHTML('afterend', scoreTable);
//     fetch(baseUrl).then(object => object.json()).then(object => renderScore(object));
//   }

//   function renderScore(object) {
//     const tableBodyTrivia = document.getElementById('table-body-trivia')
//       for(let i = 0; i < object[0].trivia_scores.length; i++) {
//         let tr = document.createElement('tr');
//         tr.innerHTML = `
//         <td>${object[0].trivia_scores[i].score}</td>
//         <td>${object[0].trivia_scores[i].name}</td>`
//         tableBodyTrivia.appendChild(tr);
//       }
//   } 









    //  }

//   updateScore: function() {
//     fetch(`${domain}/api/trivia/trivia_top_10_players`).then(object => object.json()).then(object => app.fillScores(object))
//   }
// }

// document.addEventListener("DOMContentLoaded", app.init)


// function init() {
//     getAllPosts();
// }


// function handleSubmit(e) {
    //     e.preventDefault();
//     // let title = document.getElementById("blog-title").value;
//     // let author = document.getElementById("blog-author").value;
//     // let content = document.getElementById("blog-content").value;
//     const postInfo = {
//         title: e.target[0].value,
//         author: e.target[1].value,
//         content: e.target[2].value
//     }

//     // by default Fetch makes a GET request, if you want to make any other request you HAVE to tell it what kind
//     fetch(baseUrl, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(postInfo)
//     })
//         .then(r => r.json())
//         .then(data => putPostOnDom(data))
// }

// function getAllPosts() {
//     fetch(baseUrl)
//         // the result from baseURL is NOT JSON it's a String
//         .then(r => r.json())
//         .then(handlePosts)
 //}