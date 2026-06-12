<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# AGENTS.md

## Project

Frontend for a WhatsApp-style chat application.

Current architecture:

Frontend (Next.js)
|
|
API Gateway (future)
|
-

|                       |
Auth Service        Chat Service

Current services:

* auth-service (port 8001)
* chat-backend (port 8000)

---

## Goal

Build a production-style chat application while learning:

* Authentication
* Authorization
* Real-time messaging
* System design
* Microservices
* Scalability

---

## Frontend Stack

* Next.js App Router
* TypeScript
* TailwindCSS
* Axios
* React Context
* Socket.IO Client (future)

---

## Coding Standards

* Use TypeScript everywhere
* Use functional components
* Use React hooks
* Avoid prop drilling
* Create reusable UI components
* Use async/await

---

## Folder Structure

app/
components/
hooks/
lib/
context/
types/
services/

---
## State Management

Use Zustand.

Create separate stores:

stores/
├── auth.store.ts
├── conversation.store.ts
├── message.store.ts
└── socket.store.ts

Do not use Redux.

Avoid unnecessary React Context when Zustand can be used.
## Authentication Requirements

Implement:

* Register page
* Login page
* Logout
* Auth Context
* Protected Routes

Store:

* JWT token
* Current user

Never hardcode user ids.

---

## Chat Requirements

Implement:

* Conversation List
* Chat Window
* Message Input
* Infinite Scroll
* Socket.IO Integration

Messages should render using authenticated user identity.

---

## Current Sprint

Build authentication UI.

Pages:

* /register
* /login

After successful login:

* Store JWT
* Store user
* Redirect to /chat

---

## Future Sprint

Create API Gateway and replace multiple frontend base URLs with a single gateway endpoint.

