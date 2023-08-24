const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById('line-width');
const color = document.getElementById('color');
const modeBtn = document.getElementById('mode-btn');
const destroyBtn = document.getElementById('destroy-btn');
const eraserBtn = document.getElementById('eraser-btn');
const fileInput = document.getElementById('file');
const textInput = document.getElementById('text');
const saveBtn = document.getElementById("save");
const fillBtn = document.getElementById("fill-btn");
const drawBtn = document.getElementById("draw-btn");
const paintBtn = document.getElementById("paint-btn");
const fontFamilyInput = document.getElementById("font-select");
const fontSizeInput = document.getElementById("fontSizes");
const textStrokeBtn = document.getElementById("stroke-text-button");
const textFillBtn = document.getElementById("fill-text-button");
canvas.width = 600;
canvas.height = 600;
ctx.lineWidth = lineWidth.value;
let isDrawing = false;
let isFilling = false;
let isPainting = false;
let textStroking = false;
let fontFamily = "Arial";
let fontSize = "25";

// 선 그리기
//  + Paint 작업
function onMove(event) {
    if (isFilling) {}
    else if (isPainting && isDrawing) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.fill();
        return;
    }
    else if(isDrawing) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
    isDrawing = true;
}

function cancelPainting() {
    isDrawing = false;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);





// 선 굵기

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

lineWidth.addEventListener("change", onLineWidthChange)

// 선 색상 #1

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
    localStorage.setItem("currentColor", event.target.value)
}

color.addEventListener("change", onColorChange)

// 선 색상 #2

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    localStorage.setItem("currentColor", colorValue)
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

colorOptions.forEach((colorOption) => colorOption.addEventListener("click", onColorClick))

// 그림판 전체 색상


function onCanvasClick() {
    if (isFilling) {
        ctx.fillRect(0,0, canvas.width, canvas.height)
    }
}


canvas.addEventListener("click", onCanvasClick)

// 전체 지우개

function onDestroyClick() {
    if(window.confirm("확인을 누르면 모든 작업이 삭제됩니다.")) {
        ctx.fillStyle = "white";
        ctx.fillRect(0,0, canvas.width, canvas.height); 
    }

}

destroyBtn.addEventListener("click", onDestroyClick);

// 부분 지우개 (하얀 선 그리기)

function onEraseClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    isPainting = false;
    modeBtn.innerText = "Erasing Mode"
}

eraserBtn.addEventListener("click", onEraseClick);

// draw버튼, fill 버튼 추가 P.S. Paint버튼

function onDrawBtnClick() {
    colorNow = localStorage.getItem("currentColor")
    isFilling = false;
    isPainting = false;
    ctx.strokeStyle = colorNow;    
    modeBtn.innerText = "Drawing Mode"
}

function onFillBtnClick() {
    isFilling = true;
    isPainting = false;
    modeBtn.innerText = "Filling Mode"
}

function onPaintModeClick() {
    isPainting = true;
    isFilling = false;
    modeBtn.innerText = "Painting Mode"
}

paintBtn.addEventListener("click", onPaintModeClick)
drawBtn.addEventListener("click", onDrawBtnClick)
fillBtn.addEventListener("click", onFillBtnClick)
//밈 만들기

// 이미지 추가

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        fileInput.value = null;
    };
}

fileInput.addEventListener("change", onFileChange);

// 텍스트 추가

function textAdd(event) {
    const text = textInput.value;
    if (text !== "" && textStroking === false) {
        ctx.save();
        ctx.fillStyle = localStorage.getItem("currentColor")
        ctx.strokeStyle = localStorage.getItem("currentColor")
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    } else if (text !== "" && textStroking) {
        ctx.save();
        ctx.fillStyle = localStorage.getItem("currentColor")
        ctx.strokeStyle = localStorage.getItem("currentColor")
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.strokeText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

canvas.addEventListener("dblclick", textAdd);

// 만든 이미지 저장하기

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

saveBtn.addEventListener("click", onSaveClick);

// 텍스트에 Feature 추가 section
// 1. stroke Text 버튼, Fill text 버튼

function onTextStrokeClick() {
    textStrokeBtn.style.backgroundColor = "royalblue";
    textFillBtn.style.backgroundColor = "#8FA3DF";
    textStroking = true;
}

textStrokeBtn.addEventListener("click", onTextStrokeClick)

function onTextFillClick() {
    textStrokeBtn.style.backgroundColor = "#8FA3DF";
    textFillBtn.style.backgroundColor = "royalblue";
    textStroking = false;
}

textFillBtn.addEventListener("click", onTextFillClick)

// font Family, Font size input가 변할 때마다 저장

function fontFamilyChange(event) {
    fontFamily = event.target.value;
    console.log(fontFamily);
}
function fontSizeChange(event) {
    fontSize = event.target.value;
    console.log(fontSize);
}

fontFamilyInput.addEventListener("change", fontFamilyChange)
fontSizeInput.addEventListener("change", fontSizeChange)

// 씨바 이거 왜 안 되냐