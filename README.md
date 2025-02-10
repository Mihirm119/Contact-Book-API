# Contact Book API
A RESTful API for managing contact information using Node.js, Express, and MongoDB.

## Features
- User authentication with JWT
- CRUD operations for managing contacts
- Admin routes for user management
- Middleware for error handling
- Uses **Mongoose** for MongoDB interaction
- File uploads using **Multer**

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Other Dependencies:** bcrypt, multer, cookie-parser, morgan, nodemon


## Start The Server
npm start


## API Endpoints
GET	/contacts	Get all contacts
POST	/contacts	Add a new contact
GET	/contacts/:id	Get a specific contact
PUT	/contacts/:id	Update a contact
DELETE	/contacts/:id	Delete a contact
