const gravity = 0.98
const damping = 0.9;
var spaceBarPressed = false;
var audio = new Audio();
let ball = {
    x: 0,
    y: 0,
    radius: 30,
    velocity: {
      x: 10,
      y: -25
    },
    radiusAlteration: 1.5,
    color: "white"
  };


document.addEventListener("DOMContentLoaded", function() {

    audio.src = 'Resources/ball.mp3';
    document.body.appendChild(audio);
    var canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ball.y = canvas.height / 2;
    ball.x = canvas.width / 2;

    document.addEventListener('keyup', function(event) {
      if (event.key === ' ') {
        spaceBarPressed = false;
      }})

    document.addEventListener('keydown', function(event) {
      if (event.key === ' ') {
        if (event.key === ' ' && !spaceBarPressed) {
          spaceBarPressed = true;
        ball.velocity.x *= 2;
        ball.velocity.y *= 2;
        }
      }
    });

  canvas.addEventListener("mousemove", handleMouseMove);
  function animate() {
    update();
    requestAnimationFrame(animate);
  }
  
  animate();
  });


 

  function handleMouseMove(event) {

    const distanceToMouse = Math.sqrt((ball.x - event.clientX) ** 2 + (ball.y - event.clientY) ** 2);

if (distanceToMouse <= ball.radius * 2) {
    // Collision with the mouse cursor
    const normalX = (ball.x - event.clientX) / distanceToMouse;
    const normalY = (ball.y - event.clientY) / distanceToMouse;

    const dotProduct = ball.velocity.x * normalX + ball.velocity.y * normalY;

    // Reflect the velocity vector
    ball.velocity.x -= 2.2 * dotProduct * normalX;
    ball.velocity.y -=  2.2 * dotProduct * normalY;
  }
}

  function update(){
    updateBall()
    drawCircle(context)
  }

  function updateBall() {
    // Update velocity based on gravity
    ball.velocity.y += gravity;
  
    // Update position based on velocity
    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;
  
    // Bounce off top and bottom
    if (ball.y + ball.radius > canvas.height | ball.y - ball.radius < 0) {
      ball.velocity.y *= -damping; // Invert y velocity and apply damping
      if(Math.abs(ball.velocity.y) > 5){
        audio.cloneNode(true).play()
        ball.color = getRandomColor()
        ball.radius += ball.radiusAlteration;
        if(ball.radius > 128 || ball.radius < 16){
          ball.radiusAlteration *= -1;
        }
      }
    }
    // Bounce off the walls
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
      ball.velocity.x *= -damping; // Invert x velocity
        audio.cloneNode(true).play()
        ball.color = getRandomColor()
        ball.radius += ball.radiusAlteration;
        if(ball.radius > 128 || ball.radius < 16){
          ball.radiusAlteration *= -1;
        }
    }

    ball.x = Math.max(ball.x, ball.radius)
    ball.x = Math.min(canvas.width - ball.radius, ball.x)
    ball.y = Math.max(ball.y, ball.radius)
    ball.y = Math.min(canvas.height - ball.radius, ball.y)

  }

  function drawCircle(context){
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    context.fillStyle = ball.color
    context.fill();
  }

  function getRandomColor() {
    // Generate random values for red, green, and blue
    var red = Math.floor(Math.random() * 156) + 100; // Random value between 100 and 255
    var green = Math.floor(Math.random() * 156) + 100;
    var blue = Math.floor(Math.random() * 156) + 100;
  
    // Convert the RGB values to a hex color code
    var hexColor = "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue);
  
    return hexColor;
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }