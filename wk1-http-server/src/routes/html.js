import fs from "node:fs/promises";
import path from "node:path";

import { mimeTypes } from "../utils/mimetype.js";
import { getFile, getFilePath } from "../utils/files.js";

function checkAuth(req) {
  const cookiesStatus = req.headers.cookie !== undefined ? true : false;
  return cookiesStatus;
}

export const renderHTML = async (req, res, ROOT_PATH) => {
  let filePath = getFilePath(req.url, false, ROOT_PATH);
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname];
  let contentData = await getFile(filePath);

  // handle response
  if (checkAuth && req.url === "/login") {
    const result = await fs.readFile(path.join(ROOT_PATH, "src", "templates", "profile.html"));
    res.end(result);
  } else {
    if (contentData.status === "success") {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(contentData.data);
    } else {
      if (contentData.data.code === "ENOENT") {
        filePath = getFilePath(req.url, true, ROOT_PATH);
        let html404 = await getFile(filePath);
        res.writeHead(404, { "Content-Type": contentType });
        res.end(html404.data);
      }
    }
  }
};
