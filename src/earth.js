var sun = new Image();
var moon = new Image();
var earth = new Image();
function init() {
  // 准备图片素材
  sun.src = "https://mdn.mozillademos.org/files/1456/Canvas_sun.png";
  moon.src = "https://mdn.mozillademos.org/files/1443/Canvas_moon.png";
  earth.src = "https://mdn.mozillademos.org/files/1429/Canvas_earth.png";
  document.getElementById("canvas").width = 300;
  document.getElementById("canvas").height = 300;
  // 初次执行动画
  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");

  ctx.globalCompositeOperation = "destination-over"; // 先绘永远在后绘前面
  ctx.clearRect(0, 0, 300, 300); // clear canvas

  ctx.fillStyle = "rgba(0,0,0,0.4)"; // 黑色，40% 透明度
  ctx.strokeStyle = "rgba(0,153,255,0.4)"; // 蓝色，40% 透明度
  ctx.save(); // 保存当前状态
  ctx.translate(150, 150); // 移动坐标原点至画布中心位置

  // Earth 旋转速度和时间秒数毫秒匹配
  var time = new Date(); // 获取当前时间
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds()
  ); // 让地球的旋转角度根据当前秒数和毫秒数匹配
  ctx.translate(105, 0); // 右移 105，当作地球中心
  ctx.fillRect(0, -12, 50, 24); // Shadow 创建一个矩形，充当背光阴影
  ctx.drawImage(earth, -12, -12); // 使用地球图片，并移动到合适位置， 让shadow 刚好为地球的一半

  // Moon
  ctx.save(); // 保存当前位置
  ctx.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
      ((2 * Math.PI) / 6000) * time.getMilliseconds()
  ); // 让月球的旋转角度根据当前秒数和毫秒数匹配
  ctx.translate(0, 28.5); // 下移 28.5 当作月球的中心
  ctx.drawImage(moon, -3.5, -3.5); // 使用月球图片，并移动到合适位置，保证始终有机会被阴影覆盖
  ctx.restore(); // 恢复上一步状态，原点在 150，150

  ctx.restore(); // 恢复上一步状态，原点在 0， 0

  ctx.beginPath();
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit 画一个蓝色的圆形轮廓
  ctx.stroke();

  ctx.drawImage(sun, 0, 0, 300, 300); // 使用太阳图片，并设定长宽为300

  window.requestAnimationFrame(draw);
}
