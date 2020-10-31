const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.position = "fixed";
let ctx;
const list = [];

class Start {
  constructor(_canvas) {
    this.x = _canvas.width - Math.floor(Math.random() * _canvas.width);
    this.y = _canvas.height - Math.floor(Math.random() * _canvas.height);
    this.size = Math.random() * 4 + 2;
    this.speed = 1;
  }
  draw(_ctx) {
    this.x += this.speed;
    this.y += this.speed;
    _ctx.save();
    _ctx.translate(this.x, this.y);
    _ctx.beginPath();
    _ctx.moveTo(this.size, 0);
    for (let i = 0; i < 9; i++) {
      _ctx.rotate(Math.PI / 5);
      if (i % 2 == 0) {
        _ctx.lineTo((this.size / 0.525731) * 0.200811, 0);
      } else {
        _ctx.lineTo(this.size, 0);
      }
    }
    _ctx.closePath();
    _ctx.fillStyle = "#fff";
    _ctx.fill();
    _ctx.restore();
  }
}

function init() {
  ctx = canvas.getContext("2d");
  for (let i = 0; i < 250; i++) {
    list.push(new Start(canvas));
  }
  requestAnimationFrame(draw);
}

function draw() {
  const linearColor = ctx.createLinearGradient(0, 0, 0, canvas.height);
  linearColor.addColorStop(0, "#232256");
  linearColor.addColorStop(1, "#143778");
  ctx.fillStyle = linearColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  list.forEach((i) => i.draw(ctx));
  requestAnimationFrame(draw);
}
