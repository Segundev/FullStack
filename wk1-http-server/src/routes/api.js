/*
When I GET /api/company, I get a list of companies --done
When I GET /api/company/:id, I get a single company -- done
When I POST /api/company, I create a new company
When I PUT /api/company/:id, I update a company
When I DELETE /api/company/:id, I delete a company

Same for users
When I GET /api/user, I get a list of users AND their associated companies -- done
When I GET /api/user/:id, I get a single user AND their associated company --done
When I POST /api/user, I create a new user
When I PUT /api/user/:id, I update a user
When I DELETE /api/user/:id, I deleteS a user
*/
import { getCompaniesDB, getPeopleDB } from "../utils/db.js";

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
