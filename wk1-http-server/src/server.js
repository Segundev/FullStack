const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const port = 3000;
const hostname = "localhost";

async function httpRequestListener(req, res) {
  const filePath = path.join(__dirname, "..", "dist", req.url === "/" ? "index.html" : req.url);
  try {
    res.writeHead(200, { "Content-Type": "text/html" });
    const data = await fs.readFile(filePath);
    res.write(data);
  } catch (error) {
    console.log("errorrrrrr------->", error);
  }
  res.end();
}

const server = http.createServer(httpRequestListener);

server.listen(port, hostname, (error) => {
  if (error) {
    console.log("something is not right: error ", error);
  } else {
    console.log("server is listening on port " + port);
  }
});
