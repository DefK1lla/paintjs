const canvas = document.getElementById('jsCanvas'),
    ctx = canvas.getContext('2d'),
    colors = document.getElementsByClassName('jsColor'),
    range = document.getElementById('jsRange');

canvas.height = 700;
canvas.width = 700;

ctx.lineWidth = 2.5;
ctx.strokeStyle = '#2c2c2c';

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true
}

function onMouseMove(event) {
    x = event.offsetX;
    y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}


function handleColorClick(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if (range) {
    range.addEventListener('input', handleRangeChange);
}