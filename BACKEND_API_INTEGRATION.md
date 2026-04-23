# API Reference

Base URL:

```text
http://localhost:3000
```

All project, story, and task endpoints require:

```http
Authorization: Bearer <jwt>
```

## Response Shape

Successful responses:

```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "totalPages": 0
  }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Validation error message"
}
```

## Auth

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/auth/register` | Create user and return JWT |
| `POST` | `/auth/login` | Authenticate user and return JWT |
| `GET` | `/auth/me` | Return current user |

## Projects

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/projects` | List projects |
| `POST` | `/projects` | Create project |
| `GET` | `/projects/:id` | Get project with nested stories/tasks |
| `PATCH`/`PUT` | `/projects/:id` | Update project |
| `DELETE` | `/projects/:id` | Delete project |
| `GET` | `/projects/:id/stories` | List stories for a project |

Supported list query parameters:

```text
page=1
limit=20
sortBy=createdAt|updatedAt
sortOrder=asc|desc
```

Story list endpoints also support:

```text
status=Todo|In Progress|Done
priority=Low|Medium|High
```

## User Stories

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/user-stories?projectId=:projectId` | Legacy list stories by project |
| `POST` | `/user-stories` | Create user story |
| `PATCH`/`PUT` | `/user-stories/:id` | Update user story |
| `DELETE` | `/user-stories/:id` | Delete user story |
| `GET` | `/stories/:id/tasks` | List tasks for a story |

## Tasks

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/tasks?storyId=:storyId` | Legacy list tasks by story |
| `POST` | `/tasks` | Create task |
| `PATCH`/`PUT` | `/tasks/:id` | Update task |
| `DELETE` | `/tasks/:id` | Delete task |

Task list endpoints support:

```text
page=1
limit=20
status=Todo|In Progress|Done
priority=Low|Medium|High
sortBy=createdAt|updatedAt
sortOrder=asc|desc
```

## Example Requests

Create a project:

```json
{
  "name": "Website Redesign",
  "description": "Refresh the marketing website"
}
```

Create a user story:

```json
{
  "projectId": 1,
  "title": "As a visitor, I can view pricing",
  "description": "Build the pricing section",
  "status": "Todo",
  "priority": "High"
}
```

Create a task:

```json
{
  "userStoryId": 1,
  "title": "Implement pricing cards",
  "description": "Create responsive pricing UI",
  "status": "Todo",
  "priority": "Medium",
  "assignedTo": "Asha",
  "dueDate": "2026-05-01"
}
```

Interactive Swagger docs are available at:

```text
http://localhost:3000/api-docs
```
