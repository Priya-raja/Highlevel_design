# AGENTS.md

## Project

Auth Service for a scalable WhatsApp-style chat application.

This service is part of a microservices architecture.

Current services:

* auth-service
* chat-service

Future services:

* api-gateway
* notification-service
* media-service

---

## Purpose

The auth-service is responsible for:

* User registration
* User login
* Password hashing
* JWT generation
* JWT verification
* Refresh token management (future)

The auth-service must NOT manage:

* Conversations
* Messages
* Socket.IO rooms
* Chat business logic

---

## Technology Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* ES Modules
* bcryptjs
* jsonwebtoken

---

## Architecture

Use feature-based architecture.

Preferred structure:

src/
├── config/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middleware/
├── models/
├── utils/

Controllers should be thin.

Business logic belongs in services.

Database access belongs in repositories.

---

## Coding Standards

* Use async/await
* Use ES Modules
* Use proper HTTP status codes
* Validate inputs
* Never store plaintext passwords
* Use bcrypt for hashing
* Use JWT for authentication

---

## API Conventions

Success:

{
"success": true,
"data": {}
}

Error:

{
"success": false,
"message": "Error message"
}

---

## Current Milestone

Build:

1. MongoDB connection
2. User model
3. Register API
4. Login API
5. JWT middleware

Do not implement refresh tokens yet.

---

## Future Milestones

Phase 2:

* Refresh tokens
* Token rotation

Phase 3:

* API Gateway integration

Phase 4:

* Service-to-service authentication

Phase 5:

* Horizontal scaling
* Redis
* Kubernetes
