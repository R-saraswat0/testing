# Agile Project Management Tool - Frontend

A modern, visually appealing React frontend for an Agile Project Management Tool featuring real-time collaboration, drag-and-drop task management, and responsive design.

## 🎯 Features

### Core Features
- **📊 Dashboard** - Overview of all projects with statistics and progress tracking
- **📋 Project Management** - Create, edit, and delete projects with detailed descriptions
- **👥 User Stories** - Organize work into user stories with status and priority tracking
- **✅ Task Management** - Create, manage, and track tasks with due dates and assignments
- **🎯 Kanban Board** - Visual task management with drag-and-drop support
- **🔄 Real-time Updates** - Instant updates across all views
- **🌙 Dark Mode** - Full dark mode support with persistent settings
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **✨ Smooth Animations** - Framer Motion animations for enhanced UX
- **🎨 Modern UI** - Clean, professional design inspired by tools like Jira and Linear

### UI/UX Enhancements
- ✅ Loading skeletons during data fetching
- ✅ Empty states with helpful guidance
- ✅ Toast notifications (success, error, warning, info)
- ✅ Smooth transitions and micro-interactions
- ✅ Accessibility features (keyboard navigation, screen reader support)
- ✅ Focus management and visual feedback

## 🛠️ Tech Stack

- **React 18.2** - UI library
- **React Router 6.14** - Client-side routing
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Framer Motion 10.16** - Animation library
- **Lucide React 0.263** - Icon library
- **Axios 1.4** - HTTP client
- **dnd-kit 6.0** - Drag and drop functionality
- **date-fns 2.30** - Date utilities
- **Vite 4.4** - Build tool and dev server

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Button.jsx              # Button component with variants
│   │   ├── Card.jsx                # Card component with sections
│   │   ├── Modal.jsx               # Modal/Dialog component
│   │   ├── Header.jsx              # Top navigation header
│   │   ├── Sidebar.jsx             # Side navigation
│   │   ├── Notification.jsx        # Toast notifications
│   │   ├── Badges.jsx              # Status and priority badges
│   │   ├── FormElements.jsx        # Form inputs and controls
│   │   ├── SkeletonLoaders.jsx     # Loading placeholders
│   │   ├── EmptyState.jsx          # Empty state displays
│   │   ├── KanbanBoard.jsx         # Kanban board container
│   │   ├── KanbanColumn.jsx        # Kanban column component
│   │   ├── KanbanTask.jsx          # Draggable task card
│   │   ├── ProjectForm.jsx         # Project creation/edit form
│   │   ├── UserStoryForm.jsx       # User story form
│   │   └── TaskForm.jsx            # Task form
│   ├── pages/
│   │   ├── Dashboard.jsx           # Main dashboard page
│   │   └── ProjectDetails.jsx      # Project detail view
│   ├── context/
│   │   └── AppContext.jsx          # Global app state
│   ├── hooks/
│   │   └── useApp.js               # Custom hook for context
│   ├── services/
│   │   └── api.js                  # API client setup
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Pages & Components

### Dashboard Page
- 📊 Statistics cards (total projects, active, completed)
- 🎨 Hero banner with quick action
- 📋 Project grid with search and filter
- ✨ Loading skeletons during fetch
- 🎯 Empty state for new users

**Key Features:**
- Create new projects
- View project statistics
- Quick access to projects
- Visual progress indicators

### Project Details Page
- 📌 Project header with actions (edit, delete)
- 📈 Statistics bar with task counts
- 👀 Dual view modes (list and Kanban)
- 📋 User stories list with expand/collapse
- ✅ Inline task management
- 🎯 Drag-and-drop support

**Key Features:**
- Create/edit/delete user stories
- Create/edit/delete tasks
- Toggle between list and Kanban views
- Task assignment and due dates
- Priority and status tracking

### Components

#### Button
- 6 variants: primary, secondary, danger, outline, ghost, icon
- 3 sizes: sm, md, lg
- Loading state with spinner
- Hover and tap animations
- Full dark mode support

#### Card
- Header, body, and footer sections
- Hover effects
- Dark mode styling
- Shadow management

#### Modal
- Customizable sizes
- Smooth animations
- Proper focus management
- Escape key handling

#### Form Elements
- Input, TextArea, Select
- Checkbox, RadioGroup
- Error states with icons
- Help text support
- Disabled states
- Full dark mode support

