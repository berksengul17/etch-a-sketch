const DEFAULT_COLOR = "#000000";
const ERASER_COLOR = "#ffffff";
const DEFAULT_MODE = "Plain Color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

const colorPicker = document.querySelector(".color-picker");
const plainColorBtn = document.querySelector("#plain-color");
const rainbowBtn = document.querySelector("#rainbow");
const eraserBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");

colorPicker.addEventListener("input", (e) => {
    setColor(colorPicker.value);
})

plainColorBtn.addEventListener("click", (e) => {
    setMode("Plain Color");
});

rainbowBtn.addEventListener("click", (e) => {
    setMode("Rainbow");
});

eraserBtn.addEventListener("click", (e) => {
    setColor(ERASER_COLOR);
    setMode("Eraser");
})
clearBtn.addEventListener("click", clearGrid);

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
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// UTILITY FUNCTIONS

function setMode(newMode){
    activateButton(newMode);
    currentMode = newMode;
    console.log(currentMode);
}

function setColor(newColor){
    currentColor = newColor;
    console.log(currentColor);
}

function activateButton(newMode){
    if(currentMode == "Plain Color"){
        plainColorBtn.classList.remove("active");
    } else if(currentMode == "Rainbow"){
        rainbowBtn.classList.remove("active");
    } else if(currentMode == "Eraser"){
        eraserBtn.classList.remove("active")
    }

    if(newMode == "Plain Color"){
        plainColorBtn.classList.add("active");
    } else if(newMode == "Rainbow"){
        rainbowBtn.classList.add("active");
    } else if(newMode == "Eraser"){
        eraserBtn.classList.add("active")
    }
}

function getRandomRGB(){
    let randomR = Math.round(Math.random() * 255);
    let randomG = Math.round(Math.random() * 255);
    let randomB = Math.round(Math.random() * 255);

    return `rgb(${randomR}, ${randomG}, ${randomB})`
}

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

// MAIN FUNCTIONS

function draw(e){
    if(e.type === 'mouseover' && !mouseDown) return;

    if(currentMode == "Plain Color"){
        e.target.style.backgroundColor = currentColor;
    } else if(currentMode == "Rainbow"){
        e.target.style.backgroundColor = getRandomRGB();
    } else if(currentMode == "Eraser"){
        e.target.style.backgroundColor = ERASER_COLOR;
    }
}

function createGrid(size){
    container.style.setProperty("--grid-rows", size);
    container.style.setProperty("--grid-cols", size);

    for(let i=0; i<(size*size); i++){
        let cell = document.createElement("div");
        cell.addEventListener("mouseover", draw);
        cell.addEventListener("mousedown", draw);
        container.appendChild(cell).className = "grid-item";
    }
}

function clearGrid(){
    if(!mouseDown){
        let children = container.children;
        for(let i=0; i<children.length; i++){
            let child = children[i];
            child.style.backgroundColor = "white";
        }
    }
}

function createNewGrid(rangeValue){
    clearGrid();
    createGrid(rangeValue, rangeValue);
}

createGrid(DEFAULT_SIZE);
activateButton(DEFAULT_MODE);