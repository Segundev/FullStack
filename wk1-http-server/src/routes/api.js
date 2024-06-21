/*
When I GET /api/company, I get a list of companies --done
When I GET /api/company/:id, I get a single company -- done
When I POST /api/company, I create a new company -- done
When I PUT /api/company/:id, I update a company
When I DELETE /api/company/:id, I delete a company

Same for users
When I GET /api/user, I get a list of users AND their associated companies -- done
When I GET /api/user/:id, I get a single user AND their associated company --done
When I POST /api/user, I create a new user --done
When I PUT /api/user/:id, I update a user
When I DELETE /api/user/:id, I deleteS a user
*/
import { parse as parseQuery } from "querystring";
import {
  getCompaniesDB,
  getPeopleDB,
  insertPeopleDB,
  insertCompanyDB,
  saveCompanyDB,
  savePeopleDB,
} from "../utils/db.js";

const PEOPLE_DB_PATH = new URL("../../data/people.json", import.meta.url).pathname;
const COMPANIES_DB_PATH = new URL("../../data/companies.json", import.meta.url).pathname;

const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

// Function to get all companies
export const getAllCompanies = async (res) => {
  const data = await getCompaniesDB();
  data ? sendResponse(res, 200, data) : sendResponse(res, 404, { message: "Companies not found" });
};

// Function to get all users
export const getAllUsers = async (res) => {
  const data = await getPeopleDB();
  data ? sendResponse(res, 200, data) : sendResponse(res, 404, { message: "Users not found" });
};

export const getCompany = async (res, pathUrl) => {
  const data = await getCompaniesDB();
  const id = parseInt(pathUrl.split("/")[3], 10);
  const company = data.find((c) => c.id === id);
  company ? sendResponse(res, 200, company) : sendResponse(res, 404, { message: "Company not found" });
};

export const getUser = async (res, pathUrl) => {
  const data = await getPeopleDB();
  const id = parseInt(pathUrl.split("/")[3], 10);
  const user = data.find((c) => c.id === id);
  user ? sendResponse(res, 200, user) : sendResponse(res, 404, { message: "User not found" });
};

export const postUser = (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));
  req.on("end", async () => {
    const { name, email, company } = parseQuery(body);
    const users = await getPeopleDB();
    const newUser = { id: users.length + 1, name, email, company: parseInt(company, 10) };
    insertPeopleDB(newUser, getPeopleDB);
    sendResponse(res, 201, newUser);
  });
};

export const postCompany = (req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));
  req.on("end", async () => {
    const { id, name, address } = parseQuery(body);
    const newCompany = { id, name, address };
    insertCompanyDB(newCompany, getCompaniesDB);
    sendResponse(res, 201, newCompany);
  });
};

export const deleteUser = async (res, pathUrl) => {
  const id = parseInt(pathUrl.split("/")[3], 10);
  let users = await getPeopleDB();
  users = users.filter((u) => u.id !== id);
  await savePeopleDB(users);
  sendResponse(res, 204, {});
};

export const deleteCompany = async (res, pathUrl) => {
  const id = parseInt(pathUrl.split("/")[3], 10);
  let companies = await getCompaniesDB();
  companies = companies.filter((c) => c.id !== id);
  await saveCompanyDB(companies);
  sendResponse(res, 204, {});
};

export const changeUser = async (req, res, pathUrl) => {
  const id = parseInt(pathUrl.split("/")[3], 10);
  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));
  req.on("end", async () => {
    const { name, email, company } = parseQuery(body);
    const users = await getPeopleDB();
    const userIndex = users.findIndex((u) => u.id === id);
    if (userIndex > -1) {
      users[userIndex] = { id, name, email, company: parseInt(company, 10) };
      await savePeopleDB(users);
      sendResponse(res, 200, users[userIndex]);
    } else {
      sendResponse(res, 404, { message: "User not found" });
    }
  });
};

export const changeCompany = async (req, res, pathUrl) => {
  const id_endpoint = parseInt(pathUrl.split("/")[3], 10);
  let body = "";
  req.on("data", (chunk) => (body += chunk.toString()));
  req.on("end", async () => {
    const { id, name, address } = parseQuery(body);
    const companies = await getCompaniesDB();
    const companyIndex = companies.findIndex((u) => u.id === id_endpoint);
    if (companyIndex > -1) {
      companies[companyIndex] = { id, name, address };
      await saveCompanyDB(companies);
      sendResponse(res, 200, companies[companyIndex]);
    } else {
      sendResponse(res, 404, { message: "User not found" });
    }
  });
};
