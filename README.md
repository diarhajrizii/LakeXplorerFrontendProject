# LakeXplorer Frontend Project

LakeXplorer Frontend is a React-based web application that allows users to explore different lakes, log in/register, and view lake details and sightings.

## Project Structure

- **App.js**: Entry point for the application.
- **Routes.js**: File containing routes for different pages.
- **Pages**:
  - **Lakes**: Displays a list of lakes available for exploration.
  - **Login**: Provides a form for users to log in.
  - **Register**: Allows users to create a new account.
  - **LakeSightings**: Shows details and sightings of a specific lake.
- **Components**:
  - **NavigationBar**: Component for the application's navigation bar.
  - **AddLakeSightingModal**: Modal component for adding new lake sightings.


## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

## Available Scripts

- `npm start`: Starts the development server.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production to the `build` folder.

## Usage

1. Ensure the backend server is running.
2. Start the frontend server using `npm start`.
3. Access the application via the specified port (default: `http://localhost:3000`).

## Components

- **NavigationBar**: Component for the application's navigation bar.
- **Lakes**: Component displaying a list of available lakes.
- **Login**: Component for user login.
- **Register**: Component for user registration.
- **LakeSightings**: Component to view details and sightings of a specific lake.

## Libraries & Dependencies

- React
- React Router DOM
- Axios
- Bootstrap
- React Bootstrap
- React Toastify

## Functionality

- **Login**:
  - Users can log in using their credentials.
  - On successful login, a JWT token is stored in the local storage.
- **Register**:
  - New users can create an account by providing necessary details.
- **Lakes**:
  - Displays a list of lakes fetched from the backend.
  - Allows users to explore various lakes and view their details.
- **LakeSightings**:
  - Shows detailed information and sightings of a specific lake.
  - Users can add new sightings for the lake.
  - Allows users to delete their sightings.
  - Users can like or unlike a lake sighting.

## Available Endpoints

- **POST /api/v1/register**: Register a new user.
- **POST /api/v1/login**: Log in and obtain a JWT token.
- **GET /api/v1/lakes**: Get a list of available lakes.
- **GET /api/v1/lakes/:lakeId**: Get details of a specific lake.
- **GET /api/v1/lake/sightings/:lakeId**: Get sightings for a specific lake.
- **POST /api/v1/lake/sightings/:lakeId**: Add a new lake sighting.
- **DELETE /api/v1/lake/sightings/:sightingId**: Delete a specific lake sighting.
- **POST /api/v1/lake/sightings/:sightingId/like**: Like a lake sighting.
- **DELETE /api/v1/lake/sightings/:sightingId/like**: Unlike a lake sighting.


## Error Handling

- Error messages are displayed using toast notifications to inform users about any issues encountered during login or data fetching.

## Contact Information

For any queries or support:

- Email: Diarhajrizi@gmail.com
- Phone: +38349435123
