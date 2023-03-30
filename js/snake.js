// definimos el canvas y el contexto
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// definimos las dimensiones del canvas y la velocidad de la serpiente
const width = canvas.width;
const height = canvas.height;
let snakeSpeed = 10;
// definimos las coordenadas iniciales de la serpiente y su tamaño inicial
let snake = [{x: 10, y: 10}];
let snakeSize = 6;
// definimos puntaje el cual ira incrementando al comer
let scoreIncrement = 0;
const scores = document.getElementById("score");
// definimos la dirección inicial de la serpiente
let direction = "right";
// definimos la posición inicial de la comida, math floor redondea al mas cercano
let food = {x: Math.floor(Math.random() * (width / 10)) * 10, y: Math.floor(Math.random() * (height / 10)) * 10};
// dibujamos la serpiente verde
function drawSnake() {
    ctx.fillStyle = "green";
    for(let i=0; i<snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
}
// movemos la serpiente
function moveSnake() {
    let head = {x: snake[0].x, y: snake[0].y};
    // cambiamos la dirección de la serpiente
    switch(direction) {
        case "right":
            head.x += snakeSpeed;
            break;
        case "left":
            head.x -= snakeSpeed;
            break;
        case "up":
            head.y -= snakeSpeed;
            break;
        case "down":
            head.y += snakeSpeed;
            break;
    }
    // agregamos la cabeza de la serpiente, esta indicara hacia donde se dirige
    snake.unshift(head);
    // eliminamos la cola de la serpiente si no hay comida, sino la serpiente seria infinita
    if(snake.length > snakeSize) {
        snake.pop();
    }
}
// dibujamos la comida roja
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 10, 10);
}
// detectamos colisiones
function checkCollision() {
    // colisión con la pared
    if(snake[0].x < 0 || snake[0].x >= width || snake[0].y < 0 || snake[0].y >= height) {
        return true;
    }
    // colisión con si misma (con serpiente)
    for(let i=1; i<snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            return true;
        }
    }
    // colisión con la comida (aumenta tamaño y puntaje)
    if(snake[0].x == food.x && snake[0].y == food.y) {
        scoreIncrement++
        snakeSize++;
	// volvemos a generar la posicion de comida (nueva)
        food = {x: Math.floor(Math.random() * (width / 10)) * 10, y: Math.floor(Math.random() * (height / 10)) * 10};
    }
    return false;
}
// dibujamos el juego
function draw() {
    // limpiamos el canvas
    ctx.clearRect(0, 0, width, height);
    // dibujamos la serpiente y la comida
    drawSnake();
    drawFood();
    // movemos la serpiente y evaluamos colision por cada movimiento
    moveSnake();
    if(checkCollision()) {
        clearInterval(game);
        showPopup();
    }
    else {
        scores.innerHTML = "<p>Puntaje: " + scoreIncrement + "</p>"
    }
}
// Obtener elemento del DOM para mostrar popup game over si hay colision
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const restartButton = document.getElementById("restartButton");
// Función para mostrar el pop-up
function showPopup() {
  overlay.style.display = "flex";
}
// Función para ocultar el pop-up
function hidePopup() {
  overlay.style.display = "none";
}
// Función para reiniciar el juego
function restartGame() {
  location.reload();
  hidePopup(); // Ocultar el pop-up después de reiniciar el juego
}
// Asignar eventos al boton para reiniciar 
restartButton.addEventListener("click", restartGame);
// detectamos las teclas presionadas para cambiar la dirección de la serpiente
document.addEventListener("keydown", function(event) {
    switch(event.keyCode) {
        case 37:
            if(direction != "right") {
                direction = "left";
            }
            break;
        case 38:
            if(direction != "down") {
                direction = "up";
            }
            break;
        case 39:
            if(direction != "left") {
                direction = "right";
            }
            break;
        case 40:
            if(direction != "up") {
                direction = "down";
            }
            break;
    }
});
// iniciamos el juego
let game = setInterval(draw, 100);