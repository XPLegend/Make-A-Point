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


//creare switch per selezionare modalità di disegno o eliminazione - modalità default = disegna
let mode = "draw";

document.querySelectorAll(".draw-erase").forEach(button => {
    button.addEventListener("click", function () {
        mode = button.getAttribute("data-mode");
        console.log("Modalità attuale:", mode);  //debug
    });
});

//definisce la zona da disegno
const box = document.getElementById("drawing-box");

//switch ed esecuzione
box.addEventListener("click", function(event) {
    
    if (mode === "draw") {
        //aggiunge le figure ad una classList per la funzione erase
        const figure = document.createElement("div");
        
        //definisce parametri della div
        figure.classList.add("figura");
        figure.style.left = `${mouseX}px`;
        figure.style.top = `${mouseY}px`;
        figure.style.backgroundColor = divColor;
        
        //crea la div
        box.appendChild(figure);

    } else if (mode === "erase") {
        
        // cancella solo se hai cliccato su una figura
        if (event.target.classList.contains("figura")) {
            event.target.remove();
        } else {
            console.log("Hai cliccato su uno sfondo, nessuna figura da cancellare."); //debug
}}});


//crea array coi bottoni e aggiungi listener per il colore
let divColor = "blueviolet";  //default color

const buttons = document.querySelectorAll(".color-button");
buttons.forEach(button => {
    button.addEventListener("click", function () {
        const newColor = button.getAttribute("data-color");  
        divColor = newColor;
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
document.querySelector("nav").addEventListener("mouseout", function(event) {
    let btn = event.target;
    if (btn.tagName === "BUTTON" && btn.dataset.originalColor) {
        btn.style.backgroundColor = btn.dataset.originalColor; // Ripristina il colore originale
    }
});
