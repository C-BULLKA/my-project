document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const drawModeRadio = document.getElementById('drawMode');
    const eraseModeRadio = document.getElementById('eraseMode');
    const clearButton = document.getElementById('clearButton');

    // Set initial properties
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;
    ctx.globalCompositeOperation = 'source-over';

    // Fill canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Event listeners for controls
    colorPicker.addEventListener('change', (e) => {
        ctx.strokeStyle = e.target.value;
    });

    drawModeRadio.addEventListener('change', () => {
        ctx.globalCompositeOperation = 'source-over';
    });

    eraseModeRadio.addEventListener('change', () => {
        ctx.globalCompositeOperation = 'destination-out';
    });

    clearButton.addEventListener('click', () => {
        const originalComposite = ctx.globalCompositeOperation;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = originalComposite;
    });

    // Function to get mouse position
    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    // Drawing event handlers
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const pos = getMousePos(canvas, e);
        lastX = pos.x;
        lastY = pos.y;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const pos = getMousePos(canvas, e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });
});