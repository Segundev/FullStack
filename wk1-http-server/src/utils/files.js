import fs from "node:fs/promises";
import path from "node:path";

export const getFile = async (path) => {
  try {
    const result = await fs.readFile(path);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

export const getFilePath = (url, error = false, ROOT_PATH) => {
  let filePath;
  if (error) {
    filePath = path.join(ROOT_PATH, "src", "templates", "404.html");
  } else {
    filePath = path.join(ROOT_PATH, "src", "templates", url === "/" ? "index.html" : url);
  }

  return filePath;
};
