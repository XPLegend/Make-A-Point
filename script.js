//NON IN USO - REDUNDAND CODE, NOT IN USE
document.addEventListener("DOMContentLoaded", () => {
    //seleziona la div esistente per mostrare la posizione del mouse
    const mousePositionDiv = document.getElementById("mouse-position");
    const xParagraph = document.getElementById("x");
    const yParagraph = document.getElementById("y");

    if (!mousePositionDiv || !xParagraph || !yParagraph) {
        console.error("Elemento con ID 'mouse-position' non trovato.");
        return;
    }

    //funzione per aggiornare la posizione del mouse
    document.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        xParagraph.textContent = `X: ${clientX}`;
        yParagraph.textContent = `Y: ${clientY}`;
    });
});
//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//

//crea array coi bottoni e aggiungi listener per il colore
let divColor = "blueviolet";  //default color

const buttons = document.querySelectorAll(".color-button");
buttons.forEach(button => {
    button.addEventListener("click", function () {
        const newColor = button.getAttribute("data-color");  
        divColor = newColor;
})});

//esplicita coordinate mouse per universalizzarle e mostrale nella specifica box in nav
let mouseX = 0;
let mouseY = 0;

document.getElementById("drawing-box").addEventListener("mousemove", (event) => {
    //ottenere posizione relativa alla div
    let box = event.currentTarget;    //permette di selezionare solo le coordinate nella div
    let boxRect = box.getBoundingClientRect();   //ottiene le coordinate del punto nella div
    mouseX = event.clientX - boxRect.left;
    mouseY = event.clientY - boxRect.top;

    document.getElementById("x-coords").innerText = `x:${mouseX}`;
    document.getElementById("y-coords").innerText = `y:${mouseY - 10}`;
});

//creare switch per selezionare modalità di disegno o eliminazione

//modalità default = disegna
let mode = "draw";

const modeButtons = document.querySelectorAll(".draw-erase");
modeButtons.forEach(button => { button.addEventListener("click", function () {mode = button.getAttribute("data-mode")})});

document.getElementById("drawing-box").addEventListener("click", function (event) {
   //ottenere posizione relativa alla div
   let box = event.currentTarget;  //permette di selezionare solo le coordinate nella div

   //crea la figura
   let figure = document.createElement("div");
   figure.classList.add("figura");

    figure.style.left = `${mouseX}px`;
    figure.style.top = `${mouseY}px`;
    figure.style.backgroundColor = divColor;
    
   //spawna la figura
   box.appendChild(figure);
});

//scurisce il colore
function darkenColor(rgb, percent) {
    let [r, g, b] = rgb.match(/\d+/g).map(Number);
    r = Math.max(0, r - (r * percent / 100));
    g = Math.max(0, g - (g * percent / 100));
    b = Math.max(0, b - (b * percent / 100));
    return `rgb(${r}, ${g}, ${b})`;
}

//effetto ottico mouse hover
document.querySelector("nav").addEventListener("mouseover", function (event) {
   let btn = event.target;  //ottiene il target
   //controlla se è un <button>
   if( btn.tagName === "BUTTON") {
    //ottieni e immagazzina colore originale
    let originalColor = getComputedStyle(btn).backgroundColor;
    btn.dataset.originalColor = originalColor;
    
    //cambia colore
    btn.style.backgroundColor = darkenColor(originalColor, 10);
}});

//ripristina colore
document.querySelector("nav").addEventListener("mouseout", function(event) {
    let btn = event.target;
    if (btn.tagName === "BUTTON" && btn.dataset.originalColor) {
        btn.style.backgroundColor = btn.dataset.originalColor; // Ripristina il colore originale
    }
});
