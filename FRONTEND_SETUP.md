# Frontend Setup & Quick Start Guide

## 🚀 Quick Setup

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

This will install all required packages:
- React 18
- React Router v6
- Tailwind CSS
- Axios
- Vite
- Lucide React icons
- date-fns for date formatting

### Step 2: Start Development Server
```bash
npm run dev
```

Open your browser to **http://localhost:5173**

### Step 3: Make sure backend is running
The frontend expects the backend API on `http://localhost:3000`

---

## 📁 What's Included

### Frontend Features

✅ **Dashboard Page**
- Project statistics (total, active, completed)
- Grid view of all projects
- Quick project creation button
- Beautiful empty state

✅ **Project Details Page**
- Full project information
- Edit/delete project functionality
- Expandable user stories
- Nested task viewing
- Inline editing for stories and tasks

✅ **Reusable Components**
- Button (5 variants)
- Card with header/body sections
- Modal dialogs
- Form inputs with validation
- Status and priority badges
- Toast notifications

✅ **State Management**
- Global Context API for projects, stories, tasks
- Loading states
- Error handling with toast notifications
- Success notifications

✅ **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Smooth animations
- Professional Tailwind CSS styling

---

## 🎨 UI/UX Highlights

### Color Scheme
- **Primary**: Blue (#0ea5e9)
- **Success**: Green
- **Error**: Red
- **Warning**: Yellow
- **Neutral**: Gray

### Components
1. **Header** - Branded top navigation
2. **Dashboard** - Project overview with statistics
3. **Cards** - Reusable containers with hover effects
4. **Modals** - For create/edit operations
5. **Badges** - For status and priority indicators
6. **Buttons** - Multiple variants for different actions
7. **Forms** - Input validation and error handling
8. **Notifications** - Toast messages for feedback

---

## 📊 Hierarchy Structure

```
Dashboard
├── Project Statistics (Cards)
├── Project List (Grid)
│   └── Click to View Details
│       │
│       └── Project Details Page
│           ├── Project Info (Header)
│           ├── User Stories (Expandable)
│           │   └── Click to Expand
│           │       └── Tasks (Nested List)
│           │           ├── Task Info
│           │           ├── Status Badge
│           │           ├── Edit Button
│           │           └── Delete Button
│           └── Modals for CRUD operations
```

---

## 🔗 API Integration

The frontend automatically connects to:
- `GET /projects` - Fetch all projects
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `GET /projects/:projectId/user-stories` - Get stories
- `POST /projects/:projectId/user-stories` - Create story
- `GET /user-stories/:storyId/tasks` - Get tasks
- `POST /user-stories/:storyId/tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

---

## 🎯 User Workflows

### Create a Project
1. Click "New Project" button on Dashboard
2. Fill in project name and description
3. Click "Create Project"
4. See it appear in the project grid

### Add User Stories
1. Click on a project to open details
2. Click "Add Story" button
3. Fill in title, description, status, priority
4. Click "Create Story"

### Add Tasks
1. Expand a user story (click the chevron)
2. Click "Add Task" button in the task section
3. Fill in task details (title, description, status, due date, assignee)
4. Click "Create Task"

### Edit/Delete Items
- Hover over any item for edit/delete buttons
- Edit opens a modal with pre-filled data
- Delete asks for confirmation first

---

## 🛠️ Development

### File Organization
```
src/
├── App.jsx           # Main router setup
├── index.css         # Tailwind styles
├── main.jsx          # React entry point
├── components/       # Reusable UI components
├── pages/            # Full page components
├── context/          # React Context
├── hooks/            # Custom React hooks
└── services/         # API calls
```

### Adding New Components

1. Create component in `src/components/`
2. Import and use in pages or other components
3. Follow naming conventions (PascalCase)
4. Use Tailwind CSS for styling
5. Support responsive design

### Styling Approach
- All styling uses Tailwind CSS utilities
- No CSS files needed for most components
- Custom animations in `index.css`
- Global styles apply via `@tailwind` directives

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (single column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns)

---

## 🧪 Testing the Frontend

1. **Test Data Flow**: 
   - Create a project on Dashboard
   - Navigate to it
   - Add user stories and tasks
   - Verify they display correctly

2. **Test Interactions**:
   - Edit project/story/task
   - Delete items (with confirmation)
   - Check error handling (try invalid data)

3. **Test Responsiveness**:
   - Resize browser window
   - Check mobile view (DevTools)
   - Test touch interactions on tablet

4. **Test Notifications**:
   - Create, edit, delete items
   - Verify success messages appear
   - Test error scenarios

---

## 🔗 Environment Variables

Create `.env.local` if backend is on different URL:
```
VITE_API_URL=http://localhost:3000
```

Default is `http://localhost:3000` if not specified.

---

## 📝 Build for Production

```bash
npm run build
```

This creates optimized build in `dist/` folder.

To test production build locally:
```bash
npm run preview
```

---

## 🐛 Common Issues

### Port Already in Use
If port 5173 is already in use, Vite will use the next available port. Check console output for the actual URL.

### CORS Errors
Ensure backend allows CORS from `http://localhost:5173`. Check backend CORS configuration.

### API Not Found
Make sure backend is running on `http://localhost:3000` and all endpoints exist.

### Styling Not Showing
Clear browser cache or do a hard refresh (Ctrl+Shift+R / Cmd+Shift+R).

---

## ✨ What Makes This Frontend Special

1. **Beautiful Design** - Modern, clean UI with professional styling
2. **Responsive** - Works perfectly on all devices
3. **Fast** - Built with Vite for lightning-fast dev experience
4. **Scalable** - Component-based architecture
5. **User-Friendly** - Intuitive workflows and clear feedback
6. **Well-Organized** - Clear folder structure and naming conventions
7. **Smooth** - Animations and transitions for polish
8. **Accessible** - Semantic HTML and good form practices

---

## 🚀 Next Steps

After frontend is running:
1. Build the backend API (Node.js/Express)
2. Set up SQLite database
3. Create all API endpoints
4. Test frontend + backend integration
5. Deploy to production

Enjoy! 🎉
