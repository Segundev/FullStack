import { create as createPub } from "modules-publication.js";

function printDetails(pub, url) {
  pub.print();
  console.log(url);
}

export function create(title, author, pubDate, URL) {
  var pub = createPub(title, author, pubDate);

  var publicAPI = {
    print() {
      printDetails(pub, url);
    },
  };

  return publicAPI;
}
