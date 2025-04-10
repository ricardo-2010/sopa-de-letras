let nivelActual = 1;
let palabras = [];
let seleccionadas = [];

document.addEventListener("DOMContentLoaded", iniciarJuego);

function iniciarJuego() {
    document.getElementById("nivel").textContent = nivelActual;
    let tamano = 6 + nivelActual;
    let cantidadPalabras = Math.min(3 + nivelActual, 8);

    palabras = generarPalabras(cantidadPalabras);
    generarSopa(tamano, palabras);
}

function generarPalabras(cantidad) {
    const todasLasPalabras = ["HTML", "CSS", "JAVASCRIPT", "PYTHON", "VARIABLE", "OBJETO", "FUNCION", "COMPILADOR", "ALGORITMO", "FRONTEND", "BACKEND"];
    return todasLasPalabras.sort(() => Math.random() - 0.5).slice(0, cantidad);
}

function generarSopa(tamano, palabras) {
    const sopaLetras = document.getElementById("sopaLetras");
    const listaPalabras = document.getElementById("listaPalabras");
    sopaLetras.innerHTML = "";
    listaPalabras.innerHTML = "";
    seleccionadas = [];

    palabras.forEach(palabra => {
        let li = document.createElement("li");
        li.textContent = palabra;
        listaPalabras.appendChild(li);
    });

    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let tablero = Array.from({ length: tamano }, () => Array(tamano).fill(null));

    palabras.forEach((palabra, index) => {
        let fila = index;
        let columna = Math.floor(Math.random() * (tamano - palabra.length));
        for (let i = 0; i < palabra.length; i++) {
            tablero[fila][columna + i] = palabra[i];
        }
    });

    for (let i = 0; i < tamano; i++) {
        for (let j = 0; j < tamano; j++) {
            if (tablero[i][j] === null) {
                tablero[i][j] = letras[Math.floor(Math.random() * letras.length)];
            }
        }
    }

    sopaLetras.style.gridTemplateColumns = `repeat(${tamano}, 40px)`;
    tablero.forEach((fila, i) => {
        fila.forEach((letra, j) => {
            let div = document.createElement("div");
            div.textContent = letra;
            div.classList.add("cell");
            div.dataset.fila = i;
            div.dataset.columna = j;
            sopaLetras.appendChild(div);
        });
    });

    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", function () {
            this.classList.toggle("seleccionada");
            let posicion = this.dataset.fila + "," + this.dataset.columna;
            if (seleccionadas.includes(posicion)) {
                seleccionadas = seleccionadas.filter(pos => pos !== posicion);
            } else {
                seleccionadas.push(posicion);
            }
        });
    });
}

function verificarRespuestas() {
    let seleccionadasLetras = document.querySelectorAll(".cell.seleccionada");
    let palabraSeleccionada = "";
    
    seleccionadasLetras.forEach(cell => {
        palabraSeleccionada += cell.textContent;
    });

    let resultado = document.getElementById("resultado");
    if (palabras.includes(palabraSeleccionada)) {
        resultado.textContent = "¡Correcto! Has encontrado una palabra.";
        resultado.style.color = "green";
        palabras = palabras.filter(palabra => palabra !== palabraSeleccionada);
        
        seleccionadasLetras.forEach(cell => {
            cell.style.background = "blue";
            cell.style.color = "white";
        });

        if (palabras.length === 0) {
            resultado.textContent = "¡Nivel completado! Presiona 'Siguiente Nivel'.";
        }
    } else {
        resultado.textContent = "Incorrecto, intenta otra vez.";
        resultado.style.color = "red";
    }
}

function siguienteNivel() {
    nivelActual++;
    iniciarJuego();
    document.getElementById("resultado").textContent = "";
}
