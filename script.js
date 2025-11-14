// SEZIONE GENERALI --------------------------------------------------------------------------------------------------//
// COMMON SECTION ----------------------------------------------------------------------------------------------------//
//definisce la zona da disegno
const box = document.getElementById("drawing-box");

//esplicita coordinate mouse per universalizzarle e mostrale nella specifica box in nav
let mouseX = 0;
let mouseY = 0;

document.getElementById("drawing-box").addEventListener("mousemove", (event) => {
    //ottenere posizione relativa alla div
    let box = event.currentTarget;    //permette di selezionare solo le coordinate nella div
    let boxRect = box.getBoundingClientRect();   //ottiene le coordinate del punto nella div
    mouseX = Math.round(event.clientX);
    mouseY = Math.round(event.clientY);

    //Debug - con il border della DIV palette succedono bug di puntamento
    let mousePositionX = mouseX - Math.round(boxRect.left);

    if (mousePositionX >= 0) {
        document.getElementById("x-coords").innerText = `x:${mousePositionX}`;
        document.getElementById("y-coords").innerText = `y:${mouseY - Math.round(boxRect.top)}`;
    } else {
        document.getElementById("x-coords").innerText = `x:${0}`;
        document.getElementById("y-coords").innerText = `y:${mouseY - Math.round(boxRect.top)}`;
}});

// SELETTORE STRUMENTO -----------------------------------------------------------------------------------------------//
// TOOL SELECTOR -----------------------------------------------------------------------------------------------------//

//creare switch per selezionare modalità di disegno o eliminazione - modalità default = disegna
let mode = "pen";

document.querySelectorAll(".draw-erase").forEach(button => {
    button.addEventListener("click", function () {
        mode = button.getAttribute("data-mode");
        console.log("Current mode:", mode);  //debug
    });
});

//dichiara default di draw = false
let draw = false;
//dichiara listener per mousedown ESCLUSIVO in modalità pen e reset per tutti gli altri casi
box.addEventListener("mousedown", ()=> {if(mode === "pen") draw = true});
box.addEventListener("mouseup", ()=> draw = false);
box.addEventListener("mouseleave", ()=> draw = false);

//switch mode pen
box.addEventListener("mousemove", (event)=>{
    switch (mode) {
        case "pen":
            if (draw) {
                //dichiara la singolarità della scia
                const dot = document.createElement("div");
                //caratteristiche della striscia
                dot.style.position = "absolute";
                dot.style.width = "4px";
                dot.style.height = "4px";
                dot.style.borderRadius = "50%";
                dot.style.background = divColor;
                dot.style.top = `${mouseY}px`;
                dot.style.left = `${mouseX}px`;
                //display sullo schermo
                box.appendChild(dot)}
            break}});

box.addEventListener("click", (event) => {
    switch(mode) {
    case "circle":
        //dichiara figura default
        const circle = document.createElement("div");
        //definisci parametri circle
        circle.classList.add("cerchio"); //prende i parametri dalla classe dichiarata in CSS
        circle.style.left = `${mouseX}px`;
        circle.style.top = `${mouseY}px`;
        circle.style.backgroundColor = divColor;
        //display sullo schermo
        box.appendChild(circle);
        break;

    case "erase":
        //check figura su schermo
        if (event.target.classList.contains("circle", "dot")) {
            event.target.remove();
        }else{
            console.log("no target to erase found")}; //debug
    break}})

// CORREZZIONE COLORE & ABBELLIMENTI GRAFICI -------------------------------------------------------------------------//
// COLOR CORRECTION & GRAPHICAL TWEAKINGS ----------------------------------------------------------------------------//

//crea array coi bottoni e aggiungi listener per il colore
let divColor = "blueviolet";  //default color

const buttons = document.querySelectorAll(".color-button");
buttons.forEach(button => {
    button.addEventListener("click", function () {
        const newColor = button.getAttribute("data-color");  
        divColor = newColor;
        console.log("Color selected: ", divColor); //debug
})});

//scurisce il colore
function darkenColor(rgb, percent) {
    let [r, g, b] = rgb.match(/\d+/g).map(Number);
    r = Math.max(0, r - (r * percent / 100));
    g = Math.max(0, g - (g * percent / 100));
    b = Math.max(0, b - (b * percent / 100));
    return `rgb(${r}, ${g}, ${b})`;
}

//effetto mouse hover
document.querySelector("body").addEventListener("mouseover", function (event) {
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
document.querySelector("body").addEventListener("mouseout", function(event) {
    let btn = event.target;
    if (btn.tagName === "BUTTON" && btn.dataset.originalColor) {
        btn.style.backgroundColor = btn.dataset.originalColor; // Ripristina il colore originale
    }
});

//--------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------//

//NON IN USO - REDUNDANT CODE, NOT IN USE
document.addEventListener("DOMContentLoaded", () => {
    //seleziona la div esistente per mostrare la posizione del mouse
    const mousePositionDiv = document.getElementById("mouse-position");
    const xParagraph = document.getElementById("x");
    const yParagraph = document.getElementById("y");

    if (!mousePositionDiv || !xParagraph || !yParagraph) {
        console.error("Elemento con ID 'mouse-position' non trovato."); //Errore in console - trascurare
        return;
    }

    //funzione per aggiornare la posizione del mouse
    document.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;
        xParagraph.textContent = `X: ${clientX}`;
        yParagraph.textContent = `Y: ${clientY}`;
    });
});