const container = document.querySelector(".container");
const range = document.querySelector("#range");
const rangeV = document.querySelector("#rangeV");

document.addEventListener("DOMContentLoaded", handleInputChange);
range.addEventListener("input", handleInputChange);
range.addEventListener("mouseup", (e) => {
    createNewGrid(range.value);
});

// Track mouse state

let mouseDown = false;
container.onmousedown = () => (mouseDown = true);
container.onmouseup = () => (mouseDown = false);

// UTILITY FUNCTIONS

function handleInputChange(e){
    if(e.target.type == "range"){
        const target = e.target;
        const min = target.min;
        const max = target.max;
        const val = target.value;
    
        target.style.backgroundSize = (val - min) * 100 / (max - min) + "100%";

        rangeV.innerText = `${range.value} x ${range.value}`;
    }
}

function draw(e){
    if(e.type === "mouseover" && !mouseDown) return;

    e.target.style.backgroundColor = "black";
}

// Create a grid using the given row and column value 

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

// Clear the current grid and create a
// new grid using the range value

function createNewGrid(rangeValue){
    if(!mouseDown){
        let children = container.children;
        for(let i=0; i<children.length; i++){
            let child = children[i];
            child.style.backgroundColor = "white";
        }

        createGrid(rangeValue, rangeValue);
    }
}

createGrid(16, 16);