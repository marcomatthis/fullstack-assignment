# Fullstack Assignment

A fullstack web application built with TypeScript, React, Redux, Express, and Node.js. It allows users to register, login, and visualize historical loan rate data from the VALR API on a responsive chart or in a table.

---

## Prerequisites

Please make sure you have the following installed on your machine:

- Node.js (v18 or later)
- npm (v9 or later)

---

## Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/marcomatthis/fullstack-assignment.git
cd fullstack-assignment
```

2. Create a `.env` file in the `backend` folder with the following keys:

```
VALR_API_KEY=your_valr_api_key
VALR_SECRET=your_valr_secret
```

---

## Install Dependencies

Install all dependencies for both frontend and backend:

```bash
npm run install-all
```

---

## Running the Application (Development)

To run both frontend and backend in development mode:

```bash
npm run dev
```

- Frontend runs at: `http://localhost:3000`
- Backend runs at: `http://localhost:5050`

---

## Production Build

To build and run the project for production:

```bash
npm run build       # Builds both backend and frontend
npm run serve       # Starts the production frontend and backend
```

- Frontend runs at: `http://localhost:3000`
- Backend runs at: `http://localhost:5050`

---

## Design Choices

- **State Management**: Redux was chosen for state management. This was necessary to store the session state of the user and subsequently be used to determine whether a user is logged in before displaying certain pages and elements. Only logged in users were able to reach the loans page. This state is also used to decide whether the header should be displayed or not.
- **Session-based Authentication with backend verification**: Session-based Authentication is used on the application. This session is however validated by the backend. This ensures safety against browser session tampering. This not only allows sessions to persist between page refreshes, but also between browser reloads. This session persists until the user clicks logout.
- **Redux-Forms for data capture**: Redux-Form is chosen for form management as it has built in handling of complex form behavior as well as the ability to handle the redux-thunk middleware, which was used to perform API calls to the backend for registration and login.
- **Recharts**: Recharts was chosen to display loan rates in a chart. It was selected for its simplicity and customizability to build responsive loan rate visualizations.
- **Separation of Concerns**: The project is structured with completely separate backend and frontend folders, each with its own `package.json`. This ensures a clear boundary between the server-side and client-side logic. A root `package.json` is also specified which allows the frontend and backend to be run concurrently which simplifies development and testing.
- **Frontend Design**: The frontend is composed of modular React components. These components were kept to a single-responsibility principle as far as possible, thus promoting reusability.
- **Client-Side Routing with React Router**: React Router was used to manage navigation within the single-page application without requiring full page reloads. This improves user experience by enabling fast transitions between views such as login, registration, and the loan rates page.
- **Error Handling**: API failures (e.g. failed login attempt or failed session checks) are handled gracefully on both the backend and frontend, either through errors or redirects. This ensures that the app does not break due error responses.
- **Controller-Based Backend Architecture**: The backend is organized using controller modules to handle specific domains such as authentication and loan data. This separation of concerns improves maintainability and readability by keeping route definitions clean and delegating logic to dedicated controllers.

---

## Assumptions

- The duration that is selected on the loans page refers to the total time range of the graph/table.
- The window to which the aggregation is applied is a subset of the duration. This was logically chosen as:
  - daily: 1 hour window
  - weekly: 1 day window
  - monthly: 1 day window
  - yearly: 1 month window
- The person accessing this assignment has their own VALR API key and secret key.
- Users should remain logged in even on page refresh or browser restarts, as long as the session cookie is valid.
- Frontend assumes backend runs at `http://localhost:5050` during development.

---

## Sample Credentials

You can register a new user using the register form, a sample set of credentials include:

```
Email: test@valr.com    # Valid email
Password: test1234      # Password of at least 8 characters
```

---

## Folder Structure

```
fullstack-assignment/
├── backend/
│   ├── src/
│   ├── .env           # Required for secrets
│   └── ...
├── frontend/
│   ├── src/
│   └── ...
├── package.json       # Root runner
└── README.md
```

---

## Troubleshooting

If port `5050` for the backend is unavailable please add a `PORT` environment variable to your `.env` file in the backend folder and choose an available port. Also change the port of the `proxy` in the `package.json` found under the frontend folder to the same port.

---
