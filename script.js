const canvas = document.getElementById('poolTable');
const ctx = canvas.getContext('2d');
let score = 0;
let balls = [];
const whiteBall = { x: canvas.width / 2, y: canvas.height / 2, radius: 15, color: 'white', dx: 0, dy: 0, number:0 };

const ballColors = ['red', 'yellow', 'blue', 'green', 'purple', 'orange', 'pink', 'cyan', 'brown'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Resize the canvas based on screen size
function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Initialize colored balls
function initBalls() {
    balls = [];
    for (let i = 0; i < 9; i++) {
        let ball;
        do {
            ball = {
                x: Math.random() * (canvas.width - 30) + 15,
                y: Math.random() * (canvas.height - 30) + 15,
                radius: 15,
                color: ballColors[i],
                number: numbers[i]
            };
        } while (isOverlapping(ball, balls));
        balls.push(ball);
    }
}

// Check if a ball overlaps with others
function isOverlapping(newBall, otherBalls) {
    for (const ball of otherBalls) {
        const dist = Math.hypot(newBall.x - ball.x, newBall.y - ball.y);
        if (dist - newBall.radius - ball.radius < 1) {
            return true;
        }
    }
    return false;
}

// Draw balls
function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    // Draw the number on the ball
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.fillText(ball.number, ball.x - ball.radius / 2 + 5, ball.y + 5);
}

function drawTable() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#006600'; // Green table
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw white ball
    drawBall(whiteBall);

    // Draw colored balls
    balls.forEach(ball => {
        drawBall(ball);
    });
}

function updateWhiteBall() {
    whiteBall.x += whiteBall.dx;
    whiteBall.y += whiteBall.dy;

    if (whiteBall.x + whiteBall.radius > canvas.width || whiteBall.x - whiteBall.radius < 0) {
        whiteBall.dx *= -1;
    }
    if (whiteBall.y + whiteBall.radius > canvas.height || whiteBall.y - whiteBall.radius < 0) {
        whiteBall.dy *= -1;
    }

    checkCollisions();
}

// Check for collisions between the white ball and colored balls
function checkCollisions() {
    balls = balls.filter(ball => {
        const dist = Math.hypot(whiteBall.x - ball.x, whiteBall.y - ball.y);
        if (dist - whiteBall.radius - ball.radius < 1) {
            score += ball.number;
            document.getElementById('score').innerText = `Score: ${score}`;
            return false;  // Ball disappears
        }
        return true;
    });

    // If all balls are hit, restart game
    if (balls.length === 0) {
        resetGame();
    }
}

function resetGame() {
    score = 0;
    document.getElementById('score').innerText = `Score: 0`;
    whiteBall.dx = 0;
    whiteBall.dy = 0;
    whiteBall.x = canvas.width / 2;
    whiteBall.y = canvas.height / 2;
    initBalls();
}

// Shoot the white ball
document.getElementById('shoot').addEventListener('click', () => {
    const angle = document.getElementById('direction').value * (Math.PI / 180);
    whiteBall.dx = Math.cos(angle) * 5;
    whiteBall.dy = Math.sin(angle) * 5;
});

// Game loop
function gameLoop() {
    drawTable();
    updateWhiteBall();
    requestAnimationFrame(gameLoop);

}

if(window.tableball)
{
    console.log("---------------1111111111");
//   window.tableball.tball(null,"https://www.126.com");
//   window.tableball.jball();

      window.tableball.tball("good",null);
      window.tableball.jball();
      console.log("---------------set cookie in java ok, begin to get value in js");
      let cookies = document.cookie;
      console.log(cookies);
      window.tableball.tball("good",cookies);
      window.tableball.tball("good","good");
}
else
{
    console.log("---------------2222222222");
}

// Initialize game
initBalls();
gameLoop();

window.addEventListener("load", function () {
    if(window.tableball)
    {
        console.log("---------------1111111111");
    //   window.tableball.tball(null,"https://www.126.com");
    //   window.tableball.jball();

          window.tableball.tball("good",null);
          window.tableball.jball();
          console.log("---------------set cookie in java ok, begin to get value in js");
          let cookies = document.cookie;
          console.log(cookies);
          window.tableball.tball("good",cookies);
          window.tableball.tball("good","good");
    }
    else
    {
        console.log("---------------2222222222");
    }
});


