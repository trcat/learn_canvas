const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.position = "fixed";
let ctx,
  count = 0;
const list = [];

class Snow {
  constructor(_canvas, x, y) {
    this.x = x || _canvas.width - Math.floor(Math.random() * _canvas.width);
    this.y =
      y === null || typeof y === "undefined"
        ? _canvas.height - Math.floor(Math.random() * _canvas.height)
        : y;
    this.size = Math.random() * 2 + 1;
    this.speed = 0.5;
    this.canvas = _canvas;
    this.radian = null;
  }
  draw(_ctx) {
    this.computedPosition();
    _ctx.save();
    _ctx.translate(this.x, this.y);
    _ctx.beginPath();
    _ctx.arc(
      this.x + this.size,
      this.y + this.size,
      this.size,
      0,
      Math.PI * 2,
      true
    );
    _ctx.fillStyle = "#fff";
    _ctx.fill();
    _ctx.restore();
  }
  computedPosition() {
    !this.radian && (this.radian = Math.random() * Math.PI);
    this.x += Math.abs(Math.cos(this.radian) * this.speed);
    this.y += this.speed;
  }
}

function init() {
  ctx = canvas.getContext("2d");
  generateSnow()
  requestAnimationFrame(draw);
}

function generateSnow() {
  for (let i = 0; i < 100; i++) {
    list.push(
      new Snow(
        canvas,
        canvas.width - Math.floor(Math.random() * canvas.width),
        Math.floor(Math.random() * canvas.height * 0.5) * -1
      )
    );
  }
}

function draw() {
  if (count === 50) {
    generateSnow()
    count = 0;
  }
  count += 1;
  const linearColor = ctx.createLinearGradient(0, 0, 0, canvas.height);
  linearColor.addColorStop(0, "#232256");
  linearColor.addColorStop(1, "#143778");
  ctx.fillStyle = linearColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  list.forEach((i) => i.draw(ctx));
  requestAnimationFrame(draw);
}
