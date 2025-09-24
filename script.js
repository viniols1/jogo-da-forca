const palavrasComDicas = [
    { palavra: "JAVASCRIPT", dica: "Linguagem de programação essencial para a web." },
    { palavra: "PYTHON", dica: "Famosa por sua sintaxe simples e uso em IA e ciência de dados." },
    { palavra: "ALGORITMO", dica: "Conjunto de instruções para resolver um problema." },
    { palavra: "FRONTEND", dica: "Parte do desenvolvimento web que o usuário interage diretamente." },
    { palavra: "BACKEND", dica: "O 'servidor' da aplicação, onde a lógica de negócio roda." },
    { palavra: "DATABASE", dica: "Local onde os dados da sua aplicação são armazenados." },
    { palavra: "API", dica: "Interface que permite a comunicação entre diferentes softwares." },
    { palavra: "HTML", dica: "Linguagem de marcação para estruturar páginas web." },
    { palavra: "CSS", dica: "Usada para estilizar a aparência de uma página web." },
    { palavra: "FRAMEWORK", dica: "Estrutura que facilita a criação de aplicações complexas." }
];

let palavraSecretaObj = {};
let letrasAdivinhadas = [];
let tentativas = 6;
let letrasUsadas = new Set();

const wordDisplay = document.getElementById("word-display");
const attemptsLeftSpan = document.getElementById("attempts-left");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");
const usedLettersSpan = document.getElementById("used-letters");
const restartButton = document.getElementById("restart-button");
const hintText = document.getElementById("hint-text");

function iniciarJogo() {
    palavraSecretaObj = palavrasComDicas[Math.floor(Math.random() * palavrasComDicas.length)];
    letrasAdivinhadas = Array(palavraSecretaObj.palavra.length).fill("_");
    tentativas = 6;
    letrasUsadas.clear();

    atualizarDisplay();
    message.textContent = "";
    attemptsLeftSpan.textContent = tentativas;
    usedLettersSpan.textContent = "";
    letterInput.disabled = false;
    guessButton.disabled = false;
    restartButton.classList.add("hidden");
    letterInput.value = "";
    letterInput.focus();
    hintText.textContent = `Dica: ${palavraSecretaObj.dica}`;
}

function atualizarDisplay() {
    wordDisplay.innerHTML = "";
    letrasAdivinhadas.forEach(letter => {
        const span = document.createElement("span");
        span.classList.add("word-letter");
        span.textContent = letter;
        wordDisplay.appendChild(span);
    });
}

function verificarChute() {
    const chute = letterInput.value.trim().toUpperCase();
    letterInput.value = "";

    if (!chute || !/^[A-Z]$/.test(chute)) {
        message.textContent = "Por favor, digite uma única letra válida.";
        return;
    }

    if (letrasUsadas.has(chute)) {
        message.textContent = `Você já usou a letra '${chute}'.`;
        return;
    }

    letrasUsadas.add(chute);
    usedLettersSpan.textContent = Array.from(letrasUsadas).join(", ");

    if (palavraSecretaObj.palavra.includes(chute)) {
        message.textContent = "Parabéns, a letra está na palavra!";
        for (let i = 0; i < palavraSecretaObj.palavra.length; i++) {
            if (palavraSecretaObj.palavra[i] === chute) {
                letrasAdivinhadas[i] = chute;
            }
        }
        atualizarDisplay();
    } else {
        tentativas--;
        attemptsLeftSpan.textContent = tentativas;
        message.textContent = "Ops! Essa letra não está na palavra.";
    }

    verificarFimDeJogo();
}

function verificarFimDeJogo() {
    if (letrasAdivinhadas.join("") === palavraSecretaObj.palavra) {
        message.textContent = `Parabéns! Você venceu! A palavra era: ${palavraSecretaObj.palavra}`;
        message.classList.remove("lost-message");
        desabilitarControles();
    } else if (tentativas === 0) {
        message.textContent = `Você perdeu! A palavra era: ${palavraSecretaObj.palavra}`;
        message.classList.add("lost-message");
        desabilitarControles();
    }
}

function desabilitarControles() {
    letterInput.disabled = true;
    guessButton.disabled = true;
    restartButton.classList.remove("hidden");
}

guessButton.addEventListener("click", verificarChute);
letterInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        verificarChute();
    }
});
restartButton.addEventListener("click", iniciarJogo);

function addHoverEffect(element) {
    element.addEventListener('mouseover', () => {
        element.style.transform = 'scale(1.05)';
        element.style.boxShadow = '0 0 10px var(--secondary-color)';
    });
    element.addEventListener('mouseout', () => {
        element.style.transform = 'scale(1)';
        element.style.boxShadow = 'none';
    });
}

addHoverEffect(guessButton);
addHoverEffect(restartButton);


document.addEventListener("DOMContentLoaded", iniciarJogo);