#### Badges
- Status badges (Todo, In Progress, Done)
- Priority badges (Low, Medium, High)
- Custom colors and styling

#### Kanban Board
- Drag-and-drop with dnd-kit
- Multiple columns (Todo, In Progress, Done)
- Smooth animations
- Visual feedback during drag
- Task previews

## 🎨 Design System

### Colors
- **Primary**: Blue (#0ea5e9 / #0284c7)
- **Success**: Green (#10b981)
- **Danger**: Red (#ef4444)
- **Warning**: Yellow (#f59e0b)
- **Neutral**: Gray/Slate (#6b7280 / #64748b)

### Typography
- **Headings**: Font weight 700-900
- **Body**: Font weight 400-600
- **Scale**: 12px to 48px

### Spacing
- Base unit: 4px
- Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### Border Radius
- Small: 6px
- Medium: 8px
- Large: 12px

## 🌓 Dark Mode

The application includes full dark mode support:

- **Toggle**: Available in header
- **Persistence**: Settings saved to localStorage
- **Automatic**: Respects system preferences
- **Complete**: All components styled for dark mode

To enable dark mode manually:
1. Click the sun/moon icon in the header
2. Settings are automatically saved
3. Reload the page to see persistence

## 🎯 State Management

### AppContext
Global state managed through React Context:
- Projects data
- User stories
- Tasks
- Loading states
- Notification messages
- Dark mode setting

### Custom Hooks
**useApp.js** - Simplified access to AppContext

```javascript
const { 
  projects, 
  showSuccess, 
  showError, 
  loading, 
  darkMode,
  toggleDarkMode 
} = useApp()
```

## 🔌 API Integration

### Endpoints

**Projects**
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project details
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

**User Stories**
- `GET /projects/:projectId/user-stories` - Get all stories
- `POST /projects/:projectId/user-stories` - Create story
- `PUT /user-stories/:id` - Update story
- `DELETE /user-stories/:id` - Delete story

**Tasks**
- `GET /user-stories/:storyId/tasks` - Get all tasks
- `POST /user-stories/:storyId/tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## 🎬 Animations

Powered by Framer Motion:
- Page transitions
- Component entrance animations
- Hover effects
- Loading states
- Drag and drop feedback
- Notification toasts

## ♿ Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast compliance
- ✅ Screen reader support
- ✅ Form validation messages

## 📱 Responsive Design

Breakpoints:
- **Mobile**: 0px - 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: 1024px+ (lg)

Features:
- ✅ Mobile sidebar toggle
- ✅ Flexible grid layouts
- ✅ Touch-friendly buttons
- ✅ Optimized for all screen sizes

## 🔒 Security

- ✅ Input validation on forms
- ✅ XSS protection through React
- ✅ CORS configuration ready
- ✅ Secure API communication with HTTPS ready
- ✅ Environment variable management

## 📊 Performance

- ✅ Code splitting with lazy loading
- ✅ Optimized bundle size (~200KB gzipped)
- ✅ Efficient re-renders with React.memo
- ✅ Image optimization
- ✅ CSS minification with Tailwind
- ✅ Build optimization with Vite

## 🚨 Error Handling

- ✅ Network error handling
- ✅ Form validation with user feedback
- ✅ Loading states
- ✅ Empty state handling
- ✅ Toast notifications
- ✅ Graceful degradation

## 📝 Usage Examples

### Creating a Project
1. Click "New Project" in dashboard
2. Fill in project name and description
3. Click "Create Project"
4. View in project grid

### Managing Tasks
1. Navigate to project details
2. Create user stories
3. Add tasks to stories
4. Switch to Kanban view
5. Drag tasks between columns
6. Set due dates and assignees

### Using Dark Mode
1. Click the sun/moon toggle in header
2. All UI updates automatically
3. Preference is saved for next session

## 🐛 Debugging

Enable debug logging:
```javascript
// In browser console
localStorage.setItem('DEBUG', 'true')
```

View network requests:
- Open browser DevTools
- Go to Network tab
- Monitor API calls

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [React Router](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)

## 🤝 Contributing

Guidelines for contributing:
1. Follow the existing code structure
2. Use consistent naming conventions
3. Add comments for complex logic
4. Test all changes
5. Update this README as needed

## 📄 License

This project is proprietary and confidential.

## 👨‍💻 Author

Built with ❤️ using React and Tailwind CSS

---

**Version**: 1.0.0  
**Last Updated**: 2024
