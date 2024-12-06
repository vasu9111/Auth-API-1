# Auth-API
Authentication API

# server

> REST APIs build with express.js

# Getting Started

- Node.js
- npm (Node Package Manager)
- Postman (for API testing)
- mongodb

# Install the required dependencies.

npm i express nodemon mongoose jsonwebtoken joi express-session cookie-parser dotenv-safe cors 

# Add module type in package.json for development:

"type": "module"

# Update the scripts section in env package.json for development:

"scripts": {
"start": "nodemon server.js"
},

# Running the Project

`npm start`

# start the server

Run `http://localhost:4000/` in postman in postman

# API Documentation :-

# Base URL :-

`http://localhost:4000/`

# Endpoints :-

- 1.  Registration page:-
      Method: POST
      URL: '/api/auth/registration/custom-validation'
      URL: '/api/auth/registration/joi-validation'
      URL: '/api/auth/registration/db-validation'

- 2.  Login page :-
      Method: POST
      URL: '/api/auth/login/custom-validation'
      URL: '/api/auth/login/joi-validation'

- 3.  Logout :-
      Method: GET
      URL: '/api/auth/logout'

- 4.  Private route:-
      Method: GET
      URL: '/api/page/private'

- 5.  Renew access token :-
      Method: POST
      URL: '/api/auth/refresh'
