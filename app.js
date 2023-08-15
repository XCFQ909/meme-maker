const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;


ctx.moveTo(100,100);
ctx.lineTo(200,100)
ctx.lineTo(200,200)
ctx.lineTo(100,200)
ctx.lineTo(100,100)
ctx.fill();

ctx.fillRect(200,200,100,100)

ctx.rect(300,300,100,100)
ctx.fill();
