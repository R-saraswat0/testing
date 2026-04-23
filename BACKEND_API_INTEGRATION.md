# 📡 Backend & Frontend API Integration Reference

## API Endpoint Summary

### Base URL
```
http://localhost:3000
```

### All Endpoints

| Resource | Method | Endpoint | Frontend Call |
|----------|--------|----------|--------------|
| **Projects** | | | |
| | GET | `/projects` | `projectsAPI.getAll()` |
| | GET | `/projects/:id` | `projectsAPI.getById(id)` |
| | POST | `/projects` | `projectsAPI.create(data)` |
| | PATCH | `/projects/:id` | `projectsAPI.update(id, data)` |
| | DELETE | `/projects/:id` | `projectsAPI.delete(id)` |
| **User Stories** | | | |
| | GET | `/user-stories?projectId=1` | `userStoriesAPI.getByProject(projectId)` |
| | POST | `/user-stories` | `userStoriesAPI.create(data)` |
| | PATCH | `/user-stories/:id` | `userStoriesAPI.update(id, data)` |
| | DELETE | `/user-stories/:id` | `userStoriesAPI.delete(id)` |
| **Tasks** | | | |
| | GET | `/tasks?storyId=1` | `tasksAPI.getByStory(storyId)` |
| | POST | `/tasks` | `tasksAPI.create(data)` |
| | PATCH | `/tasks/:id` | `tasksAPI.update(id, data)` |
| | DELETE | `/tasks/:id` | `tasksAPI.delete(id)` |

---

## Request & Response Examples

### Projects API

#### GET /projects
Get all projects with nested user stories and tasks

**Frontend Call:**
```javascript
import { projectsAPI } from '@/services/api'

const response = await projectsAPI.getAll()
```

**Response:**
```json
{
  "success": true,
  "message": "Projects retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Mobile App Redesign",
      "description": "Redesign the mobile app",
      "createdAt": "2024-04-20T10:30:00Z",
      "updatedAt": "2024-04-20T10:30:00Z",
      "userStories": [
        {
          "id": 1,
          "projectId": 1,
          "title": "Design homepage",
          "description": "Create mockups",
          "status": "In Progress",
          "priority": "High",
          "createdAt": "2024-04-20T10:30:00Z",
          "updatedAt": "2024-04-20T10:30:00Z",
          "tasks": [
            {
              "id": 1,
              "userStoryId": 1,
              "title": "Create wireframes",
              "description": "Sketch wireframes",
              "status": "Todo",
              "priority": "High",
              "assignedTo": "John Doe",
              "dueDate": "2024-05-20T00:00:00Z",
              "createdAt": "2024-04-20T10:30:00Z",
              "updatedAt": "2024-04-20T10:30:00Z"
            }
          ]
        }
      ]
    }
  ],
  "count": 1
}
```

#### POST /projects
Create a new project

**Frontend Call:**
```javascript
const data = {
  name: "New Project",
  description: "Project description"
}
const response = await projectsAPI.create(data)
```

**Request Body:**
```json
{
  "name": "Mobile App Redesign",
  "description": "Redesign the mobile app for better UX"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "id": 1,
    "name": "Mobile App Redesign",
    "description": "Redesign the mobile app for better UX",
    "createdAt": "2024-04-20T10:30:00Z",
    "updatedAt": "2024-04-20T10:30:00Z"
  }
}
```

#### PATCH /projects/:id
Update a project

**Frontend Call:**
```javascript
const id = 1
const updates = {
  name: "Updated Name",
  description: "Updated description"
}
const response = await projectsAPI.update(id, updates)
```

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "description": "Updated description"
}
```

#### DELETE /projects/:id
Delete a project

**Frontend Call:**
```javascript
const id = 1
const response = await projectsAPI.delete(id)
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

---

### User Stories API

#### GET /user-stories?projectId=1
Get user stories by project

**Frontend Call:**
```javascript
const projectId = 1
const response = await userStoriesAPI.getByProject(projectId)
```

**Response:**
```json
{
  "success": true,
  "message": "User stories retrieved successfully",
  "data": [
    {
      "id": 1,
      "projectId": 1,
      "title": "Design homepage",
      "description": "Create mockups",
      "status": "In Progress",
      "priority": "High",
      "createdAt": "2024-04-20T10:30:00Z",
      "updatedAt": "2024-04-20T10:30:00Z",
      "tasks": []
    }
  ],
  "count": 1
}
```

#### POST /user-stories
Create a new user story

**Frontend Call:**
```javascript
const data = {
  projectId: 1,
  title: "Design homepage",
  description: "Create mockups",
  status: "Todo",
  priority: "High"
}
const response = await userStoriesAPI.create(data)
```

