const INITIAL_COLOR = '#2c2c2c',
    CANVAS_SIZE = 700;

const canvas = document.getElementById('jsCanvas'),
    ctx = canvas.getContext('2d'),
    colors = document.getElementsByClassName('jsColor'),
    range = document.getElementById('jsRange'),
    modeBtn = document.getElementById('jsMode'),
    saveBtn = document.getElementById('jsSave');

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false,
    filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true
}

function onMouseMove(event) {
    x = event.offsetX;
    y = event.offsetY;

    if (painting && !filling) {
        ctx.lineTo(x, y);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function onMouseDown(event) {
    painting = true;
}

function handleCanvasClick(event) {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleColorClick(event) {
    let color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
}

function handleModeClick(event) {
    if (filling) {
        filling = false;
        event.target.textContent = 'Заливка';
    } else {
        filling = true;
        event.target.textContent = 'Рисование';
    }
}

function handleSaveClick(event) {
    let image = canvas.toDataURL(),
        link = document.createElement('a');

    link.href = image;
    link.download = 'Безымянный';
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', (event) => event.preventDefault());
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if (range) {
    range.addEventListener('input', handleRangeChange);
}

if (modeBtn) {
    modeBtn.addEventListener('click', handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
}