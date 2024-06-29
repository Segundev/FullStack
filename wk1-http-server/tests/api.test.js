import { getAllCompanies } from "../src/routes/api";

// const url = "http://localhost:3000";

describe("GET /api/companies", () => {
  it("should get all companies", async () => {
    const data = await getAllCompanies();
    expect(data).toEqual([
      { id: 1, name: "Acme Inc", address: "123 Main St" },
      { id: 2, name: "Widgets Inc", address: "456 Elm St" },
      { id: 3, name: "Globex Corp", address: "789 Oak St" },
    ]);
  });
});

/* describe("POST /api/company", () => {
  it("should create a new item", async () => {
    const response = await fetch(`${url}/api/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: 4, name: "10Layer", address: "Utrecht" }),
    });
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toEqual({ id: 4, name: "10Layer", address: "Utrecht" });
  });
  it("should return all items with item added", async () => {
    const response = await fetch(`${url}/api/companies`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual([
      { id: 1, name: "Acme Inc", address: "123 Main St" },
      { id: 2, name: "Widgets Inc", address: "456 Elm St" },
      { id: 3, name: "Globex Corp", address: "789 Oak St" },
      { id: 4, name: "10Layer", address: "Utrecht" },
    ]);
  });
});

describe("DELETE/api/company/4", () => {
  it("should delete last item", async () => {
    const response = await fetch(`${url}/api/company/4`, {
      method: "DELETE",
    });
    expect(response.status).toBe(204);
  });
  it("should return all items with last item deleted", async () => {
    const response = await fetch(`${url}/api/companies`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual([
      { id: 1, name: "Acme Inc", address: "123 Main St" },
      { id: 2, name: "Widgets Inc", address: "456 Elm St" },
      { id: 3, name: "Globex Corp", address: "789 Oak St" },
    ]);
  });
});

describe("GET /api", () => {
  it("should return 200 OK", async () => {
    const response = await fetch(`${url}/api/`);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({ message: "API is working" });
  });
}); */

// api.test.js

/* import { getAllCompanies, postCompany, deleteCompany, getAllUsers, postUser, deleteUser } from "../src/routes/api.js";

import { getCompaniesDB, getPeopleDB, insertCompanyDB, saveCompanyDB, insertPeopleDB, savePeopleDB } from "../utils/db"; */

// // Mock the database functions
// jest.mock("../utils/db");

// describe("API tests with mocks", () => {
//   let res;

//   beforeEach(() => {
//     res = {
//       writeHead: jest.fn(),
//       end: jest.fn(),
//     };
//   });

//   describe("GET /api/companies", () => {
//     it("should get all companies", async () => {
//       const mockCompanies = [
//         { id: 1, name: "Acme Inc", address: "123 Main St" },
//         { id: 2, name: "Widgets Inc", address: "456 Elm St" },
//         { id: 3, name: "Globex Corp", address: "789 Oak St" },
//       ];

//       getCompaniesDB.mockResolvedValue(mockCompanies);

//       await getAllCompanies(res);

//       expect(res.writeHead).toHaveBeenCalledWith(200, { "Content-Type": "application/json" });
//       expect(res.end).toHaveBeenCalledWith(JSON.stringify(mockCompanies));
//     });
//   });

//   describe("POST /api/company", () => {
//     it("should create a new company", async () => {
//       const newCompany = { id: 4, name: "10Layer", address: "Utrecht" };
//       const mockCompanies = [
//         { id: 1, name: "Acme Inc", address: "123 Main St" },
//         { id: 2, name: "Widgets Inc", address: "456 Elm St" },
//         { id: 3, name: "Globex Corp", address: "789 Oak St" },
//       ];

//       getCompaniesDB.mockResolvedValue(mockCompanies);
//       insertCompanyDB.mockResolvedValue(newCompany);

//       const req = {
//         on: jest.fn().mockImplementation((event, callback) => {
//           if (event === "data") callback(JSON.stringify(newCompany));
//           if (event === "end") callback();
//         }),
//       };

//       await postCompany(req, res);

//       expect(res.writeHead).toHaveBeenCalledWith(201, { "Content-Type": "application/json" });
//       expect(res.end).toHaveBeenCalledWith(JSON.stringify(newCompany));
//     });
//   });

//   describe("DELETE /api/company/:id", () => {
//     it("should delete a company", async () => {
//       const mockCompanies = [
//         { id: 1, name: "Acme Inc", address: "123 Main St" },
//         { id: 2, name: "Widgets Inc", address: "456 Elm St" },
//         { id: 3, name: "Globex Corp", address: "789 Oak St" },
//         { id: 4, name: "10Layer", address: "Utrecht" },
//       ];

//       getCompaniesDB.mockResolvedValue(mockCompanies);
//       saveCompanyDB.mockResolvedValue(mockCompanies.slice(0, -1));

//       const pathUrl = "/api/company/4";

//       await deleteCompany(res, pathUrl);

//       expect(res.writeHead).toHaveBeenCalledWith(204, { "Content-Type": "application/json" });
//       expect(res.end).toHaveBeenCalledWith(JSON.stringify({}));
//     });
//   });

//   describe("GET /api/users", () => {
//     it("should get all users", async () => {
//       const mockUsers = [
//         { id: 1, name: "John Doe", email: "john@example.com", company: 1 },
//         { id: 2, name: "Jane Doe", email: "jane@example.com", company: 2 },
//       ];

//       getPeopleDB.mockResolvedValue(mockUsers);

//       await getAllUsers(res);

//       expect(res.writeHead).toHaveBeenCalledWith(200, { "Content-Type": "application/json" });
//       expect(res.end).toHaveBeenCalledWith(JSON.stringify(mockUsers));
//     });
//   });

//   describe("POST /api/user", () => {
//     it("should create a new user", async () => {
//       const newUser = { id: 3, name: "Alice", email: "alice@example.com", company: 3 };
//       const mockUsers = [
//         { id: 1, name: "John Doe", email: "john@example.com", company: 1 },
//         { id: 2, name: "Jane Doe", email: "jane@example.com", company: 2 },
//       ];

//       getPeopleDB.mockResolvedValue(mockUsers);
//       insertPeopleDB.mockResolvedValue(newUser);

//       const req = {
//         on: jest.fn().mockImplementation((event, callback) => {
//           if (event === "data") callback(JSON.stringify(newUser));
//           if (event === "end") callback();
//         }),
//       };

//       await postUser(req, res);

//       expect(res.writeHead).toHaveBeenCalledWith(201, { "Content-Type": "application/json" });
//       expect(res.end).toHaveBeenCalledWith(JSON.stringify(newUser));
//     });
//   });

//   describe("DELETE /api/user/:id", () => {
//     it("should delete a user", async () => {
//       const mockUsers = [
//         { id: 1, name: "John Doe", email: "john@example.com", company: 1 },
//         { id: 2, name: "Jane Doe", email: "jane@example.com", company: 2 },
//         { id: 3, name: "Alice", email: "alice@example.com", company: 3 },
//       ];

//       getPeopleDB.mockResolvedValue(mockUsers);
//       savePeopleDB.mockResolvedValue(mockUsers.slice(0, -1));

//       const pathUrl = "/api/user/3";

//       await deleteUser(res, pathUrl);

//       expect(res.writeHead).toHaveBeenCalledWith(204, { "Content-Type": "application/json" });
//       expect(res.end).toHaveBeenCalledWith(JSON.stringify({}));
//     });
//   });
// });

// import { jest } from "@jest/globals";

// import { getAllCompanies } from "../src/routes/api.js";
