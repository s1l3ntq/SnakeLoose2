btnWindow = document.getElementById('btn-group');
snakeGame = document.getElementById('snake');
startgame = document.getElementById('startgame');


startgame.addEventListener('click', function () {
    btnWindow.style.display = "compact"
    snakeGame.style.display = "block"
});

var canvas = document.getElementById("snakeboard");
var ctx = canvas.getContext("2d");

let snake = [{x:200, y:100},
    {x:190, y:100},
    {x:180, y:100},
    {x:170, y:100}  
    ]

function createsnake(body) {
    ctx.fillstyle= "blue";
    ctx.fillrect(body.x, body.y , 15, 20)
}

function deploysnake() {
    snake.forEach(createsnake)
}
deploysnake()