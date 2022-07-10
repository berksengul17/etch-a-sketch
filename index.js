const container = document.querySelector(".container");

const range = document.querySelector("#range");
const rangeV = document.querySelector("#rangeV");
const setValue = () => {
    rangeV.innerText = `${range.value} x ${range.value}`;
}

document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener("input", setValue);

let mouseDown = false;
container.onmousedown = () => (mouseDown = true);
container.onmouseup = () => (mouseDown = false);

function draw(e){
    if(e.type === "mouseover" && !mouseDown) return;
    console.log(mouseDown);
    e.target.style.backgroundColor = "black";
}

// CREATE A GRID USING THE GIVEN ROWS AND COLUMNS 

function createGrid(rows, cols){
    container.style.setProperty("--grid-rows", rows);
    container.style.setProperty("--grid-cols", cols);

    for(let i=0; i<(rows*cols); i++){
        let cell = document.createElement("div");
        cell.addEventListener("mousedown", draw);
        cell.addEventListener("mouseover", draw);
        container.appendChild(cell).className = "grid-item";
    }
}

createGrid(16, 16);
