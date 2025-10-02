# Project Overview

This is a full-stack web application for managing cricket tournaments. It allows users to create and manage tournaments, teams, and matches. The application provides real-time updates using WebSockets.

## Architecture

The project is a monorepo with a `client` and a `server` directory.

- **Frontend:** The frontend is a React application built with Vite. It uses Material-UI for UI components, Redux for state management, `socket.io-client` for real-time communication with the backend, and framer motion for animations.

- **Backend:** The backend is a Node.js application using the Express framework. It uses MongoDB as the primary database, Redis for caching, and `socket.io` for real-time communication with the clients.

- **Services:** The application uses Docker to containerize the frontend, backend, MongoDB, and Redis services.

## Building and Running

To build and run the project, you can use the following commands:

1.  **Install Dependencies:**

    - Run `npm install` in the root directory.
    - Run `npm install` in the `client` directory.
    - Run `npm install` in the `server` directory.

2.  **Run the Application:**
    - Run `npm run dev` in the root directory. This will start the frontend, backend, Redis, and a Redis container.

## Development Conventions

- **Code Style:** The project uses ESLint for linting. You can run `npm run lint` in the `client` directory to check for linting errors.
- **Testing:** The client-side code has tests written with `vitest`. You can run `npm test` in the `client` directory to run the tests. The server-side code does not have a test script.
- **Commits:** Try to use concise commit messages.
- **Development:** Utilize Test Driven Development. Implement proper error handling, follow rest api conventions, and have good taste for UI UX as it is the main moat.
