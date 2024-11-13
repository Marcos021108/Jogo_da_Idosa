const cellElemnts = document.querySelectorAll("[data-cell]");
const container = document.querySelector("[data-container]");
const textoDeVitoria = document.querySelector("[data-textoVitoria]");
const mensagemdevitoria = document.querySelector("[data-mensagem_de_vitoria]");
const botaoRecomecar = document.querySelector("[data-recomecar]");

let isCircleTurn;

const combinacaoDeVit = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;
  for (const cell of cellElemnts) {
    cell.classList.remove("circulo");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleclick);
    cell.addEventListener("click", handleclick, { once: true });
  }
  setHoverClass();
  mensagemdevitoria.classList.remove("show_mensagem_de_vitoria");
};

const endgame = (isDraw) => {
  if (isDraw) {
    textoDeVitoria.innerText = "empate!!";
  } else {
    textoDeVitoria.innerText = isCircleTurn ? "o Venceu" : "X Venceu";
  }

  mensagemdevitoria.classList.add("show_mensagem_de_vitoria");
};

const checkForWin = (currentPlayer) => {
  return combinacaoDeVit.some((combination) => {
    return combination.every((index) => {
      return cellElemnts[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElemnts].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circulo");
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setHoverClass = () => {
  container.classList.remove("circulo");
  container.classList.remove("x");

  if (isCircleTurn) {
    container.classList.add("circulo");
  } else {
    container.classList.add("x");
  }
};
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setHoverClass();
};

const handleclick = (e) => {
  //colocar a marca(x ou circulo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circulo" : "x";

  placeMark(cell, classToAdd);

  //verificar vitória e empate
  const isDraw = checkForDraw();
  const vitoria = checkForWin(classToAdd);
  if (vitoria) {
    endgame(false);
  } else if (isDraw) {
    endgame(true);
  } else {
    swapTurns();
  }
};

startGame();

botaoRecomecar.addEventListener("click", startGame);
