const boxes = document.querySelectorAll(".box");
const players = document.querySelector(".Players");
const heading = document.querySelector(".heading");
const mainbody = document.querySelector(".main-body");
const reset = document.querySelector(".reset");
const exit = document.querySelector(".exit");
const lines = document.querySelectorAll(".line");
let currentTurn = "X";
let nextTurn = "O";
let playerTurn = currentTurn;
let temp = "false";

// ************************************ Game Start Function **********************************
const GameStart = (obj) => {
  if (obj.innerHTML === "" && playerTurn === currentTurn) {
    obj.innerHTML = playerTurn;
    winnerPlayer();
    playerTurn = playerTurn === currentTurn ? nextTurn : currentTurn;
    players.innerHTML = `Turn of Player ${playerTurn}`;
    if (playerTurn === nextTurn) {
      setTimeout("computerSystem()", 500);
    }
  }
  if (obj.innerHTML !== "") {
    CheckTie();
  }
};

// ************************************ Computer System Function **********************************
const computerSystem = () => {
  if (temp === "false") {
    let randombox = Math.floor(Math.random() * boxes.length);
    if (boxes[randombox].innerHTML === "") {
      boxes[randombox].innerHTML = playerTurn;
      winnerPlayer();
      playerTurn = playerTurn === currentTurn ? nextTurn : currentTurn;
      players.innerHTML = `Turn of Player ${playerTurn}`;
    } else {
      computerSystem();
    }
  }
};

// ************************************ Check Winner Function **********************************
const winnerPlayer = () => {
  const array = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (i = 0; i < array.length; i++) {
    const [p1, p2, p3] = array[i];
    if (
      boxes[p1].innerHTML !== "" &&
      boxes[p1].innerHTML === boxes[p2].innerHTML &&
      boxes[p2].innerHTML === boxes[p3].innerHTML
    ) {
      for (let j = 0; j < lines.length; j++) {
        if (i === j) {
          lines[j].style.display = "block";
        }
      }
      temp = "true";
      heading.innerHTML = `Player ${playerTurn} is winner`;
      setTimeout("showMessage()", 800);
    }
  }
};

// ***************************************** Show Message Function **********************************
const showMessage = () => {
  for (let i = 0; i < lines.length; i++) {
    lines[i].style.display = "none";
  }
  mainbody.style.display = "block";
  mainbody.style.display = "flex";
  mainbody.style.justifyContent = "center";
  mainbody.style.alignItems = "center";
};

// ***************************************** Reset Game Function **********************************
reset.addEventListener("click", () => {
  location.reload();
  for (i = 0; i < boxes.length; i++) {
    boxes[i] = "";
  }
});

// ***************************************** Exit Function **********************************
exit.addEventListener("click", function () {
  window.close();
});

// ***************************************** Check Tie Function **********************************
const CheckTie = () => {
  count = 0;
  boxes.forEach((box) => {
    if (box.innerHTML === "") {
      count++;
    }
  });
  if (count === 0 && temp === "false") {
    heading.innerHTML = `Game is Tie`;
    setTimeout("showMessage()", 800);
  }
};
