# Node.js & Express Blog API

## Project Overview

The Node.js & Express Blog API is a RESTful API developed for a Blog System and User Management application.

The project was built using Node.js, Express.js, MongoDB, and Mongoose, following the MVC (Model-View-Controller) architecture.

The system provides secure authentication, user management, blog post management, comments, role-based authorization, request validation, image uploading, and advanced post querying features.

---

## Team Members

| Member | Assigned Part |
|---|---|
| مينا كيرلس منصور بطرس | Part 1 - Setup + Database + Error Handling |
| أدهم محمد فتحي محمد | Part 2 - Authentication |
| حسن أحمد محمد قبيصي | Part 3 - Users |
| Rodaina Gomaa Altir | Part 4 - Posts |
| معتصم محمد معوض | Part 5 - Comments |
| محمد صبري طه حسبو حسن | Part 6 - Advanced Features + Testing |

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- Joi
- Multer
- Helmet
- CORS
- Express Rate Limit
- dotenv

---

## Main Features

### Authentication

- User Registration
- User Login
- Password Hashing
- JWT Authentication
- Token Expiration
- Authentication Middleware
- Rate Limiting

### User Management

- Get All Users
- Get User by ID
- Update User
- Delete User
- Role-Based Authorization
- Owner Authorization
- Admin Authorization
- Passwords are excluded from responses

### Blog Posts

- Create Post
- Get All Posts
- Get Post by ID
- Update Post
- Delete Post
- Post Ownership Authorization
- Author Relationship
- Categories
- Tags
- Cover Image Upload
- Published Status

### Comments

- Add Comment to a Post
- Delete Comment
- Comment Ownership Authorization
- User and Post Relationships

### Advanced Features

- Pagination
- Search by title and content
- Filter by category
- Filter by author
- Sort posts

### Validation and Security

- Joi Request Validation
- JWT Authentication
- Role-Based Authorization
- Password Hashing
- Helmet Security Headers
- CORS
- Rate Limiting
- Centralized Error Handling

---

## Project Architecture

The project follows the MVC architecture.

The request flow is:

```text
Client Request
      ↓
    Route
      ↓
  Middleware
      ↓
  Controller
      ↓
    Model
      ↓
   MongoDB
   ## Project Structure

```text
Node-Express-Blog-API/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── post.controller.js
│   └── comment.controller.js
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── validate.middleware.js
│   ├── upload.middleware.js
│   └── role.middleware.js
│
├── models/
│   ├── User.model.js
│   ├── Post.model.js
│   └── Comment.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── post.routes.js
│   └── comment.routes.js
│
├── validations/
│   ├── auth.validation.js
│   ├── user.validation.js
│   ├── post.validation.js
│   └── comment.validation.js
│
├── utils/
│   ├── AppError.js
│   └── asyncWrapper.js
│
├── uploads/
│
├── app.js
├── server.js
├── package.json
└── package-lock.json