let inputCase = 0;
let w = 0;
let h = 0;
let n = 0;
let temp = 0;
let playerOneMap = [];
let playerTwoMap = [];
let shots = [];
var playerTurnFlag = {player:1, miss:true, gamefinished:false}
var result = [];

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function playFunc(cordinate) {}

rl.on("line", (inputValue) => {
  if (temp != 0 && temp == inputCase) {
    rl.close();
  }
  if (inputCase == 0) {
    inputCase = inputValue;
  } else if (
    inputValue.split(" ").length == 3 &&
    !inputValue.split(" ").some((val) => val == "_" || val == "#")
  ) {
    let commandValue = inputValue.split(" ");
    w = commandValue[0];
    h = commandValue[1];
    n = commandValue[2];
  } else if (
    parseInt(inputValue.split("").length) == w &&
    inputValue.split("").every((val) => val == "_" || val == "#")
  ) {
    if (playerOneMap.length == h) {
      playerTwoMap.push(inputValue.split(""));
    }
    if (playerTwoMap.length == 0) {
      playerOneMap.push(inputValue.split(""));
    }
  } else if (parseInt(inputValue.split(" ").length) == 2) {
    shots.push(inputValue.split(" "));
    if (shots.length == parseInt(n)) {
      let res = "";
      for(let i=0; i<shots.length*2; i++) {
        let index=i%shots.length
          
        playerTurnFlag = playFunction(shots[index],playerTurnFlag.player)
          if(playerTurnFlag.miss) {
              playerTurnFlag = playFunction(shots[index],playerTurnFlag.player)  
              
          }
          if(playerTurnFlag.gamefinished) {
            playerTurnFlag = playFunction(shots[index],playerTurnFlag.player ==1 ? 2 : 1 )  
              break;
          }
        
      }
      let hashCountofPlayerOne = countShip(playerOneMap);
      let hashCountofPlayerTwo = countShip(playerTwoMap);
      if (hashCountofPlayerOne > hashCountofPlayerTwo) {
        res = "one";
      } else if (hashCountofPlayerOne < hashCountofPlayerTwo) {
        res = "two";
      } else {
        res = "draw";
      }
      result.push(res);
      w = 0;
      h = 0;
      n = 0;
      playerOneMap = [];
      playerTwoMap = [];
      shots = [];
      playerTurnFlag = 1;
      temp++
    }
  }
});

function playFunction(cordinates, player){
    let turnPlayer=player
    let gamefinished=false
    let missShot=false
    let wCordinateCol = cordinates[0]
    let hCordinateRow = cordinates[1]
    if(player==1) { // hitting on clayer 2
       if(playerTwoMap[hCordinateRow][wCordinateCol]=='#') {
          playerTwoMap[hCordinateRow][wCordinateCol]='_'
          if(playerTwoMap.some((val) => val.some((v) => v == '#'))) {
            turnPlayer = 1
            gamefinished=false
          } else {
            gamefinished=true
          }
          missShot=false
      } else {
        missShot=true
        turnPlayer = 2
      }
    } else { // hitting on player 1
      if(playerOneMap[hCordinateRow][wCordinateCol]=='#') {
        playerOneMap[hCordinateRow][wCordinateCol]='_'
          if(playerOneMap.some((val) => val.some((v) => v == '#'))) {
            turnPlayer = 2
            gamefinished=false
          } else {
            gamefinished=true
          }
          missShot=false
      }  else {
        missShot=true
        turnPlayer = 1
      }
    }
    return {player:turnPlayer, miss:missShot, gamefinished}
}

function countShip(playerMap) {
  let count = 0;
  for (let i = 0; i < playerMap.length; i++) {
    for (let j = 0; j < playerMap[i].length; j++) {
      if (playerMap[i][j] == "#") {
        count++;
      }
    }
  }
  return count;
}

rl.on("close", () => {

    let str='player $res wins'
    result.forEach((val) => {
        if(val=='one' || val=='two')
        {
            console.log(str.replace('$res', val))
        } else {
            console.log(val)
        }
    })
  process.exit(0);
});
