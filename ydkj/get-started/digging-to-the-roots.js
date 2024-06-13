// CLOSURES

/* 
Closures is when a function remembers and continues to access variables from outside 
its scope, even when function is executed in a different scope
*/

function greeting(msg) {
  return function who(name) {
    console.log(`${msg}, ${name}!`);
  };
}

var hello = greeting("Hello");
var howdy = greeting("Howdy");

hello("Kyle");

hello("Sarah");

howdy("Grant");
