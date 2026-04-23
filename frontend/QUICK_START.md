# Frontend Setup & Quick Start Guide

## ✨ What's Been Built

A production-ready Agile Project Management Tool frontend with:

### ✅ Complete Components
- **Navigation**: Sidebar with navigation menu + responsive mobile toggle
- **Header**: Search, notifications, dark mode toggle, profile menu
- **Buttons**: 6 variants with loading states and animations
- **Cards**: Flexible card component with header/body/footer
- **Forms**: Complete form system with validation
- **Modals**: Smooth modal dialogs
- **Badges**: Status and priority badges
- **Kanban Board**: Drag-and-drop task management
- **Notifications**: Toast messages (success, error, warning, info)

### ✅ Pages
- **Dashboard**: Project overview with statistics and grid
- **Project Details**: Detailed project view with list/Kanban modes

### ✅ Features
- 🌙 Full dark mode support with persistence
- 🎬 Smooth animations and transitions
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Loading states with skeleton loaders
- 🎯 Empty states with helpful guidance
- ♿ Accessibility features
- 🔒 Form validation
- 🎨 Professional design (Jira/Linear inspired)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Visit http://localhost:5173

### 3. Build for Production
```bash
npm run build
npm run preview
```

## 📖 Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Full page components
│   ├── context/          # Global state (AppContext)
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API client setup
│   ├── App.jsx           # Main app wrapper
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
└── package.json
```

## 🎨 Design Features

### Color System
- **Primary Blue**: #0ea5e9
- **Success Green**: #10b981
- **Danger Red**: #ef4444
- **Neutral Gray**: #6b7280

### Animations
- Page transitions
- Hover effects
- Loading spinners
- Drag & drop feedback
- Toast notifications

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Key Technologies

| Technology | Purpose |
|-----------|---------|
| React 18 | UI library |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Router | Navigation |
| Axios | API calls |
| dnd-kit | Drag & drop |
| Lucide | Icons |
| Vite | Build tool |

## 📱 Component Usage Examples

### Button
```jsx
import { Button } from './components/Button'
import { Plus } from 'lucide-react'

<Button icon={Plus} onClick={handleClick}>
  Create Project
</Button>

// With variants
<Button variant="danger" size="sm">Delete</Button>
<Button variant="outline">Cancel</Button>
```

### Card
```jsx
import { Card, CardHeader, CardBody } from './components/Card'

<Card hoverable onClick={handleClick}>
  <CardHeader title="Project Name" />
  <CardBody>Content here</CardBody>
</Card>
```

### Modal
```jsx
import { Modal } from './components/Modal'

<Modal isOpen={isOpen} onClose={handleClose} title="Create Project">
  <ProjectForm />
</Modal>
```

### Form Elements
```jsx
import { FormGroup, Input, TextArea, Select } from './components/FormElements'

<FormGroup label="Name" required error={errors.name}>
  <Input
    name="name"
    value={name}
    onChange={handleChange}
    placeholder="Enter name"
  />
</FormGroup>
```

## 🌙 Dark Mode Usage

Dark mode is built-in and automatic:
1. Toggle button in header
2. Automatically applied to all components
3. Saved to localStorage

To manually control:
```jsx
import { useApp } from './hooks/useApp'

function MyComponent() {
  const { darkMode, toggleDarkMode } = useApp()
  return <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
}
```

## 🔔 Notifications

Show notifications to users:
```jsx
import { useApp } from './hooks/useApp'

function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useApp()
  
  return (
    <>
      <button onClick={() => showSuccess('Done!')}>Success</button>
      <button onClick={() => showError('Error occurred')}>Error</button>
      <button onClick={() => showWarning('Be careful')}>Warning</button>
      <button onClick={() => showInfo('FYI')}>Info</button>
    </>
  )
}
```

## 🎯 State Management

Global state via AppContext:
```jsx
import { useApp } from './hooks/useApp'

function MyComponent() {
  const {
    projects,
    loading,
    error,
    showSuccess,
    darkMode,
    toggleDarkMode
  } = useApp()
}
```

## 📡 API Integration

Already configured in `src/services/api.js`:
- Base URL from environment variable
- Default headers
- Error handling ready
- CORS configured

Projects API:
```javascript
import { projectsAPI } from './services/api'

const projects = await projectsAPI.getAll()
const project = await projectsAPI.getById(id)
await projectsAPI.create(data)
```

## 🧹 Code Style

- **Naming**: camelCase for functions/variables, PascalCase for components
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS, double for JSX attributes
- **Semicolons**: Always included
- **Comments**: Clear and concise

## 🚨 Common Issues & Solutions

### Sidebar Not Showing
- Check if Sidebar component is imported in App.jsx ✅ (Done)

### Dark Mode Not Working
- Ensure AppContext wraps your app ✅ (Done)
- Check localStorage is enabled in browser

### API Calls Failing
- Check VITE_API_URL environment variable
- Verify backend is running
- Check network tab in DevTools

### Animations Stuttering
- Check browser GPU acceleration
- Reduce animation complexity
- Profile with React DevTools

## 📚 File Reference

| File | Purpose |
|------|---------|
| App.jsx | Main app with routing |
| AppContext.jsx | Global state |
| useApp.js | Context hook |
| api.js | API client |
| index.css | Global styles & animations |
| tailwind.config.js | Tailwind configuration |
| vite.config.js | Vite build config |

## 🎓 Learning Resources

- React: https://react.dev
- Tailwind: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- React Router: https://reactrouter.com

## 📞 Support

For issues:
1. Check the browser console for errors
2. Open DevTools Network tab
3. Review component props
4. Check AppContext values

---

**You're all set!** 🎉

The frontend is fully functional and ready for integration with your backend API.

Start the dev server with `npm run dev` and begin using it!
