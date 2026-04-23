# Assignment Checklist

## Requirement Coverage

| Requirement | Status | Evidence |
| --- | --- | --- |
| Frontend application | Satisfied | React app in `frontend/` |
| Backend APIs | Satisfied | Express API in `backend/src` |
| Persistent storage | Satisfied | SQLite via Prisma in `backend/prisma` |
| Hierarchical work items | Satisfied | `Project -> UserStory -> Task` Prisma relationships |
| Ability to create, view, update, organize data | Satisfied | CRUD endpoints and dashboard/project detail UI |
| Async/background workflow | Satisfied | Daily report job in `backend/src/jobs/dailyReport.js` |
| API documentation | Satisfied | Swagger at `/api-docs` and API notes in `BACKEND_API_INTEGRATION.md` |
| Clear README and project overview | Satisfied | `README.md` and `PROJECT_OVERVIEW.md` |
| Documented database schema | Satisfied | `DATABASE_SCHEMA.md` and `schema.prisma` |
| Design decisions and tradeoffs | Satisfied | `README.md` and `PROJECT_OVERVIEW.md` |
| Security considerations | Satisfied | `README.md` security section |
| Brief AI usage note | Satisfied | `README.md` AI usage section |
| Improvements with more time | Satisfied | `README.md` improvement section |

## Extra Features Currently Included

These are not strictly required by the assignment but are present:

- User authentication with JWT
- Password hashing with bcrypt
- Dark mode
- Framer Motion animations
- dnd-kit drag and drop Kanban board


- Toast notifications
- Skeleton loaders
- Swagger UI
- Winston file logging
- Morgan HTTP logging
- Helmet security headers
- Rate limiting
- Frontend design system documentation
- Deployment documentation
- Multiple generated frontend summary/reference documents

## Known Scope Tradeoffs

- Project data is shared across authenticated users. Team/workspace membership and per-project authorization are not implemented yet.
- Task assignee is a text field, not a foreign key to a team member.
- Daily reports are logged, not stored in a dedicated database table.
- Automated tests are not currently present.

