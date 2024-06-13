/** 
example 1 - variable declaration 

var names = "Gbenga";
var age;

let names = "Jayeola";
let age;

**/

//example 2 - block level scoping
var adult = true;

if (adult) {
  var names = "Gbenga Jayeola";
  let age = 39;
  console.log("checking stuff out");
}

/* console.log("My name is", names);
console.log("I am " + age + " years old"); // RETURNS ERROR AGE NOT DEFINED */

/* Example 3 --- USE OF CONST */

const myBirthday = true;
let age = 39;

if (myBirthday) {
  age += 1;
  // myBirthday = false; --- this returns a TypeError: Assignment to constant variable
}

const actors = ["Jackie", "Brad Pitt"];

actors[2] = "Will";
// actors = [];  ------ returns a TypeError: Assignment to constant variable

/* 
If you stick to using const only with primitive values, you avoid any confusion of re-assignment
(not allowed) vs. mutation (allowed)! That’s the safest and best way to use const.
*/

// HOW WE ORGANISSE CODE IN JS

/* 

Two pattern for organising code (data and behaviours) in JS - MODULES AND CLASSES

A CLASS in a program is a definition of a "type" of custom data structure that 
includes both data and behaviours that operate on that data

CLASSES define how such a data structure work but classes are not themselves 
concrete values. To get a concrete that you can use in a program, a CLASS must
be instatiated with the new keyword one or more times

*/

class Page {
  constructor(text) {
    this.text = text;
  }

  print() {
    console.log(this.text);
  }
}

class NoteBook {
  constructor() {
    this.pages = [];
  }

  addPage(text) {
    var page = new Page(text);
    this.pages.push(page);
  }

  print() {
    for (let page of this.pages) {
      page.print();
    }
  }
}

var mathNotes = new NoteBook();
mathNotes.addPage("Arithmetic: + - x / ...");
mathNotes.addPage("Trigonometry: sin cos tan ...");

mathNotes.print();

// CLASS INHERITANCE

class Publication {
  constructor(title, author, publishDate) {
    this.title = title;
    this.author = author;
    this.publishDate = publishDate;
  }

  print() {
    console.log(`
            Title: ${this.title}
            By: ${this.author}
            PublishDate: ${this.publishDate}
        `);
  }
}

class Books extends Publication {
  constructor(bookDetails) {
    super(bookDetails.title, bookDetails.author, bookDetails.publishedOn);

    this.publisher = bookDetails.publisher;
    this.ISBN = bookDetails.ISBN;
  }

  print() {
    super.print();
    console.log(`
        Publisher: ${this.publisher}
        ISBN: ${this.ISBN}
            `);
  }
}

class BlogPost extends Publication {
  constructor(title, author, publishDate, URL) {
    super(title, author, publishDate);
    this.URL = URL;
  }

  print() {
    super.print();
    console.log(this.URL);
  }
}

var YDKJS = new Books({
  title: "You dont know JS",
  author: "Kyle Simpson",
  publishedOn: "June, 2014",
  publisher: "O'Reilly",
  ISBN: "12345-6789",
});

YDKJS.print();

var forAgainstLet = new BlogPost("for and against let", "Kyle Simpson", "October 27", "www.ydkjs.com");

forAgainstLet.print();

// ES MODULES
/* 
ES6 are meant to serve the same purpose as the existing classic modules just described taking into account important
variations and use case from AMD, UMD and commonJS


There is no wrapping function to define a module. The wrapping context is a file. ESM modules are file based, One file, One module


You also dont Instantiate an ES MODULE, you import it, you import it to use its single instance
ESM modules are in effect singletons
*/
