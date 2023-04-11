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
var hashMap={}

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
      let res=''
        let j=0;
        for(let i=0; i<shots.length*2; i++) {
          let index=i%shots.length
          
          if(j<5) {
            hashMap[`${shots[index][0]}_${shots[index][1]}_1`] = false
          } else {
            hashMap[`${shots[index][0]}_${shots[index][1]}_2`] = false
          }
          j++
          
        }
        for(let i=0; i<shots.length*2; i++) {
          let index=i%shots.length
            playerTurnFlag = playFunction(shots[index],playerTurnFlag.player)
            if(playerTurnFlag.miss) {
                playerTurnFlag = playFunction(shots[index],playerTurnFlag.player)  
                
            }
            hashMap[`${shots[index][0]}_${shots[index][1]}_${playerTurnFlag.player}`] = true
            if(playerTurnFlag.gamefinished) {
              let finalPlayer = playerTurnFlag.player ==1 ? 2 : 1
              playerTurnFlag = playFunction(shots[index],finalPlayer)  
              let pendingArr = checkIfPlayerTurnTurnExist(finalPlayer)
                for(let j=0; j<pendingArr.length; j++) {
                    playerTurnFlag = playFunction(pendingArr[j],finalPlayer)
                }
                break;
            }
          
        }
        
       let hashCountofPlayerOne = countShip(playerOneMap)
        let hashCountofPlayerTwo = countShip(playerTwoMap)
        if(hashCountofPlayerOne > hashCountofPlayerTwo) {
          res='one'
        }  else if(hashCountofPlayerOne < hashCountofPlayerTwo) {
          res='two'
        } else {
          res='draw'
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


function checkIfPlayerTurnTurnExist(finalPlayer) {
    let pendingShotsOfPlayer=[]
     for(let obj in hashMap) {
      if(!hashMap[`${obj.slice(0,-1)}${finalPlayer}`] && obj[obj.length-1] == finalPlayer) {
        let arr= [obj.split('_')[0], obj.split('_')[1]]
        pendingShotsOfPlayer.push(arr)
            
      }
    }
  return pendingShotsOfPlayer
}

function playFunction(cordinates, player){
    let turnPlayer=player
    let gamefinished=false
    let missShot=false
    let wCordinateCol = cordinates[0]
    let hCordinateRow = cordinates[1]
    console.log(playerTwoMap[hCordinateRow][wCordinateCol])
    if(player==1) { // hitting on clayer 2
       if(typeof playerTwoMap[hCordinateRow][wCordinateCol]!= 'undefined' && playerTwoMap[hCordinateRow][wCordinateCol]=='#') {
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
      if(typeof playerOneMap[hCordinateRow][wCordinateCol]!= 'undefined' && playerOneMap[hCordinateRow][wCordinateCol]=='#') {
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
