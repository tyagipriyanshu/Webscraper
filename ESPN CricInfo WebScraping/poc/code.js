// NodeJS
// You must specify ./ as a path of root folder to import a local module. 
let libObj = require("./lib");
console.log("I am code file");
console.log(libObj);
// object -> if key not present -> returns undefined
console.log(libObj.a);
console.log(libObj.varname);
libObj.fnFunction("Hello");
