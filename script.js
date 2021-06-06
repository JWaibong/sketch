const container = document.querySelector("#container");
setGrid(16);

const header = document.querySelector("h1");
const btn = document.createElement("button");
btn.textContent = "Clear Grid";
btn.addEventListener("click", function(e){
    const blackBoxes = document.querySelectorAll(".colored");
    blackBoxes.forEach(blackBox => {
        blackBox.setAttribute("class", "white");
    });
    let dimension = window.prompt("Grid dimensions (x by x)?: ");

    setGrid(parseInt(dimension));
});
header.appendChild(btn);

function setGrid(dimension){
    if(dimension > 0 && Number.isInteger(dimension)){
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
        box.setAttribute("id", "box"+i);
        box.setAttribute("class", "white");
        container.appendChild(box);
    
        document.querySelector(id).addEventListener("mouseenter", function(e){
            document.querySelector(id).setAttribute("class", "colored");
            let color1 = Math.floor(Math.random() * 256);
            let color2 = Math.floor(Math.random() * 256);
            let color3 = Math.floor(Math.random() * 256);
            document.querySelector(id).style.cssText = `
            background-color: rgb(${color1}, ${color2}, ${color3});
            `;
        });
    }
    }
    else{
        window.alert("Invalid Dimension. Positive Integers Only.");
    }
};
function filterInt(value) {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
      return Number(value);
    } else {
      return NaN;
    }
  }