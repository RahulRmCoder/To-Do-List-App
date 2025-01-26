# To-Do-List-App
# Todo List Application

This project is a full-stack Todo List application that allows users to create, update, delete, and manage their tasks. The application includes user authentication to ensure each user's tasks are private and securely stored in a database.

---

## Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Application Workflow](#application-workflow)
- [Acknowledgements](#acknowledgements)

---

## Project Description
The Todo List application enables users to:
- Register and log in securely.
- Create, edit, and delete tasks.
- View all tasks in a clean, user-friendly interface.
- Maintain task data securely with user-specific access.

---

## Features
1. **User Authentication**:
   - Secure registration and login using hashed passwords.
   - Session-based authentication to manage user access.

2. **Task Management**:
   - Add new tasks.
   - Edit existing tasks.
   - Delete completed tasks.
   - Tasks are sorted and displayed in an intuitive list.

3. **Responsive Design**:
   - User-friendly interface built using EJS templates.

4. **Session Management**:
   - Secure session handling with cookie-based authentication.

---

## Technologies Used
- **Backend**:
  - Node.js and Express.js for server-side logic.
  - PostgreSQL for data storage.
  - bcrypt for password hashing.
- **Frontend**:
  - EJS for dynamic rendering.
  - HTML, CSS, and JavaScript for the UI.
- **Authentication**:
  - Secure session management.
  - Custom middleware to protect routes.

---

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/todo-list-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd todo-list-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the PostgreSQL database:
   - Create a database named `todolist`.
   - Use the following schema:
     ```sql
     CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(50) NOT NULL UNIQUE,
         email VARCHAR(100) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL
     );

     CREATE TABLE items (
         id SERIAL PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         user_id INT REFERENCES users(id) ON DELETE CASCADE
     );
     ```

5. Set up environment variables:
   - Create a `.env` file with the following:
     ```plaintext
     DB_USER=<your-database-username>
     DB_PASSWORD=<your-database-password>
     DB_HOST=localhost
     DB_PORT=5432
     DB_DATABASE=todolist
     ```
6. Start the server:
   ```bash
   npm start
   ```
7. Access the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Application Workflow
1. **Signup/Login**:
   - Navigate to `/signup` or `/login` to register or log in.

2. **Manage Tasks**:
   - Add tasks using the input field and submit button.
   - Edit tasks by clicking the pencil icon, modifying the text, and saving.
   - Delete tasks by selecting the checkbox next to them.

3. **Logout**:
   - Use the "Logout" button to securely end the session.

---

## Acknowledgements
This project was developed as a learning exercise for full-stack development. Special thanks to the open-source community for providing resources and tools.
