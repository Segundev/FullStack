import fs from "node:fs/promises";
import path from "node:path";
import cookiesLib from "cookie";
import { getPeopleDB } from "../utils/db.js";

const DB = await getPeopleDB();

export const postRequestListener = (req, res, ROOT_PATH) => {
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

  const sessionId = crypto.randomUUID();

  const cookie = cookiesLib.serialize("cookieSet", sessionId, {
    httpOnly: true,
    maxAge: 60 * 5, // 5 minutes
  });

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

    USERS.push({ username: username, password: password });

    let UNIQUEUSERS = new Set(USERS.map(JSON.stringify));
    UNIQUEUSERS = Array.from(UNIQUEUSERS).map(JSON.parse);

    //console.log(UNIQUEUSERS);

    UNIQUEUSERS.forEach(async (d) => {
      if (d.username === username && d.password === password) {
        const result = await fs.readFile(path.join(ROOT_PATH, "src", "templates", "profile.html"));
        res.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": cookie });
        res.end(result);
        return;
      }
    });
  });

  return;
};
