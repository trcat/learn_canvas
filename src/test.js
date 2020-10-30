var cn;
//= document.getElementById('cw');
var c;
var u = 10;
// 存放鼠标位置
const m = {
    x: innerWidth / 2,
    y: innerHeight / 2
};
// 监听鼠标位置
window.onmousemove = function(e) {
    m.x = e.clientX;
    m.y = e.clientY;

}
// 获取颜色
function gc() {
    var s = "0123456789ABCDEF";
    var c = "#";
    for (var i = 0; i < 6; i++) {
        c += s[Math.ceil(Math.random() * 15)]
    }
    return c
}
var a = [];
window.onload = function myfunction() {
    cn = document.getElementById('canvas');
    cn.width = innerWidth;
    cn.height = innerHeight;
    cn.style.position = "fixed";
    c = cn.getContext('2d');

    for (var i = 0; i < 10; i++) {
        var r = 30;
        var x = Math.random() * (innerWidth - 2 * r) + r;
        var y = Math.random() * (innerHeight - 2 * r) + r;
        var t = new ob(innerWidth / 2,innerHeight / 2,5,"red",Math.random() * 200 + 20,2);
        a.push(t);
    }
    //cn.style.backgroundColor = "#700bc8";

    c.lineWidth = "2";
    c.globalAlpha = 0.5;
    resize();
    anim()
}
window.onresize = function() {

    resize();

}
function resize() {
    cn.height = innerHeight;
    cn.width = innerWidth;
    for (var i = 0; i < 101; i++) {
        var r = 30;
        var x = Math.random() * (innerWidth - 2 * r) + r;
        var y = Math.random() * (innerHeight - 2 * r) + r;
        a[i] = new ob(innerWidth / 2,innerHeight / 2,4,gc(),Math.random() * 200 + 20,0.02);

    }
    //  a[0] = new ob(innerWidth / 2, innerHeight / 2, 40, "red", 0.05, 0.05);
    //a[0].dr();
}
/**
 * 创建颜色路径
 * @param {*} x 初始 x 位置
 * @param {*} y 初始 y 位置
 * @param {*} r 路径宽度
 * @param {*} cc 路径颜色
 * @param {*} o 
 * @param {*} s 弧度值，旋转速度
 */
function ob(x, y, r, cc, o, s) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.cc = cc;
    this.theta = Math.random() * Math.PI * 2; // 任意弧度
    this.s = s;
    this.o = o;
    this.t = Math.random() * 150; // 0-150 随机数， 确定任意圆半径

    this.o = o;
    this.dr = function() {
        const ls = {
            x: this.x,
            y: this.y
        };
        this.theta += this.s; // 每次呼叫 dr 就添加 s 个弧度
        this.x = m.x + Math.cos(this.theta) * this.t; // 设定 x 的位置，鼠标 x 位置 + 任意长度任意圆弧的 x 位置
        this.y = m.y + Math.sin(this.theta) * this.t; // 设定 y 的位置，鼠标 y 位置 + 任意长度任意圆弧的 y 位置
        c.beginPath();
        c.lineWidth = this.r;
        c.strokeStyle = this.cc;
        c.moveTo(ls.x, ls.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();

    }
}
function anim() {
    c.fillStyle = "rgba(0,0,0,0.05)";
    c.fillRect(0, 0, cn.width, cn.height);
    a.forEach(function(e, i) {
        e.dr();
    });
    requestAnimationFrame(anim);
}