# TV Show Management System - Backend

This is the backend of the TV show management system, developed with Node.js, Express, and Mongoose.

## Features

- **User Authentication**: Registration, login, and logout.
- **TV Show Management**: Create, edit, and delete TV shows.
- **Likes**: Registered users can like and unlike TV shows.

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB running.

### Steps

1. Clone the repository:

    ```bash
    git clone <repository_url>
    cd tv-show-management-system/backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables by creating a `.env` file based on `.env.example`.

4. Start the server:

    ```bash
    npm start
    ```

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in and get a JWT token.

### TV Shows

- **GET /api/tvshows**: Get all TV shows.
- **GET /api/tvshows/:id**: Get a TV show by ID.
- **POST /api/tvshows**: Create a new TV show (requires authentication).
- **PUT /api/tvshows/:id**: Update a TV show by ID (requires authentication).
- **DELETE /api/tvshows/:id**: Delete a TV show by ID (requires authentication).
- **POST /api/tvshows/:id/like**: Like a TV show (requires authentication).
- **POST /api/tvshows/:id/dislike**: Unlike a TV show (requires authentication).

## Project Structure

```plaintext
backend/
├── controllers/
│   ├── tvShow.js
│   └── auth.js
├── models/
│   ├── tvShow.js
│   └── user.js
├── repositories/
│   ├── tvShow.js
│   └── user.js
├── routes/
│   ├── tvShow.js
│   └── auth.js
├── middlewares/
│   ├── verifyJWT.js
│   └── verifyAdminRole.js
├── app.js
├── server.js
└── .env.example