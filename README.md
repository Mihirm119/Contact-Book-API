# Contactbook API

A RESTful API for managing user contacts using **Node.js**, **Express**, and **MongoDB**.

## Features

- User authentication with JWT
- CRUD operations for contacts and users
- Admin routes for user management
- Profile picture upload using Multer
- Secure API with authentication middleware
- MongoDB database integration with Mongoose

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Other Dependencies:** bcrypt, multer, cookie-parser, morgan, nodemon

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/contact-api.git
   cd contact-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```
   MONGO_URI=mongodb://localhost:27017/Contact_API
   PORT=5000
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Admin Management

| Method | Endpoint            | Description                                     |
| ------ | ------------------- | ----------------------------------------------- |
| GET    | `/admin/read`       | Allows an admin to view only their own details. |
| POST   | `/admin/signup`     | Register an admin                               |
| POST   | `/admin/login`      | Admin login                                     |
| PUT    | `/admin/update/:id` | Update an admin                                 |
| DELETE | `/admin/delete/:id` | Delete an admin                                 |

### User Management

| Method | Endpoint            | Description                                    |   |
| ------ | ------------------- | ---------------------------------------------- | - |
| GET    | `/users/read`       | Allows an user to view only their own details. |   |
| POST   | `/users/signup`     | Register a new user (with profile picture)     |   |
| POST   | `/users/login`      | User login                                     |   |
| PATCH  | `/users/update/:id` | Update user details (with profile picture)     |   |
| DELETE | `/users/delete/:id` | Delete a user                                  |   |

### Contact Management

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/contacts/create`     | Create a new contact |
| GET    | `/contacts/read`       | Get all contacts     |
| PUT    | `/contacts/update/:id` | Update a contact     |
| DELETE | `/contacts/delete/:id` | Delete a contact     |

### Usage Example (Postman or Curl)

```sh
curl -X POST "http://localhost:5000/contacts/create" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"name": "John Doe", "email": "john@example.com", "phone": "1234567890"}'
```
