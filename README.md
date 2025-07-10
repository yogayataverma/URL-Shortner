# URL Shortener Backend

A URL Shortener backend built with NestJS, MongoDB, and JWT authentication. Users can register, log in, shorten URLs, and view statistics for their shortened links. The project includes rate limiting, custom short codes, and click tracking.

---

## Getting Started

### Prerequisites
- Node.js
- npm
- MongoDB instance
- Docker & Docker Compose

### Environment Variables
Copy .env.example to .env and fill in the required values:
- MONGO_URI — MongoDB connection string
- JWT_SECRET — Secret for JWT signing
- JWT_EXPIRES —  JWT expiration, default is 1d
- PORT —  Port to run the server, default is 3000

---

## Running Locally (Without Docker)

bash
npm install
cp .env.example .env
npm run build
npm run start:prod


The server will start on http://localhost:3000 by default.

---

## Running with Docker

bash
cp .env.example .env
docker-compose up --build


The API will be available at http://localhost:3000.

---

## Deployed Backend URL
> 
> https://url-shortner-ecnp.onrender.com/docs

---

## API Endpoints

### Auth
- POST /auth/register — Register a new user
- POST /auth/login — Log in and receive a JWT

### URL Shortening
- POST /api/shorten — Shorten a URL (requires JWT)
- GET /r/:shortCode — Redirect to the original URL
- GET /api/stats/:shortCode — Get stats for a short URL (requires JWT)

### Swagger Documentation
- [Swagger UI](http://localhost:3000/docs)

---

## Video Explanation
> 
> 

---

## Bonus Features Implemented
- *Rate Limiting:* Prevents abuse by limiting requests per user.
- *Custom Short Codes:* Users can specify their own short codes for URLs.
- *Click Tracking:* Tracks the number of times each short URL is used.
