let a = 10;
// console.log("I will be executed");
function fn(param) {
    console.log("I want to be exported ", param);
}
function fn1() {
    console.log("Kindly don't export me ");
}

// NodeJS
// The module.exports is a special object which is included in every JavaScript file 
// in the Node.js application by default. The module is a variable that represents the 
// current module, and exports is an object that will be exposed as a module. 
// So, whatever you assign to module.exports will be exposed as a module
// and can be used in another file using require().

module.exports = {
    varname: a,           //key : value
    fnFunction: fn
}
