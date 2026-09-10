# Notebook – MERN Stack Project

## 1. Project Overview

**Notebook** is a full-stack web application developed using the **MERN stack (MongoDB, Express.js, React.js, and Node.js)**. The main purpose of this project is to provide users with a simple and convenient platform to create, manage, and organize their personal notes.

The application also includes user authentication and a Contact Us feature through which users can send messages to the administrator.

---

## 2. Objectives

The main objectives of the Notebook project are:

* To provide an easy-to-use online note management system.
* To allow users to securely register and log in.
* To provide complete CRUD operations for notes.
* To store user and note data securely in MongoDB.
* To provide a responsive and user-friendly interface.
* To allow users to contact the administrator through the Contact Us form.

---

## 3. Technologies Used

### Frontend

* React.js
* Vite
* React bits
* React Toastify
* Tailwind CSS
* React Router
* Lucide React

### Backend

* Node.js
* Express.js
* Mongoose
* MongoDB
* JWT
* bcrypt
* Nodemailer
* dotenv
* CORS

### Development Tools

* Visual Studio Code
* Git and GitHub
* Postman
* MongoDB Atlas

---

## 4. Main Features

### User Authentication

Users can create an account and log in to the application. Passwords are securely hashed using bcrypt, and authentication is handled using JWT.

### Note Management

Users can:

* Create notes
* View notes
* Edit notes
* Delete notes

This provides complete CRUD functionality for managing personal notes.

### Contact Us

Users can submit their:

* Name
* Email
* Subject
* Message

The submitted message is stored in MongoDB and can also be sent to the administrator through **Nodemailer**.

### Responsive Interface

The application is designed to provide a responsive experience across desktop, tablet, and mobile devices using Tailwind CSS.

---

## 5. Project Working

The application follows a frontend and backend architecture.


User
  ↓
React Frontend
  ↓
Express REST API
  ↓
Controller
  ↓
Mongoose
  ↓
MongoDB


For the Contact Us feature:


User
  ↓
Contact Form
  ↓
React
  ↓
Express API
  ↓
MongoDB
  ↓
Nodemailer
  ↓
Administrator Email


---

## 6. Database

The application uses **MongoDB** to store application data.

The main data models include:

* User
* Note
* Contact

Mongoose is used to define schemas and interact with MongoDB.

---

## 7. API Testing

The backend APIs were tested using **Postman** before integrating them with the React frontend.

API operations include:

* User Signup
* User Login
* Create Note
* Get Notes
* Update Note
* Delete Note
* Contact Form Submission

---

## 8. Conclusion

The Notebook project demonstrates the development of a complete full-stack web application using the MERN stack. It combines a responsive React frontend with a Node.js and Express backend, MongoDB database, authentication, CRUD operations, and email functionality.

This project helped in gaining practical experience with **React, REST APIs, MongoDB, authentication, backend development, API testing, and full-stack application deployment**.
