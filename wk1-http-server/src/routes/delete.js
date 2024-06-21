import { parse as parseUrl } from "url";
import { deleteCompany, deleteUser } from "./api.js";

export const deleteRequestListener = async (req, res) => {
  const pathUrl = parseUrl(req.url, true).pathname;

  switch (true) {
    case pathUrl.startsWith("/api"):
      switch (true) {
        case /^\/api\/company\/\d+$/.test(pathUrl):
          deleteCompany(res, pathUrl);
          break;
        case /^\/api\/user\/\d+$/.test(pathUrl):
          deleteUser(res, pathUrl);
          break;
        default:
          break;
      }
      break;
    default:
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
