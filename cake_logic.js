const fs = require('fs')


function findDuplicateFiles(startingNode) {
    let duplicateResultArr = []
    let alreadySeenFile = {}
    let stackWhichHoldTheNode = [startingNode]

    while (stackWhichHoldTheNode.length) {
        
        let currentPath = stackWhichHoldTheNode.pop();
        let currentFile = fs.statSync(currentPath)
        if (currentFile.isDirectory()) {
            fs.readdirSync(currentPath).forEach(path => {
                stackWhichHoldTheNode.push(`${currentPath}/${path}`);
              });
        } else {
            // currentPath:: This is file here
            const fileContent = fs.readFileSync(currentPath)
            const currentLastEditedTime = fileContent.mtime
            if (alreadySeenFile.hasOwnProperty(fileContent)) {
                const existingFile = alreadySeenFile[fileContent]

                if (currentLastEditedTime > existingFile.lastEditedTime) {
                    duplicateResultArr.push([currentPath, existingFile.path])
                } else {
                    duplicateResultArr.push([existingFile.path, currentPath])
                    alreadySeenFile[fileContent] = {
                        lastEditedTime: currentLastEditedTime,
                        path: currentPath
                    }
                }
            } else {
                alreadySeenFile[fileContent] = {
                    lastEditedTime: currentLastEditedTime,
                    path: currentPath
                }
            }
        }

    }
    return duplicateResultArr;
}
findDuplicateFiles('documents');
console.log("hello")