const config = require('config')

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        //console.error("FATAL ERROR: private not define")
        throw new Error("FATAL ERROR:: jwtPrivateKey private key is not define")
       // process.exit();
    }
}