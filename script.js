const container = document.querySelector("#container");
setGrid(4);

const header = document.querySelector("h1");
const clear = document.createElement("button");
clear.textContent = "Clear Grid";
clear.addEventListener("click", function(e){
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        container.removeChild(box);
    });
    let dimension = window.prompt("Grid dimensions (x by x)?: ");

    setGrid(parseInt(dimension));
});
header.appendChild(clear);

var allowDrawOver = true;
const drawOver = document.createElement("button");
drawOver.textContent = "Toggle Draw Over";
drawOver.addEventListener("click", function(e){
    allowDrawOver = !allowDrawOver;
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => {
        let toggleDrawOver = new Event("toggleDrawOver");
        box.dispatchEvent(toggleDrawOver);
    });
});


header.appendChild(drawOver);

function setGrid(dimension){
    if(dimension > 0 && Number.isInteger(dimension)){
    initializeBoxes(dimension);
    }
    else{
        window.alert("Invalid Dimension. Positive Integers Only.");
    }
};

function initializeBoxes(dimension){
    let box;
    container.style.cssText = `
    height: 960px; 
    width: 960px;
    display: grid;
    grid-template-columns: repeat(${dimension}, 1fr);
    grid-template-rows: repeat(${dimension}, 1fr);
    `;
    for(let i=0; i < dimension * dimension; i++){
        let id = "#box" + i
        box = document.createElement("div");
        box.classList.add("box");
        box.setAttribute("id", "box"+i);
        box.addEventListener("mouseenter", color);
        box.addEventListener("toggleDrawOver", function(e){
            const boxes = document.querySelectorAll(".box");
            if(allowDrawOver){
                console.log("on");
                boxes.forEach(elem => {
                    elem.removeEventListener("mouseenter",color);
                    elem.addEventListener("mouseenter", color);
                });
            }
            else{
                console.log("off");
                boxes.forEach(elem => {
                    elem.removeEventListener("mouseenter",color);
                });
            }
        });
        container.appendChild(box);
    }
}
function color(e){
    let color1 = Math.floor(Math.random() * 256);
    let color2 = Math.floor(Math.random() * 256);
    let color3 = Math.floor(Math.random() * 256);
    e.target.classList.add("colored")
    e.target.style.cssText = `background-color: rgb(${color1}, ${color2}, ${color3});`;
};
function filterInt(value){
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
      return Number(value);
    } 
    else {
      return NaN;
    }
};
