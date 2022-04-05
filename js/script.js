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
function setdifficulty(event) {
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
    let squareperSide = Math.sqrt(numSquare);
    console.log("celle per lato: ", squareperSide);
    generaGriglia(numSquare, squareperSide);
  }
  function generaGriglia(numSquare, squareperSide) {
    console.log("numero di celle totali: ", numSquare);
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
    this.classList.add("blueBg");
    this.classList.remove("pointer");
    this.removeEventListener("click", coloraCella);
  }
  
  document.getElementById("play").addEventListener("click", setdifficulty);
  