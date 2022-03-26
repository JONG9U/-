const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const reset = document.getElementById("Reset");
const save = document.getElementById("jsSave")
const eraser = document.getElementById("Eraser");
const INITIAL_COLOR = "#2c2c2";
const CANVAS_SIZE = 700;

const { width, height } = canvas.getBoundingClientRect();
canvas.width = width;
canvas.height = height;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//기본 설정값
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle= INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWith=5.0;


let painting =false;
let filling =false;


function stopPainting() {
    painting=false;
}


function starPainting() {
    painting=true;
}

// 컨버스 안의 좌표 구하기
function onMouseMove(event) {
   const x = event.offsetX;
   const y = event.offsetY;
   if (!painting) {
       ctx.beginPath();
       ctx.moveTo(x,y);
   }else{
       ctx.lineTo(x,y);
       ctx.stroke()
   }
}

// 붓 크기 조절
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
  }
// 색상 변경
function handleColorClick(event) {
    const color =event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
// 색채우기 모드, 연필 모드
function handleModeClick(event) {
    if (filling === true) {
        filling = false
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick() {
    if (filling) {
         ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}
// 리셋시키기
function handleResetClick() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    }
   
    // 이미지 도용 금지
function handleCM(event) {
    event.preventDefault();
}

// 사진 저장
function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download ="PaintJS";
    link.click();
}
    //지우개
function handleEraserClick() {
  ctx.strokeStyle = "white";
}

if (canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", starPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color =>color.addEventListener("click",handleColorClick));

if (range) {
    range.addEventListener("input",handleRangeChange);
}

if (mode) {
    mode.addEventListener("click",handleModeClick);
}

if(reset) {
    reset.addEventListener("click", handleResetClick);
    }

    if (save) {
        save.addEventListener("click", handleSaveClick);
    }

    if (eraser) {
        eraser.addEventListener("click",handleEraserClick)
    }