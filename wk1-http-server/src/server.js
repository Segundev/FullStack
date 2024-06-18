// nodejs modules

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { URL } from "node:url";
import cookiesLib from "cookie";
import { mimeTypes } from "./utils/mimetype";

const port = 3000;
const hostname = "localhost";

// object to save users information - password and username
const USERS = [
  {
    username: "Jayeola",
    password: "Gbenga",
  },
  {
    username: "Jason",
    password: "Norwood",
  },
];

function checkAuth(req) {
  const cookiesStatus = req.headers.cookie !== undefined ? true : false;
  return cookiesStatus;
}

// function that gets the filePath from a request url. This function gets the path
// with the mimeType file from the request headers
function getFilePath(url, error = false) {
  let filePath;
  if (error) {
    filePath = new URL("src/templates/404.html", import.meta.url);
  } else {
    filePath = new URL(url === "/" ? "index.html" : url, import.meta.url);
    // filePath = path.join(__dirname, "..", "dist", url === "/" ? "index.html" : url);
  }

  return filePath;
}

// function gets the file from http request in buffer format. returns object with properties
// status either fail or success and data containing the file content or error message when file
// not found
async function fileGetter(path) {
  try {
    const result = await fs.readFile(path);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail", data: error };
  }
}

// function that handles http request and response
// returns http response with appropriate headers and file from http request
async function httpRequestListener(req, res) {
  if (req.method === "POST" && req.url === "/login") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const params = new URLSearchParams(body);
      const username = params.get("username");
      const password = params.get("password");

      const user = USERS.find((d) => d.username === username);

      if (!user) {
        res.writeHead(401, { "Content-Type": "text/html" });
        res.end("Username not found");
        return;
      }

      const sessionId = crypto.randomUUID();

      const cookie = cookiesLib.serialize("cookieSet", sessionId, {
        httpOnly: true,
        maxAge: 60 * 5, // 5 minutes
      });

      USERS.push({ username: username, password: password });

      let UNIQUEUSERS = new Set(USERS.map(JSON.stringify));
      UNIQUEUSERS = Array.from(UNIQUEUSERS).map(JSON.parse);

      //console.log(UNIQUEUSERS);

      UNIQUEUSERS.forEach(async (d) => {
        if (d.username === username && d.password === password) {
          const result = await fs.readFile(path.join(__dirname, "..", "dist", "profile.html"));
          res.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": cookie });
          res.end(result);
          return;
        }
      });
    });

    return;
  }

  // handle resquest
  let filePath = getFilePath(req.url);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname];
  let contentData = await fileGetter(filePath);

  // handle response
  if (checkAuth && req.url === "/login") {
    const result = await fs.readFile(path.join(__dirname, "..", "dist", "profile.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(result);
  } else {
    if (contentData.status === "success") {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(contentData.data);
    } else {
      if (contentData.data.code === "ENOENT") {
        filePath = getFilePath(req.url, (error = true));
        let html404 = await fileGetter(filePath);
        res.writeHead(404, { "Content-Type": contentType });
        res.end(html404.data);
      }
    }
  }
}

const server = http.createServer(httpRequestListener);

server.listen(port, hostname, (error) => {
  if (error) {
    console.log("something is not right: error ", error);
  } else {
    console.log(`server is listening on port http://${hostname}:${port}`);
  }
});