**Request Body:**
```json
{
  "projectId": 1,
  "title": "Design homepage",
  "description": "Create mockups for homepage",
  "status": "In Progress",
  "priority": "High"
}
```

#### PATCH /user-stories/:id
Update a user story

**Frontend Call:**
```javascript
const id = 1
const updates = {
  status: "Done",
  priority: "Medium"
}
const response = await userStoriesAPI.update(id, updates)
```

**Request Body:**
```json
{
  "status": "Done",
  "priority": "Medium"
}
```

---

### Tasks API

#### GET /tasks?storyId=1
Get tasks by user story

**Frontend Call:**
```javascript
const storyId = 1
const response = await tasksAPI.getByStory(storyId)
```

**Response:**
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": 1,
      "userStoryId": 1,
      "title": "Create wireframes",
      "description": "Design wireframes",
      "status": "Todo",
      "priority": "High",
      "assignedTo": "John Doe",
      "dueDate": "2024-05-20T00:00:00Z",
      "createdAt": "2024-04-20T10:30:00Z",
      "updatedAt": "2024-04-20T10:30:00Z"
    }
  ],
  "count": 1
}
```

#### POST /tasks
Create a new task

**Frontend Call:**
```javascript
const data = {
  userStoryId: 1,
  title: "Create wireframes",
  description: "Design wireframes",
  status: "Todo",
  priority: "High",
  assignedTo: "John Doe",
  dueDate: new Date("2024-05-20")
}
const response = await tasksAPI.create(data)
```

**Request Body:**
```json
{
  "userStoryId": 1,
  "title": "Create wireframes",
  "description": "Design wireframes for homepage",
  "status": "Todo",
  "priority": "High",
  "assignedTo": "John Doe",
  "dueDate": "2024-05-20T00:00:00Z"
}
```

#### PATCH /tasks/:id
Update a task

**Frontend Call:**
```javascript
const id = 1
const updates = {
  status: "In Progress",
  assignedTo: "Jane Smith"
}
const response = await tasksAPI.update(id, updates)
```

**Request Body:**
```json
{
  "status": "In Progress",
  "assignedTo": "Jane Smith",
  "priority": "Medium"
}
```

---

## Error Responses

### 400 Bad Request (Validation Error)
```json
{
  "success": false,
  "message": "\"name\" is required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Project not found"
}
```

### 429 Too Many Requests
```json
{
  "statusCode": 429,
  "message": "Too many requests from this IP, please try again later."
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Frontend Implementation Examples

### Getting Projects in Dashboard

```javascript
// src/pages/Dashboard.jsx
import { projectsAPI } from '@/services/api'
import { useApp } from '@/hooks/useApp'

export default function Dashboard() {
  const { projects, loading, showError } = useApp()

  useEffect(async () => {
    try {
      const response = await projectsAPI.getAll()
      setProjects(response.data.data)
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to load projects')
    }
  }, [])

  return (
    <div>
      {loading && <p>Loading projects...</p>}
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

### Creating a Project

```javascript
const handleCreateProject = async (formData) => {
  try {
    const response = await projectsAPI.create(formData)
    setProjects([...projects, response.data.data])
    showSuccess('Project created successfully')
  } catch (error) {
    showError(error.response?.data?.message || 'Failed to create project')
  }
}
```

### Updating Task Status (Kanban)

```javascript
const handleDragEnd = async (event) => {
  const { active, over } = event
  
  if (over && active.id !== over.id) {
    const newStatus = over.id.split('-')[0]
    
    try {
      await tasksAPI.update(taskId, { status: newStatus })
      // Update UI
      setTasks(updatedTasks)
      showSuccess('Task updated')
    } catch (error) {
      showError('Failed to update task')
    }
  }
}
```

---

## Health Check

### Verify Backend is Running

```bash
curl http://localhost:3000/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-04-20T10:30:00.000Z"
}
```

---

## Testing with cURL

### Get All Projects
```bash
curl http://localhost:3000/projects
```

### Create Project
```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Project",
    "description": "Testing the API"
  }'
```

### Update Project
```bash
curl -X PATCH http://localhost:3000/projects/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'
```

### Delete Project
```bash
curl -X DELETE http://localhost:3000/projects/1
```

---

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Response**: `429 Too Many Requests` when exceeded
- **Header**: `Retry-After` indicates when to retry

---

## CORS Configuration

Frontend URL is set via `FRONTEND_URL` environment variable.

**Default**: `http://localhost:5173`

To allow different frontend:
1. Update `backend/.env`
2. Set `FRONTEND_URL=https://your-frontend-url`
3. Restart backend

---

## API Documentation (Swagger/OpenAPI)

Interactive API documentation available at:
```
http://localhost:3000/api-docs
```

Test endpoints directly from browser!

---

**Frontend-Backend Integration Complete!** ✅
