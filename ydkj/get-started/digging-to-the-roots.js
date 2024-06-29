// ITERATOR
/* 
Iterator pattern is a standardised way of consuming data from a source 
one chunck at a time. 

ITERATOR PATTERN defines a data structure called an ITERATOR that has a reference to
an underlying data source which exposes a method like NEXT(). Calling NEXT() returns
the next piece of data

ES6 standardized a specific protocol for the iterator pattern. The protocol defines
a NEXT() method whose return is an object called an ITERATOR RESULT; the object has
VALUE and DONE properties; where DONE is a property that is FALSE until the iteration
over thr underlying data is fixed.

ITERATOR CONSUMPTION PROTOCOL is defined for consuming ITERABLES, an ITERABLE is a 
value that can be iterated over.

ITERABLES are STRINGS, ARRAY, MAPS, SET, AND OTHERS

- OTHERS include 
* TYPEDARRAY
* SEGMENTS
* NODELIST from the DOM
* READABLESTREAMS
* GENERATOR FUNCTIONS - GENERATOR OBJECTS WHICH ARE ITEARABLE ITERATORS
* BUILT IN APIs LIKE - PROMISE.ALL(), PROMISE.RACE(), PROMISE.ANY(), MAP.GROUPBY() ETC 
*/

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

function counter(step = 1) {
  var count = 0;
  return function increaseCount() {
    count = count + step;
    return count;
  };
}

var incBy1 = counter(1);
var incBy3 = counter(3);

console.log(incBy1());
console.log(incBy1());
