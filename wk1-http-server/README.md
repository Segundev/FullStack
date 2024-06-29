# RESTful API Documentation

## Company Endpoints

### List Companies

- **GET** `http://localhost:3000/api/companies`

### Get Company by ID

- **GET** `http://localhost:3000/api/company/1`

### Create Company

- **POST** `http://localhost:3000/api/company`
  - **Body**: `id=companyID&name=comapanyName&address=address`

### Update Company

- **PUT** `http://localhost:3000/api/company/1`
  - **Body**: `id=companyID&name=NewComapanyName&address=newAddress`

### Delete Company

- **DELETE** `http://localhost:3000/api/company/1`

## User Endpoints

### List Users and their Companies

- **GET** `http://localhost:3000/api/users`

### Get User by ID and their Company

- **GET** `http://localhost:3000/api/user/1`

### Create User

- **POST** `http://localhost:3000/api/user`
  - **Body**: `name=NewUsername&email=NewComapnyId&company=companyId`

### Update User

- **PUT** `http://localhost:3000/api/user/1`
  - **Body**: `name=NewUsername&email=NewComapnyId&company=companyId`

### Delete User

- **DELETE** `http://localhost:3000/api/user/1`
