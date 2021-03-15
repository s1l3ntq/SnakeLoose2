btnWindow = document.getElementById('btn-group');
snakeGame = document.getElementById('snake');
startgame = document.getElementById('startgame');


startgame.addEventListener('click', function () {
    btnWindow.style.display = "compact"
    snakeGame.style.display = "block"
});

var canvas = document.getElementById("snakeboard");
var ctx = canvas.getContext("2d");