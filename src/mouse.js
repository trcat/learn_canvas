const canvas = document.getElementById("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.position = "fixed";
canvas.style.backgroundColor = "#000";
const ctx = canvas.getContext("2d");
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
const pathList = [];

// 声明路径 object
class PathObject {
  constructor() {
    this.positionX = innerWidth / 2; // 路径起点 x 位置
    this.positionY = innerHeight / 2; // 路径起点 y 位置
    this.lineWidth = 4; // 路径宽度
    this.strokeStyle = this.generateStrokeStyle(); // 路径颜色
    this.radian = Math.random() * Math.PI * 2; // 弧度
    this.speed = 0.02; // 每次刷新增加多少弧度， 通过该值来控制旋转速度
    this.radius = Math.random() * 150; // 围绕旋转圆的半径
  }
  /**
   * @return string 随机颜色色号
   */
  generateStrokeStyle() {
    const code = "0123456789ABCDEF";
    let result = "#";

    for (let i = 0; i < 6; i++) {
      result += code[Math.ceil(Math.random() * 15)];
    }

    return result;
  }
  draw(targetCtx, mouseObj) {
    // 记录当前位置
    const currentPosition = {
      x: this.positionX,
      y: this.positionY,
    };
    // 更新弧度
    this.radian += this.speed;
    // 更新 x 和 y 的位置
    this.positionX = mouseObj.x + Math.cos(this.radian) * this.radius;
    this.positionY = mouseObj.y + Math.sin(this.radian) * this.radius;

    // 画路径
    targetCtx.lineWidth = this.lineWidth;
    targetCtx.strokeStyle = this.strokeStyle;
    targetCtx.beginPath();
    targetCtx.moveTo(currentPosition.x, currentPosition.y);
    targetCtx.lineTo(this.positionX, this.positionY);
    targetCtx.stroke();
    targetCtx.closePath();
  }
}

// 监听鼠标位置
window.onmousemove = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

window.onload = () => {
  for (let i = 0; i < 100; i++) {
    pathList.push(new PathObject());
  }

  requestAnimationFrame(draw);
};

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  pathList.forEach((i) => i.draw(ctx, mouse));
  requestAnimationFrame(draw);
}
