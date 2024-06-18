/*
When I GET /api/company, I get a list of companies
When I GET /api/company/:id, I get a single company
When I POST /api/company, I create a new company
When I PUT /api/company/:id, I update a company
When I DELETE /api/company/:id, I delete a company

Same for users
When I GET /api/user, I get a list of users AND their associated companies
When I GET /api/user/:id, I get a single user AND their associated company
When I POST /api/user, I create a new user
When I PUT /api/user/:id, I update a user
When I DELETE /api/user/:id, I delete a user
*/

const companies = [
  {
    id: 1,
    name: "Acme Inc",
    address: "123 Main St",
  },
  {
    id: 2,
    name: "Widgets Inc",
    address: "456 Elm St",
  },
  {
    id: 3,
    name: "Globex Corp",
    address: "789 Oak St",
  },
];

const people = [
  {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    company: 1,
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@doe.com",
    company: 2,
  },
  {
    id: 3,
    name: "John Smith",
    email: "john@smith.com",
    company: 1,
  },
];

const getUser = (data, id) => {
  const result = data.filter((user) => user.id === id);
  console.log(result);
};

getUser(people, 1);
