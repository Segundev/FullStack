const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const port = 3000;
const hostname = "localhost";

async function fileGetter(url) {
  let filePath;
  try {
    filePath = path.join(__dirname, "..", "dist", url === "/" ? "index.html" : url);
    let extname = String(path.extname(filePath)).replace(".", "").toLowerCase();
    const result = await fs.readFile(filePath);
    return { status: "success", ext: extname, data: result };
  } catch (error) {
    if (error.code === "ENOENT") {
      filePath = path.join(__dirname, "..", "dist", "404.html");

      const errorPage = await fs.readFile(filePath);
      return { status: "fail", data: errorPage };
    }
  }
}

async function httpRequestListener(req, res) {
  try {
    const data = await fileGetter(req.url);
    //console.log(data);
    if (data.status === "success") {
      res.writeHead(200, { "Content-Type": `text/${data.ext}` });
      res.end(data.data);
    } else if (data.status === "fail") {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(data.data);
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end("<h1>Internal Server Error</h1>");
  }
}

const server = http.createServer(httpRequestListener);

server.listen(port, hostname, (error) => {
  if (error) {
    console.log("something is not right: error ", error);
  } else {
    console.log("server is listening on port " + port);
  }
});
