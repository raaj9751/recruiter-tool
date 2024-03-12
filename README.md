# Recruiter Tool

The Recruiter Tool is a web application designed to help recruiters manage candidate information efficiently. It provides features such as adding new candidates, viewing candidate details, updating candidate status, and computing scores based on candidate experience with Node.js and ReactJS.

## Features

- Add new candidates with details including expected salary.
- View a list of candidates with computed scores based on Node.js and ReactJS experience.
- Update candidate status.
- Search for candidates by name, email, or other criteria.

## Technologies Used

- **Frontend**: ReactJS, React Router, Axios
- **Backend**: Node.js, Express.js, PostgreSQL
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL

## Project Structure

The project is structured as follows:

- **`backend/`**: Contains the backend server code.
  - **`controllers/`**: Controller functions for handling API requests.
  - **`models/`**: Database models and schema.
  - **`routes/`**: Defines API routes.
  - **`config/`**: Configuration files.
- **`frontend/`**: Contains the frontend React application.
  - **`components/`**: React components for UI elements.
  - **`pages/`**: React components representing different pages/routes.
  - **`services/`**: API service functions to interact with the backend.
  - **`styles/`**: CSS stylesheets.
- **`database/`**: Contains database migration files.
- **`scripts/`**: Scripts for setting up the project or running tasks.

## Setup Instructions

Follow these steps to set up the project:

### Backend Setup

1. Navigate to the `backend/` directory.
2. Install dependencies using `npm install`.
2. Install Express.js and the PostgreSQL Node.js driver (pg) using `npm install express pg`.
4. Run database migrations using `npm run migrate`.
5. Start the backend server using `node app.js`.
6. 

### Frontend Setup

1. Navigate to the `frontend/` directory.
2. Install dependencies using `npm install`.
4. Start the frontend development server using `npm start`.

### Running the Application

- Access the frontend application at `http://localhost:3000`.
- Access the backend API endpoints at `http://localhost:3012/`.

