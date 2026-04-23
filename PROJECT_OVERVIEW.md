# Project Overview

## Purpose

This application helps a small team plan and track work using a simple agile hierarchy:

```text
Project -> User Story -> Task
```

It is designed as a production-minded assignment project: simple enough to run locally, but organized with clear API boundaries, validation, authentication, persistence, and operational documentation.

## System Components

Frontend:
- React SPA built with Vite
- Login and registration screens
- Dashboard for projects
- Project details page for user stories and tasks
- List and Kanban task organization
- Shared component library for forms, cards, modals, buttons, badges, notifications, and loading states

Backend:
- Express REST API
- JWT authentication
- Prisma-backed SQLite persistence
- Swagger/OpenAPI docs
- Request logging, error handling, validation, rate limiting, and security headers
- Daily background report job

Database:
- `User`
- `Project`
- `UserStory`
- `Task`

## Request Flow

1. A user registers or logs in through the React frontend.
2. The backend validates credentials and returns a JWT plus user profile.
3. The frontend stores the session in local storage and attaches the token to API requests.
4. Protected backend routes verify the bearer token before reading or writing project data.
5. Controllers validate request bodies with Joi, then use Prisma to perform database operations.
6. Responses use a consistent `{ success, message, data }` shape.

## Data Model

Projects are the root planning object. Each project has many user stories. Each user story has many tasks. Tasks carry workflow information such as status, priority, assignee text, and due date.

The schema uses foreign keys and cascade deletes so child records do not become orphaned when a parent is removed.

## Async Workflow

The backend starts a scheduled daily report job when the server boots. The job:

- Runs at midnight.
- Finds tasks completed the previous day.
- Aggregates task counts by status and priority.
- Logs a structured report.
- Retries transient failures up to three times.
- Logs final failure without crashing the HTTP server.

This is intentionally lightweight for a SQLite local assignment while still demonstrating background processing and failure handling.

## Engineering Tradeoffs

- SQLite is used for simple local setup; PostgreSQL would be preferred for multi-user production use.
- Assignment by text keeps task ownership usable without adding a full team/member system.
- Project data is currently shared by authenticated users. A real small-team product should add workspace membership and authorization checks.
- Reports are logged rather than persisted in a dedicated table. Persisting them would be the next step if the UI needed reporting history.
- React Context is enough for this app size; larger workflows may benefit from TanStack Query or another server-state library.

## Security Notes

- Passwords are hashed with bcrypt.
- Protected routes require JWT bearer tokens.
- Input is validated before database writes.
- Prisma avoids manual SQL construction.
- Helmet adds common HTTP security headers.
- Rate limiting reduces basic abuse.
- Sensitive production configuration should come from environment variables.

## Documentation Map

- [README.md](./README.md): setup, architecture, security, tradeoffs, and assignment notes
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md): database schema documentation
- [BACKEND_API_INTEGRATION.md](./BACKEND_API_INTEGRATION.md): API reference notes
- `http://localhost:3000/api-docs`: interactive Swagger docs when backend is running
- [backend/prisma/schema.prisma](./backend/prisma/schema.prisma): Prisma source schema
