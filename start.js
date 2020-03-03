// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")({
    presets: ["@babel/preset-env"]
});

module.exports = require('./services/AbstractService.js');
module.exports = require('./services/Tarrot.js');
module.exports = require('./services/Esagrams.js');
module.exports = require('./node-start.js');
console.log("Server Started");