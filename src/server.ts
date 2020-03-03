// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
import generated from "@babel/register";
generated({
    presets: ["@babel/preset-env"]
});

import "./services/AbstractService";
import "./services/Tarot";
import "./services/Esagrams";
import  "./node-start"
console.log("Server Started");
