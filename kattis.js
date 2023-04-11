// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// const rtwo = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter the first number : ', (N) => {
    rl.question('Please enter the second number : ', (N2) => {
        var input = parseInt(N);
        var newBlocks = 1; 
        var sumBlocks = 1; 
        var levelBlocks = 1; 
        var level = 1; 
        while (true)
        { 
            if (levelBlocks==0)
        {
            levelBlocks++;
        } else
        {
            levelBlocks += 2;
        }

        newBlocks = levelBlocks * levelBlocks;
        sumBlocks += newBlocks;
            if (sumBlocks <= input)
            {
                level++;
            } else
            {
                break;
            }

        }
        console.log(level)
        rl.close();
    });
});


// Paramids 
rl.on('line' , (N) => {
    rtwo.on('line' , (N2) => {
        console.log("input one", N2)
        console.log("input two", N)
    
        
        var input = parseInt(N);
        var newBlocks = 1; 
        var sumBlocks = 1; 
        var levelBlocks = 1; 
        var level = 1; 
        while (true)
        { 
            if (levelBlocks==0)
        {
            levelBlocks++;
        } else
        {
            levelBlocks += 2;
        }

        newBlocks = levelBlocks * levelBlocks;
        sumBlocks += newBlocks;
            if (sumBlocks <= input)
            {
                level++;
            } else
            {
                break;
            }

        }
        console.log(level)
    });
});