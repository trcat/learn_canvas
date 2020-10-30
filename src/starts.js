const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.position = "fixed";

const ctx = canvas.getContext("2d");
var linearColor = ctx.createLinearGradient(0, 0, 0, canvas.height);
linearColor.addColorStop(0, "#232256");
linearColor.addColorStop(1, "#143778");
ctx.fillStyle = linearColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i < 250; i++) {
  ctx.save();
  ctx.fillStyle = "#fff";
  ctx.translate(
    canvas.width - Math.floor(Math.random() * canvas.width),
    canvas.height - Math.floor(Math.random() * canvas.height)
  );
  drawStart(ctx, Math.floor(Math.random() * 4) + 2);
  ctx.restore();
}

function drawStart(ctx, r) {
  ctx.save();

  ctx.beginPath();
  ctx.moveTo(r, 0);
  for (var i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5);
    if (i % 2 == 0) {
      ctx.lineTo((r / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(r, 0);
    }
  }
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
