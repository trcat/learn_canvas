const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;

function init() {
  ctx.save();

  ctx.translate(150, 150);
  ctx.rotate(-(Math.PI / 2));
  ctx.lineCap = "round";

  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(-150, -150, canvas.width, canvas.height);
  drawClockDial();
  drawNeedle();
  window.requestAnimationFrame(draw);
}

// 画表盘
function drawClockDial() {
  ctx.save();

  // 蓝环
  ctx.beginPath();
  ctx.arc(0, 0, 122, 0, Math.PI * 2, true);
  ctx.strokeStyle = "#325fa2";
  ctx.lineWidth = 7;
  ctx.stroke();

  // 刻度
  for (let i = 0; i < 60; i++) {
    i > 0 && ctx.rotate((Math.PI * 2) / 60);
    ctx.strokeStyle = "#000";
    ctx.lineCap = "round";
    ctx.beginPath();
    if (i % 5 === 0) {
      ctx.lineWidth = 5;
      ctx.moveTo(90, 0);
      ctx.lineTo(105, 0);
    } else {
      ctx.lineWidth = 2;
      ctx.moveTo(100, 0);
      ctx.lineTo(105, 0);
    }
    ctx.stroke();
  }

  ctx.restore();
}

// 指针动画
function drawNeedle() {
  const time = new Date();

  // 时针
  ctx.save();
  let hour = time.getHours();
  hour > 12 && (hour -= 12);
  ctx.rotate(((Math.PI * 2) / 12) * hour);
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.moveTo(-10, 0);
  ctx.lineTo(50, 0);
  ctx.stroke();
  ctx.restore();

  // 分钟
  ctx.save()
  ctx.rotate(((Math.PI * 2) / 60) * time.getMinutes());
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(-10, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // 秒针
  ctx.save();
  ctx.rotate(((Math.PI * 2) / 60) * time.getSeconds());
  ctx.fillStyle = "red";
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(73, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(80, 0, 7, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.restore();
}
