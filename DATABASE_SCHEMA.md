# Database Schema

The application uses SQLite through Prisma. The schema is defined in [backend/prisma/schema.prisma](./backend/prisma/schema.prisma).

## Entity Relationship

```text
User

Project
  1 -> many UserStory

UserStory
  many -> 1 Project
  1 -> many Task

Task
  many -> 1 UserStory
```

## Tables

### users

Stores authenticated application users.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `Int` | Primary key, autoincrement |
| `email` | `String` | Unique login email |
| `password` | `String` | bcrypt password hash |
| `name` | `String?` | Display name |
| `createdAt` | `DateTime` | Defaults to current time |

### projects

Stores top-level project records.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `Int` | Primary key, autoincrement |
| `name` | `String` | Required project name |
| `description` | `String?` | Optional description |
| `createdAt` | `DateTime` | Defaults to current time |
| `updatedAt` | `DateTime` | Automatically updated by Prisma |

Relationships:
- `Project` has many `UserStory` records.
- Deleting a project cascades to its user stories.

### user_stories

Stores agile user stories under a project.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `Int` | Primary key, autoincrement |
| `projectId` | `Int` | Foreign key to `projects.id` |
| `title` | `String` | Required story title |
| `description` | `String?` | Optional description |
| `status` | `String` | Defaults to `Todo`; expected values are `Todo`, `In Progress`, `Done` |
| `priority` | `String` | Defaults to `Medium`; expected values are `Low`, `Medium`, `High` |
| `createdAt` | `DateTime` | Defaults to current time |
| `updatedAt` | `DateTime` | Automatically updated by Prisma |

Relationships:
- `UserStory` belongs to one `Project`.
- `UserStory` has many `Task` records.
- Deleting a story cascades to its tasks.

Indexes:
- `projectId`

### tasks

Stores actionable task records under a user story.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `Int` | Primary key, autoincrement |
| `userStoryId` | `Int` | Foreign key to `user_stories.id` |
| `title` | `String` | Required task title |
| `description` | `String?` | Optional description |
| `status` | `String` | Defaults to `Todo`; expected values are `Todo`, `In Progress`, `Done` |
| `priority` | `String` | Defaults to `Medium`; expected values are `Low`, `Medium`, `High` |
| `assignedTo` | `String?` | Optional assignee text |
| `dueDate` | `DateTime?` | Optional due date |
| `createdAt` | `DateTime` | Defaults to current time |
| `updatedAt` | `DateTime` | Automatically updated by Prisma |

Relationships:
- `Task` belongs to one `UserStory`.

Indexes:
- `userStoryId`

## Notes

- SQLite is sufficient for the assignment and local demo.
- Prisma migrations live in `backend/prisma/migrations`.
- Production use should consider PostgreSQL and explicit workspace/team authorization.

