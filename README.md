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
5. Start the backend server using `npm start`.
6. 

### Frontend Setup

1. Navigate to the `frontend/` directory.
2. Install dependencies using `npm install`.
4. Start the frontend development server using `npm start`.

### Running the Application

- Access the frontend application at `http://localhost:3000`.
- Access the backend API endpoints at `http://localhost:3012/`.


### DBSchema
-- public.candidates definition

-- Drop table

-- DROP TABLE public.candidates;

CREATE TABLE public.candidates (
	candidate_id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	phone varchar(20) NULL,
	skills_qualifications text NULL,
	status varchar(50) NOT NULL,
	expected_salary numeric NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT candidates_pkey PRIMARY KEY (candidate_id)
);

-- public.candidate_experiences definition

-- Drop table

-- DROP TABLE public.candidate_experiences;

CREATE TABLE public.candidate_experiences (
	candidate_id int4 NULL,
	skill varchar NOT NULL,
	years int4 NOT NULL,
	experience_id serial4 NOT NULL,
	CONSTRAINT candidate_experiences_pk PRIMARY KEY (experience_id)
);


-- public.candidate_experiences foreign keys

ALTER TABLE public.candidate_experiences ADD CONSTRAINT candidate_experience_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(candidate_id);


-- public.experience_data definition

-- Drop table

-- DROP TABLE public.experience_data;

CREATE TABLE public.experience_data (
	id serial4 NOT NULL,
	technology varchar(50) NOT NULL,
	experience_years int4 NOT NULL,
	score int4 NOT NULL,
	conditon varchar NOT NULL,
	CONSTRAINT experience_data_pkey PRIMARY KEY (id)
);



