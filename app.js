const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById('line-width')
const color = document.getElementById('color')
const modeBtn = document.getElementById('mode-btn')
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;

// 선 그리기

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

// 선 굵기

function onLineWidthChange(event) {
    ctx.beginPath();
    ctx.lineWidth = event.target.value;
}

lineWidth.addEventListener("change", onLineWidthChange)

// 선 색상 #1

function onColorChange(event) {
    ctx.beginPath();
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

color.addEventListener("change", onColorChange)

// 선 색상 #2

function onColorClick(event) {
    ctx.beginPath();
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

colorOptions.forEach((colorOption) => colorOption.addEventListener("click", onColorClick))

// 그림판 전체 색상

function onModeClick() {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0,0, canvas.width, canvas.height)
    }
}

modeBtn.addEventListener("click", onModeClick)
canvas.addEventListener("click", onCanvasClick)