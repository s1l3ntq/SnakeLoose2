btnWindow = document.getElementById('btn-group');
snakeGame = document.getElementById('snake');
startgame = document.getElementById('startgame');

startgame.addEventListener('click', function () {
    btnWindow.style.display = "none"
    snakeGame.style.display = "block"
});