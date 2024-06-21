import { parse as parseUrl } from "url";
import { renderHTML } from "./html.js";
import { getAllCompanies, getAllUsers, getCompany, getUser } from "./api.js";

export const getRequestListener = async (req, res, ROOT_PATH) => {
  const pathUrl = parseUrl(req.url, true).pathname;

  switch (true) {
    case pathUrl.startsWith("/api"):
      switch (true) {
        case pathUrl === "/api/companies":
          getAllCompanies(res);
          break;
        case pathUrl === "/api/users":
          getAllUsers(res);
          break;
        case /^\/api\/company\/\d+$/.test(pathUrl):
          getCompany(res, pathUrl);
          break;
        case /^\/api\/user\/\d+$/.test(pathUrl):
          getUser(res, pathUrl);
          break;
        default:
          break;
      }
      break;
    default:
      renderHTML(req, res, ROOT_PATH);
      break;
  }

  /* if (pathUrl.startsWith("/api")) {
    if (pathUrl === "/api/companies") {
      getAllCompanies(res);
    } else if (pathUrl === "/api/users") {
      getAllUsers(res);
    } else if (pathUrl.match(/^\/api\/company\/\d+$/)) {
      getUser(res, pathUrl);
    }
  } else {
    renderHTML(req, res, ROOT_PATH);
  } */
};
