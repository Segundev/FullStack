// app.mjs

import http from "http";
import { parse as parseUrl } from "url";
import { parse as parseQuery } from "querystring";

let companies = [
  { id: 1, name: "Company A" },
  { id: 2, name: "Company B" },
];

let users = [
  { id: 1, name: "User 1", companyId: 1 },
  { id: 2, name: "User 2", companyId: 2 },
];

const server = http.createServer((req, res) => {
  const parsedUrl = parseUrl(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  const sendResponse = (statusCode, data) => {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  if (path.startsWith("/api/company")) {
    handleCompanyRoutes(method, path, req, res, sendResponse);
  } else if (path.startsWith("/api/user")) {
    handleUserRoutes(method, path, req, res, sendResponse);
  } else {
    sendResponse(404, { message: "Route not found" });
  }
});

const handleCompanyRoutes = (method, path, req, res, sendResponse) => {
  if (method === "GET" && path === "/api/company") {
    sendResponse(200, companies);
  } else if (method === "GET" && path.match(/^\/api\/company\/\d+$/)) {
    const id = parseInt(path.split("/")[3], 10);
    const company = companies.find((c) => c.id === id);
    company ? sendResponse(200, company) : sendResponse(404, { message: "Company not found" });
  } else if (method === "POST" && path === "/api/company") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      const { name } = parseQuery(body);
      const newCompany = { id: companies.length + 1, name };
      companies.push(newCompany);
      sendResponse(201, newCompany);
    });
  } else if (method === "PUT" && path.match(/^\/api\/company\/\d+$/)) {
    const id = parseInt(path.split("/")[3], 10);
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      const { name } = parseQuery(body);
      const companyIndex = companies.findIndex((c) => c.id === id);
      if (companyIndex > -1) {
        companies[companyIndex] = { id, name };
        sendResponse(200, companies[companyIndex]);
      } else {
        sendResponse(404, { message: "Company not found" });
      }
    });
  } else if (method === "DELETE" && path.match(/^\/api\/company\/\d+$/)) {
    const id = parseInt(path.split("/")[3], 10);
    companies = companies.filter((c) => c.id !== id);
    sendResponse(204, {});
  } else {
    sendResponse(404, { message: "Route not found" });
  }
};

const handleUserRoutes = (method, path, req, res, sendResponse) => {
  if (method === "GET" && path === "/api/user") {
    const usersWithCompanies = users.map((user) => {
      const company = companies.find((c) => c.id === user.companyId);
      return { ...user, company };
    });
    sendResponse(200, usersWithCompanies);
  } else if (method === "GET" && path.match(/^\/api\/user\/\d+$/)) {
    const id = parseInt(path.split("/")[3], 10);
    const user = users.find((u) => u.id === id);
    if (user) {
      const company = companies.find((c) => c.id === user.companyId);
      sendResponse(200, { ...user, company });
    } else {
      sendResponse(404, { message: "User not found" });
    }
  } else if (method === "POST" && path === "/api/user") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      console.log(body);
      const { name, email, company } = parseQuery(body);
      const newUser = { id: users.length + 1, name, email, company: parseInt(company, 10) };
      console.log(newUser);
      users.push(newUser);
      sendResponse(201, newUser);
    });
  } else if (method === "PUT" && path.match(/^\/api\/user\/\d+$/)) {
    const id = parseInt(path.split("/")[3], 10);
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      const { name, companyId } = parseQuery(body);
      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex > -1) {
        users[userIndex] = { id, name, companyId: parseInt(companyId, 10) };
        sendResponse(200, users[userIndex]);
      } else {
        sendResponse(404, { message: "User not found" });
      }
    });
  } else if (method === "DELETE" && path.match(/^\/api\/user\/\d+$/)) {
    const id = parseInt(path.split("/")[3], 10);
    users = users.filter((u) => u.id !== id);
    sendResponse(204, {});
  } else {
    sendResponse(404, { message: "Route not found" });
  }
};

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
