const canvas = document.getElementById("canvas");
canvas.width = 300;
canvas.height = 227;
const canvas2 = document.getElementById("canvas2");
canvas2.width = 200;
canvas2.height = 200;
const img = new Image();
img.src = "./rhino.jpg";
let ctx;

function init() {
  ctx = canvas.getContext("2d");
  ctx2 = canvas2.getContext("2d");
  ctx.drawImage(img, 0, 0);
}

canvas.addEventListener("mousemove", function (e) {
  const x = e.offsetX - 10;
  const y = e.offsetY - 10;

  ctx2.drawImage(
    canvas,
    Math.abs(x - 20),
    Math.abs(y - 20),
    40,
    40,
    0,
    0,
    canvas2.width,
    canvas2.height
  );
  
});
