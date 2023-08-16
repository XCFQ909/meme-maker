const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;


ctx.fillRect(210 - 40, 170, 15, 200);
ctx.fillRect(350 - 40, 170, 15, 200);
ctx.fillRect(260 - 40, 170, 60, 200);

ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "white";
ctx.arc(250 - 20, 95, 8, 0, Math.PI);
ctx.arc(250 + 20, 95, 8, 0, Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(220,400, 15,200);
ctx.fillRect(235 + 40,400, 15,200);
