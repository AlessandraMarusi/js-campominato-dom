/* Versione con gli if */
/* function playFunction() {
    const gridContainer = document.querySelector(".gridContainer") 
    gridContainer.innerHTML = ''
    gridContainer.className = "gridContainer"
    let difficulty = document.getElementById("difficulty").value;
    console.log(difficulty)
    const boxes = [] 
    if (difficulty == 1) {
        gridContainer.classList.add("gridEasy")
        for (let i = 0; i < 100; i++) {
            const box = document.createElement("div")
            box.className = "box boxEasy"
            box.innerHTML = i + 1
            gridContainer.append(box)
            boxes.push(box)
            boxes[i].addEventListener("click", function() {
                this.classList.add("blueBg");
            })
        }
    }
    if (difficulty == 2) {
        gridContainer.classList.add("gridMedium")
        for (let i = 0; i < 81; i++) {
            const box = document.createElement("div")
            box.className = "box boxMedium"
            box.setAttribute('onclick','changeBg();');
            box.innerHTML = i + 1
            gridContainer.append(box)
            boxes.push(box)
            boxes[i].addEventListener("click", function() {
                this.classList.add("blueBg");
            })
        }
    }
    if (difficulty == 3) {
        gridContainer.classList.add("gridHard")
        for (let i = 0; i < 49; i++) {
            const box = document.createElement("div")
            box.className = "box boxHard"
            box.setAttribute('onclick','changeBg();');
            box.innerHTML = i + 1
            gridContainer.append(box)
            boxes.push(box)
            boxes[i].addEventListener("click", function() {
                this.classList.add("blueBg");
            })
        }
    }
}
 */

/* Versione compatta realizzata dopo aver scambiato il codice con Fabrizio Z. 
Pregi: Codice più compatto
Difetti: Dimensioni non modificabili a seconda del numero di caselle, non è possibile renderlo responsive così com'è
*/
/* function playFunction() {
    const gridContainer = document.querySelector(".gridContainer")
    gridContainer.innerHTML = ''
    gridContainer.className = "gridContainer"
    let boxNumber = document.getElementById("difficulty").value;
    const boxes = []
    gridContainer.style.width = "calc(45px * " + Math.ceil(Math.sqrt(boxNumber)) + ")"
    gridContainer.style.heigth = "calc(45px * " + Math.ceil(Math.sqrt(boxNumber)) + ")"
    for (let i = 0; i < boxNumber; i++) {
        const box = document.createElement("div")
        box.className = "box pointer"
        box.innerHTML = i + 1
        gridContainer.append(box)
        boxes.push(box)
        boxes[i].addEventListener("click", function blueBg() {
            this.classList.add("blueBg");
            this.classList.remove("pointer")
            console.log(boxes[i])
            boxes[i].removeEventListener("click", blueBg)
        })
    }
} */

/* Versione con la griglia come fatta da Clelia */

const bombs = []
const totalBombs = 16;
let score = 0
let maxScore = 0

function setdifficulty(event) {
  const resultContainer = document.querySelector(".resultContainer");
  resultContainer.classList.add("hidden")
  score = 0
  const difficulty = document.getElementById("difficulty").value;
  console.log("livello selezionato: ", difficulty);
  let numSquare;
  switch (difficulty) {
    case "1":
    default:
      numSquare = 100;
      break;
    case "2":
      numSquare = 81;
      break;
    case "3":
      numSquare = 49;
      break;
  }
  maxScore = numSquare - totalBombs
  let squareperSide = Math.sqrt(numSquare);
  generaGriglia(numSquare, squareperSide);
  generaBombe(numSquare);
}

function generaBombe(numSquare) {
  bombs.length = 0
  while (bombs.length < totalBombs) {
    let bombNumber = randomNumber(1, numSquare)
    if (!bombs.includes(bombNumber)) {
      bombs.push(bombNumber)
    }
  }
  console.log(bombs)
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max)
    return Math.floor(Math.random() * max + min)
}

function generaGriglia(numSquare, squareperSide) {
  const gridContainer = document.querySelector(".gridContainer");
  gridContainer.innerHTML = "";
  let row = document.createElement("div");
  row.className = "gridrow";
  for (let i = 1; i <= numSquare; i++) {
    const square = generaCella(i, squareperSide);
    row.append(square);
  }
  gridContainer.append(row);
}

function generaCella(num, squareperSide) {
  let square = document.createElement("div");
  square.className = "box";
  square.style.width = `calc(100% / ${squareperSide})`;
  square.style.height = `calc(100% / ${squareperSide})`;
  square.classList.add("pointer");
  square.innerHTML = `<span>${num}</span>`;
  square.addEventListener("click", coloraCella);
  return square;
}

function coloraCella() {
  let num = parseInt(this.innerText);
  this.classList.remove("pointer");
  this.removeEventListener("click", coloraCella);
  if(bombs.includes(num)){
    this.classList.add("redBg");
    lostGame()
  }
  else {
    this.classList.add("blueBg");
    score++
    const punteggio = document.getElementById("punteggio")
    punteggio.innerHTML = score
    if (score === maxScore) {
      wonGame()
    }
  }
}
function wonGame(){
  const resultContainer = document.querySelector(".resultContainer");
  resultContainer.classList.remove("hidden")
  const resultBox = document.querySelector(".resultBox");
  resultBox.innerHTML = "Complimenti! Hai vinto!"
}
function lostGame(){
  allCells = document.getElementsByClassName("box")
  console.log(allCells)
  console.log(allCells.length)
  for (let i = 0; i < allCells.length; i++) {
    let cellNum = parseInt(allCells[i].innerText);
    allCells[i].removeEventListener("click", coloraCella);
    allCells[i].classList.remove("pointer");
    if (bombs.includes(cellNum)) {
      allCells[i].classList.add("redBg");
    }
  }
  const resultContainer = document.querySelector(".resultContainer");
  resultContainer.classList.remove("hidden")
  const resultBox = document.querySelector(".resultBox");
  resultBox.innerHTML = "Peccato! Hai perso!"
}

document.getElementById("play").addEventListener("click", setdifficulty);
