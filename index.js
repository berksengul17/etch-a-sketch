const container = document.querySelector(".container");

document.body.addEventListener("click", (e) => {
    if(e.target.className == "grid-item"){
        e.target.style.backgroundColor = "black";
    } 
    else{
        console.log("Outside grid item");
    }
})


function createGrid(rows, cols){
    container.style.setProperty("--grid-rows", rows);
    container.style.setProperty("--grid-cols", cols);

    for(let i=0; i<(rows*cols); i++){
        let cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item";
    }
}

createGrid(16, 16);
