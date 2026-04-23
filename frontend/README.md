# Agile Project Management Frontend

A modern, clean React frontend for managing projects, user stories, and tasks with a beautiful UI built with Tailwind CSS.

## Features

✨ **Project Management**
- Create, view, update, and delete projects
- Real-time project statistics dashboard
- Quick navigation between projects

📚 **Hierarchical Work Tracking**
- Project → User Story → Task structure
- Expand/collapse user stories to view nested tasks
- Full CRUD operations for all levels

🎯 **Task Management**
- Create tasks with title, description, status, due date, and assignee
- Track task status (To Do, In Progress, Done)
- Quick task updates and deletions
- Due date tracking

🎨 **Beautiful UI/UX**
- Clean, modern design with Tailwind CSS
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Intuitive modals for create/edit operations
- Real-time feedback with notifications

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling and responsive design
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library
- **date-fns** - Date formatting

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Badge.jsx      # Status and priority badges
│   │   ├── Button.jsx     # Button variants
│   │   ├── Card.jsx       # Card components
│   │   ├── FormElements.jsx  # Form inputs
│   │   ├── Header.jsx     # Top navigation
│   │   ├── Modal.jsx      # Modal dialog
│   │   ├── Notification.jsx  # Toast notifications
│   │   ├── ProjectForm.jsx
│   │   ├── TaskForm.jsx
│   │   └── UserStoryForm.jsx
│   ├── context/
│   │   └── AppContext.jsx # Global state (projects, stories, tasks)
│   ├── hooks/
│   │   └── useApp.js      # Hook to access AppContext
│   ├── pages/
│   │   ├── Dashboard.jsx  # Main dashboard with project list
│   │   └── ProjectDetails.jsx  # Project detail view with nested stories/tasks
│   ├── services/
│   │   └── api.js         # Axios API client and endpoints
│   ├── App.jsx            # Main app with routing
│   ├── index.css          # Tailwind and global styles
│   └── main.jsx           # React entry point
├── index.html             # HTML template
├── package.json
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm 8+
- Backend API running on `http://localhost:3000`

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env.local file** (optional, if backend is on different port)
   ```bash
   copy .env.example .env.local
   ```
   
   Update `VITE_API_URL` if needed:
   ```
   VITE_API_URL=http://localhost:3000
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

The Vite dev server has automatic proxy configuration that redirects `/api` calls to `http://localhost:3000`, so API calls work seamlessly.

### Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Component Overview

### Layout Components
- **Header** - Top navigation bar with logo and branding
- **Notification** - Toast notifications for success/error messages

### UI Components
- **Button** - Multiple variants (primary, secondary, danger, outline, ghost)
- **Card** - Reusable card containers with header/body sections
- **Modal** - Reusable modal dialog with customizable size
- **Badge** - Status and priority indicators

### Form Components
- **FormElements** - Input, TextArea, Select fields with validation
- **ProjectForm** - Create/edit project form
- **UserStoryForm** - Create/edit user story form with status/priority
- **TaskForm** - Create/edit task form with status, due date, assignee

### Pages
- **Dashboard** - Main page showing all projects, statistics, and project creation
- **ProjectDetails** - Detailed project view with nested user stories and tasks

## State Management

Using **React Context API** (`AppContext.jsx`):
- Centralized state for projects, user stories, tasks
- Loading and error states
- Toast notification methods (`showSuccess`, `showError`)

Access state anywhere with the `useApp()` hook:
```jsx
import { useApp } from '../hooks/useApp'

function MyComponent() {
  const { projects, showSuccess, showError } = useApp()
  // ...
}
```

## API Integration

The frontend communicates with the backend through the **API service layer** (`src/services/api.js`):

```javascript
// Projects
projectsAPI.getAll()
projectsAPI.getById(id)
projectsAPI.create(data)
projectsAPI.update(id, data)
projectsAPI.delete(id)

// User Stories
userStoriesAPI.getByProject(projectId)
userStoriesAPI.create(projectId, data)
userStoriesAPI.update(id, data)
userStoriesAPI.delete(id)

// Tasks
tasksAPI.getByStory(storyId)
tasksAPI.create(storyId, data)
tasksAPI.update(id, data)
tasksAPI.delete(id)
```

## Key Features Explained

### Dashboard
- **Statistics** - Shows total projects, active projects, completed projects
- **Project Cards** - Grid view of all projects with hover effects
- **Quick Create** - "New Project" button to create projects without navigating
- **Responsive** - Adapts to different screen sizes

### Project Details
- **Expandable Stories** - Click any story to expand and view its tasks
- **Inline Editing** - Edit/delete buttons for projects, stories, and tasks
- **Full CRUD** - Complete create, read, update, delete for all entities
- **Status Tracking** - Visual badges for task status (To Do, In Progress, Done)
- **Date Formatting** - Human-readable date displays

## Design Decisions

1. **Context API over Redux** - Simpler for this project scope, sufficient for state management
2. **Tailwind CSS** - Utility-first approach for fast, consistent styling
3. **Vite over CRA** - Faster development and build times
4. **Hierarchical Display** - Expandable structure to show relationships without navigation
5. **Modal-based Forms** - In-context editing without page navigation
6. **Responsive Grid** - Mobile-first approach with responsive cards

## Styling

The frontend uses **Tailwind CSS** for all styling with:
- Custom color palette (primary blue theme)
- Responsive breakpoints (mobile, tablet, desktop)
- Smooth animations and transitions
- Form styling via `@tailwindcss/forms` plugin
- Custom scrollbar styling

### Key Customizations
- Primary color: Blue (extending Tailwind's color palette)
- Custom animations: `fadeIn`, `slideUp`
- Form components: Enhanced with focus states and error styling

## Performance Optimizations

- **Code Splitting** - Lazy loading not necessary for this app size
- **Event Delegation** - Efficient event handling in lists
- **Memoization** - React Context prevents unnecessary re-renders
- **Async Fetching** - Parallel API calls for better performance
- **Responsive Images** - Optimized for all screen sizes

## Error Handling

- **API Errors** - Caught and displayed as toast notifications
- **Form Validation** - Client-side validation with error messages
- **Network Errors** - Graceful handling with user feedback
- **Empty States** - Clear messaging when no data exists

## Future Improvements

- [ ] Search and filtering for projects/stories/tasks
- [ ] Sorting by priority, due date, status
- [ ] User authentication and team member management
- [ ] Real-time collaboration with WebSockets
- [ ] Task comments and activity history
- [ ] File attachments
- [ ] Email notifications
- [ ] Dark mode support
- [ ] Bulk operations on tasks
- [ ] Custom statuses and priorities
- [ ] Reporting and analytics
- [ ] Mobile app version

## Troubleshooting

### Backend not connecting
- Ensure backend is running on `http://localhost:3000`
- Check `VITE_API_URL` in `.env.local`
- Check browser console for CORS errors

### Styling not applied
- Make sure Tailwind CSS is built (should be automatic in dev mode)
- Clear cache: `npm run build` then reload

### Components not updating
- Check if data flows through Context properly
- Use React DevTools to inspect Context values
- Verify API responses are correct format

## Contributing

1. Follow the existing component structure
2. Use consistent naming conventions (PascalCase for components)
3. Maintain responsive design in all new components
4. Test on mobile, tablet, and desktop

## License

This project is part of the Agile Project Management Tool assignment.
