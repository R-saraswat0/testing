# Agile Project Management

A full-stack project management application for a small team using a simple agile workflow. The app models work as `Project -> User Story -> Task`, supports authenticated users, and provides CRUD APIs plus a React UI for organizing work in list and Kanban views.

## Tech Stack

Frontend:
- React 18, Vite, React Router
- Tailwind CSS
- Axios
- dnd-kit for Kanban drag and drop
- Framer Motion and Lucide icons

Backend:
- Node.js and Express
- SQLite with Prisma ORM
- JWT authentication with bcrypt password hashing
- Joi validation
- Swagger/OpenAPI documentation
- Winston/Morgan logging
- node-cron background reporting job

## Quick Start

Backend:

```bash
cd backend
npm install
npm run db:migrate
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Default URLs:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- API docs: `http://localhost:3000/api-docs`
- Health check: `http://localhost:3000/health`

If you run the backend on another port, set `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:3000
```

## Core Features

- User registration and login
- JWT-protected project, user story, and task APIs
- Projects with nested user stories and tasks
- Create, view, update, and delete projects
- Create, view, update, and delete user stories
- Create, view, update, and delete tasks
- Task status workflow: `Todo`, `In Progress`, `Done`
- Priority values: `Low`, `Medium`, `High`
- Task assignment text field and due date
- Dashboard and project detail pages
- List and Kanban task organization
- Dark mode and responsive layout
- Daily background report generation

## Architecture Overview

The frontend is a Vite React single-page app. It uses route-level pages for login, registration, dashboard, and project details. Shared UI lives in `frontend/src/components`, app-level UI state lives in `frontend/src/context`, and HTTP calls are centralized in `frontend/src/services/api.js`.

The backend is an Express API organized by route, controller, middleware, utility, and background job layers. Prisma owns database access and schema migrations. Protected resources use `authMiddleware`, which validates JWT bearer tokens before allowing access.

Important paths:

```text
frontend/src/pages            React pages
frontend/src/components       Shared UI components
frontend/src/services/api.js  API client and auth session helpers
backend/src/routes            Express route definitions
backend/src/controllers       Request handlers
backend/src/middlewares       Auth, error handling, rate limiting
backend/src/jobs              Background workflows
backend/prisma/schema.prisma  Database schema
```

## Database Schema

SQLite is used through Prisma. The main tables are:

- `users`: authenticated users with unique email and hashed password
- `projects`: top-level project records
- `user_stories`: child records owned by a project
- `tasks`: child records owned by a user story

Relationship:

```text
Project 1 -> many UserStory
UserStory 1 -> many Task
```

Cascade behavior:
- Deleting a project deletes its user stories.
- Deleting a user story deletes its tasks.

See [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) and [backend/prisma/schema.prisma](./backend/prisma/schema.prisma) for the documented schema.

## API Documentation

Interactive Swagger documentation is served by the backend:

```text
GET /api-docs
```

Primary endpoints:

Auth:
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

Projects:
- `POST /projects`
- `GET /projects`
- `GET /projects/:id`
- `PATCH /projects/:id`
- `DELETE /projects/:id`

User Stories:
- `POST /user-stories`
- `GET /user-stories?projectId=:projectId`
- `PATCH /user-stories/:id`
- `DELETE /user-stories/:id`

Tasks:
- `POST /tasks`
- `GET /tasks?storyId=:storyId`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

Additional API notes are in [BACKEND_API_INTEGRATION.md](./BACKEND_API_INTEGRATION.md).

## Background Workflow

The backend starts a daily report job from [backend/src/jobs/dailyReport.js](./backend/src/jobs/dailyReport.js). It runs at midnight using `node-cron`, queries completed tasks and task status totals, and writes a structured report to the application logger.

Failure handling:
- The report generation work is retried up to 3 times.
- Retry delay increases linearly between attempts.
- Each failed attempt is logged with context.
- If all attempts fail, the job logs the final failure and does not crash the API server.

This keeps the async workflow simple for SQLite while still showing operational behavior for transient database or runtime failures.

## Security Considerations

Implemented:
- Password hashing with bcrypt
- JWT bearer authentication
- Protected project/story/task routes
- Input validation with Joi
- Prisma ORM to avoid hand-written SQL
- Helmet security headers
- API rate limiting
- Centralized error handling

Known tradeoffs:
- Projects are currently shared across all authenticated users. A production team product should add workspace/team membership and per-project authorization.
- SQLite is appropriate for the assignment and local demo, but PostgreSQL would be a better production default.
- JWT secret management depends on environment variables and must be replaced with a strong secret outside local development.
- There is no refresh-token rotation yet.

## Design Decisions and Tradeoffs

- SQLite keeps setup simple and reliable for local review.
- Prisma provides schema clarity, migrations, and type-safe query construction.
- REST endpoints are resource-oriented and intentionally small.
- The frontend uses a central API client so auth headers and 401 handling are consistent.
- The app supports assignment by text field rather than a full team/member model to keep the scope focused on the required hierarchy.
- The background job logs reports instead of adding a report table, which keeps persistence simple while demonstrating async processing and retry behavior.

## AI Usage

AI assistance was used during development to inspect the codebase, identify auth-flow issues, improve validation, and tighten documentation. Final implementation decisions were checked against the assignment requirements and the existing project structure.

## What I Would Improve Next

- Add teams/workspaces and project membership authorization.
- Add tests for controllers, auth middleware, and key React flows.
- Store generated daily reports in a database table and expose them in the UI.
- Add CI for linting, build, and migration checks.
- Add search/filtering across projects, stories, and tasks.
- Add audit history for status changes.
- Add refresh tokens and session management.
- Add Docker Compose for one-command local startup.

## Verification

Useful commands:

```bash
cd frontend
npm run build
```

```bash
cd backend
npm run build
```

Manual smoke test:
- Register a user.
- Log in.
- Create a project.
- Add user stories.
- Add tasks.
- Move tasks between `Todo`, `In Progress`, and `Done`.
- Confirm protected APIs reject requests without a bearer token.
