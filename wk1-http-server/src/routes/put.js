import { parse as parseUrl } from "url";
import { changeCompany, changeUser } from "./api.js";

export const putRequestListener = async (req, res) => {
  const pathUrl = parseUrl(req.url, true).pathname;

  switch (true) {
    case pathUrl.startsWith("/api"):
      switch (true) {
        case /^\/api\/company\/\d+$/.test(pathUrl):
          changeCompany(req, res, pathUrl);
          break;
        case /^\/api\/user\/\d+$/.test(pathUrl):
          changeUser(req, res, pathUrl);
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
