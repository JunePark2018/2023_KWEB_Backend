// Canvas Ready...
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let revisedMouseX = 0, revisedMouseY = 0, revisedSize = 0;

// Canvas Size
function ResizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => { ResizeCanvas(); Draw(); }, false);

// Zoom
let scroll = 0;
let xOffset = 0, yOffset = 0;
canvas.addEventListener("mousewheel", function (e) {
    const zoomDelta = 0.03;
    if (0 > e.wheelDelta) scroll -= zoomDelta; else scroll += zoomDelta;
    revisedSize = 30 * Math.pow(10, scroll);
    Draw();
})

// Position Transition
let isNodeClicked = false, isCanvasClicked = false;
let clickedNode;
canvas.addEventListener("mousedown", function (e) {
    for (const node of Nodes) {
        if (Math.sqrt(Math.pow(node.revisedX - e.clientX, 2) + Math.pow(node.revisedY - e.clientY, 2)) <= revisedSize) {
            isNodeClicked = true;
            clickedNode = node;
        }
    }
    isCanvasClicked = true;
});
canvas.addEventListener("mouseup", function (e) {
    isCanvasClicked = false;
    isNodeClicked = false;
});
canvas.addEventListener("mousemove", function (e) {
    if (isNodeClicked) {
        clickedNode.x += e.movementX / Math.pow(10, scroll);
        clickedNode.y += e.movementY / Math.pow(10, scroll);
        Draw();
    } else if (isCanvasClicked) {
        xOffset += e.movementX;
        yOffset += e.movementY;
        Draw();
    }
});

// Draw
function Draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const node of Nodes)
        UpdatePosition(node);
    for (const node of Nodes)
        DrawArrow(node);
    for (const node of Nodes)
        DrawNode(node);
}

function UpdatePosition(node) {
    node.revisedX = node.x * Math.pow(10, scroll) + xOffset;
    node.revisedY = node.y * Math.pow(10, scroll) + yOffset;
}

function DrawArrow(node) {
    const revisedSize = 30 * Math.pow(10, scroll);
    ctx.lineWidth = 10* Math.pow(10, scroll);
    for (const adjNode of node.child) {
        let arrVec = [adjNode.revisedX - node.revisedX, adjNode.revisedY - node.revisedY];
        let magnitude = Math.sqrt(Math.pow(arrVec[0], 2) + Math.pow(arrVec[1], 2));
        let normalizedArrVec = [arrVec[0] / magnitude / 5, arrVec[1] / magnitude / 5];
        ctx.beginPath();
        ctx.moveTo(node.revisedX + normalizedArrVec[1] * revisedSize, node.revisedY - normalizedArrVec[0] * revisedSize);
        ctx.lineTo(node.revisedX - normalizedArrVec[1] * revisedSize, node.revisedY + normalizedArrVec[0] * revisedSize);
        ctx.lineTo(adjNode.revisedX, adjNode.revisedY);
        ctx.fillStyle = 'grey';
        ctx.fill();
        ctx.closePath();
    }
}

function DrawNode(node) {
    const revisedSize = 30 * Math.pow(10, scroll);
    
    ctx.beginPath();

    ctx.arc(node.revisedX, node.revisedY, revisedSize, 0, 2*Math.PI, true);
    ctx.lineWidth = 10 * Math.pow(10, scroll);
    ctx.stroke();
    ctx.fillStyle = 'pink';
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.round(revisedSize)}px Arial`;
    ctx.fillText(node.char, node.revisedX, node.revisedY);

    ctx.closePath();
} 
    

// 후손 많은 순으로 정렬 (가장 많이 쓰인 글자 순으로 정렬)

function SearchDescendant (node) {
    if (node.child.length === 0)
        return 0;
    else {
        let count = node.child.length;
        for (const child of node.child) {
            count += SearchDescendant(child);
        }
        return count;
    }
}

// 후손 세대 수가 많은 순으로 정렬
function CountGeneration(node) {
    if (node.child.length === 0)
        return 0;
    else {
        let max = 1;
        for (const child of node.child) {
            let val = max + CountGeneration(child);
            if (max < val) max = val;
        }
        return max;
    }
}

// 정렬한 대로 위치 선정

Nodes.sort((a, b) => CountGeneration(b) - CountGeneration(a));
for (let i = 0; i < Nodes.length; i++) {
    Nodes[i].x = Math.floor(Math.random() * window.innerWidth);
    Nodes[i].y = window.innerHeight - CountGeneration(Nodes[i]) * 200;
}

ResizeCanvas();
Draw();   
