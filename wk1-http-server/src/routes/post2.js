import { parse as parseUrl } from "url";
import { loginUser } from "./html.js";
import { postCompany, postUser } from "./api.js";

export const postRequestListener = async (req, res, ROOT_PATH) => {
  const pathUrl = parseUrl(req.url, true).pathname;

  switch (true) {
    case pathUrl.startsWith("/api"):
      switch (true) {
        case pathUrl === "/api/company":
          postCompany(req, res);
          break;
        case pathUrl === "/api/user":
          postUser(req, res);
          break;
        default:
          break;
      }
      break;
    default:
      loginUser(req, res, ROOT_PATH);
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
