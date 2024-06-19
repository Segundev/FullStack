// nodejs modules
import http from "node:http";

import { getRequestListener } from "./routes/get.js";
import { postRequestListener } from "./routes/post.js";

const SERVER_PORT = 3000;
const SERVER_HOSTNAME = "localhost";
const SERVER_ROOT_PATH = process.cwd();

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    getRequestListener(req, res, SERVER_ROOT_PATH);
  } else if (req.method === "POST") {
    postRequestListener(req, res, SERVER_ROOT_PATH);
  } else if (req.method === "PUT") {
    putRequestListener();
  } else if (req.method === "DELETE") {
    deleteRequestListener();
  }
});

server.listen(SERVER_PORT, SERVER_HOSTNAME, (error) => {
  if (error) {
    console.log("something is not right: error ", error);
  } else {
    console.log(`server is listening on port http://${SERVER_HOSTNAME}:${SERVER_PORT}`);
  }
});
