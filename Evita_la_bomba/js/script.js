const numeroClick = document.querySelector("#fine span");
const bottone1 = document.querySelector("#new");
const bottone2 = document.querySelector("#bottone");
const finalMessageContainer = document.getElementById("fine");
const spanBloccaGioco = document.querySelector("#gioco span");
const vittoriaMessageContainer = document.querySelector(".vittoria");

setNumClick(0);
createChessBoard(); //crea la scacchiera iniziale
const quadrottoBomba = extractPositionBomb(); //estrae la posizione della bomba nella scacchiera

const quadrotti = document.querySelectorAll("li");
setBombInCell(quadrotti);
attachClickListenerChessboard(quadrotti);

function createChessBoard() {
  const listaUl = document.querySelector("#gioco ul");
  for (let i = 0; i < 16; i++) {
    listaUl.innerHTML += "<li></li>";
  }
}

function setNumClick(numClick) {
  numeroClick.innerHTML = numClick;
}

function extractPositionBomb() {
  return Math.floor(Math.random() * 16);
}

function setBombInCell(quadrotti) {
  const quadrottoWithBomb = quadrotti[quadrottoBomba];
  quadrottoWithBomb.setAttribute("class", "bomba");
}

function attachClickListenerChessboard(quadrotti) {
  for (let i = 0; i < quadrotti.length; i++) {
    quadrotti[i].addEventListener("click", quadrottoClickHandler, {
      once: true,
    });
  }
}

function quadrottoClickHandler(e) {
  const quadrottoClicked = e.target;
  setNumClick(Number(numeroClick.innerHTML) + 1); //incrementa di 1 il numero di click

  //se hai beccato l'li con la classe bomb
  if (quadrottoClicked.classList.contains("bomba")) {
    endGame(quadrottoClicked);
  } //fine if principale
  else {
    displaImageCell(quadrottoClicked, "rainbow");
  }
} //fine ciclo for

function newGame() {
  location.reload();
}

function endGame(quadrottoClicked) {
  displaImageCell(quadrottoClicked, "display-bomb");
  displayOutcome(finalMessageContainer);
  spanBloccaGioco.setAttribute("class", "bloccaGioco");
  makeButtonClickable(bottone1);

  checkIfYouWin();
}

function checkIfYouWin() {
  if (16 === Number(numeroClick.innerHTML)) {
    displayOutcome(vittoriaMessageContainer);
    makeButtonClickable(bottone2);
  }
}

function makeButtonClickable(button) {
  button.onclick = newGame;
}

function displaImageCell(cell, imageClass) {
  cell.classList.add(imageClass);
}

function displayOutcome(container) {
  container.classList.add("visualizza");
}
