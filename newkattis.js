


// var speedArray=[]
// var timeArray=[]
// var results=[]
// var inputInteger = 0
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function getDistance(speedArr, timeArr) {
//     let i=0;
//     let distanceCover=0
//     while(i < speedArr.length) {
//         if(i==0){
//             distanceCover += speedArr[i] * timeArr[i]
//         } else {
//             distanceCover += speedArr[i] * (timeArr[i] - timeArr[i-1])
//         }
        
//         i++
//     }
//     return distanceCover
// }

// rl.on("line", (pairInteger) => {

//     if(pairInteger == -1) {
//         rl.close()
//     }else {
//         let ar = pairInteger.split(' ')  
//         if(ar.length == 1)   {
//             inputInteger = pairInteger
//         } else {
//             speedArray.push(ar[0]);
//             timeArray.push(ar[1]);
//         }
//         if(speedArray.length == inputInteger) {
//             results.push(getDistance(speedArray,timeArray))
//             speedArray.length=0
//             timeArray.length=0
//             inputInteger=0;
            
//         }
//     }
   
// });

// rl.on("close", () => {
//     results.forEach((val) => {
//         console.log(val+' miles')
//     })
//     process.exit(0)
// });

function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }

function getFact(number) {
if (number < 0) {
    console.log('Error! Factorial for negative number does not exist.');
}

else if (number === 0) {
    console.log(`The factorial of ${number} is 1.`);
}

else {
    let fact = 1;
    for (i = 1; i <= number; i++) {
        fact *= i;
    }
    console.log(`The factorial of ${number} is ${toFixed(fact)}.`);
}
}



  

  




