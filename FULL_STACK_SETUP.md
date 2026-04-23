# 🚀 Full-Stack Setup & Integration Guide

## 📋 Complete Setup Instructions for Agile Project Management Tool

This guide walks you through setting up both the frontend and backend and integrating them together.

---

## ✅ Prerequisites

- **Node.js** 16+ (check with `node --version`)
- **npm** 8+ (check with `npm --version`)
- **Git** (optional but recommended)
- A code editor (VS Code recommended)

---

## 🎯 Step 1: Project Structure Setup

Your project should look like this:

```
Agile_Project/
├── frontend/          (React app - already built ✅)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── [config files]
│
└── backend/           (Express API - we're building this)
    ├── src/
    ├── prisma/
    ├── package.json
    └── [config files]
```

---

## 🔧 Step 2: Backend Setup

### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

**Expected Output:**
```
added XXX packages in XXs
```

### 2.2 Initialize Database

```bash
npm run db:migrate
```

**Expected Output:**
```
✅ Database connected
🌱 Migration completed successfully
```

### 2.3 Seed Database (Optional - for testing)

```bash
npm run db:seed
```

**Expected Output:**
```
✅ Created 3 projects
✅ Created 3 user stories...
🎉 Database seed completed successfully!
```

### 2.4 Verify Backend Setup

```bash
npm run dev
```

**Expected Output:**
```
✨ Server running at http://localhost:3000
📚 API Docs available at http://localhost:3000/api-docs
```

Keep this terminal open. The backend is now running! ✅

---

## 🎨 Step 3: Frontend Setup

### 3.1 Open New Terminal Window

Navigate to the frontend directory in a **new terminal window**:

```bash
cd frontend
```

### 3.2 Install Frontend Dependencies (if not already done)

```bash
npm install
```

### 3.3 Create/Update Environment File

Create or update `.env` file in frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

### 3.4 Start Frontend Development Server

```bash
npm run dev
```

**Expected Output:**
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 🧪 Step 4: Test the Integration

### 4.1 Open Frontend in Browser

Visit: `http://localhost:5173/`

You should see the dashboard loading with a "Create Project" button.

### 4.2 Test Creating a Project

1. Click **"Create Project"** button
2. Enter project details:
   - **Name**: "Test Project"
   - **Description**: "Testing integration"
3. Click **"Create"**

**Expected Result**: Project appears in the list ✅

### 4.3 Test Viewing Project

1. Click on the project card
2. You should see the project detail page
3. Should show "No user stories yet" message

### 4.4 Test Creating a User Story

1. Click **"+ New Story"** button
2. Fill in form:
   - **Title**: "Test Story"
   - **Description**: "Test description"
   - **Status**: "Todo"
   - **Priority**: "High"
3. Click **"Create"**

**Expected Result**: Story appears in the list ✅

### 4.5 Test Creating a Task

1. Click on the user story to expand
2. Click **"+ Add Task"** button
3. Fill in form:
   - **Title**: "Test Task"
   - **Description**: "Task description"
   - **Assigned To**: "John Doe"
4. Click **"Create"**

**Expected Result**: Task appears under the story ✅

### 4.6 Test Kanban View

1. Click **"Kanban"** button (top right)
2. You should see task card in "Todo" column
3. Drag task to "In Progress" column

**Expected Result**: Task moves and updates in database ✅

### 4.7 Test Dark Mode

1. Click moon icon in header
2. UI should switch to dark mode
3. Refresh page - dark mode should persist

**Expected Result**: Dark mode works and persists ✅

---

## 📊 Step 5: Verify API Endpoints

### 5.1 View API Documentation

Open: `http://localhost:3000/api-docs`

You should see interactive Swagger documentation for all endpoints.

### 5.2 Test API Manually

#### Get All Projects
```bash
curl http://localhost:3000/projects
```

#### Create Project via API
```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test",
    "description": "Testing via API"
  }'
```

#### Get Project with All Data
```bash
curl http://localhost:3000/projects/1
```

---

## ✨ Step 6: Test Complete Workflow

### Full Feature Test Checklist

- [ ] Create project from UI
- [ ] View project details
- [ ] Create user story
- [ ] View user story list
- [ ] Create task
- [ ] View task list
- [ ] Update task status (drag in Kanban)
- [ ] Edit user story
- [ ] Delete task
- [ ] Delete user story
- [ ] Delete project
- [ ] Toggle dark mode
- [ ] Test responsive design (DevTools mobile view)
- [ ] View API docs at /api-docs
- [ ] Check browser console for errors
- [ ] Check backend terminal for logs

---

## 🔍 Step 7: Troubleshooting

### Issue: Port 3000 Already in Use

**Error Message:**
```
Error: listen EADDRINUSE :::3000
```

**Solution:**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=3001
```

### Issue: Port 5173 Already in Use

**Solution:**
```bash
# Kill process on port 5173
# Or run frontend on different port
npm run dev -- --port 3002
```

### Issue: CORS Error in Console

**Error Message:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Verify VITE_API_URL in frontend/.env is correct
2. Check backend FRONTEND_URL in .env matches frontend URL
3. Restart both servers

### Issue: Database Error

**Error Message:**
```
Error: ENOENT: no such file or directory, open './dev.db'
```

**Solution:**
```bash
npm run db:migrate
npm run db:seed
```

### Issue: API Returns 404

**Solution:**
1. Check API endpoint URL is correct
2. Verify backend is running (`npm run dev`)
3. Check browser network tab for actual URL being called
4. Look at backend terminal for errors

### Issue: Data Not Saving

**Solution:**
1. Check browser console for JavaScript errors
2. Check backend terminal for API errors
3. Verify database is connected: `npm run db:studio`
4. Check network tab in DevTools for failed requests

---

## 📈 Step 8: Monitor & Debug

### View Real-time Logs

**Backend Logs:**
```bash
tail -f backend/logs/all.log
```

**Browser Console:**
- Press `F12` → Console tab
- Look for any red errors
- Check network tab for API calls

### Access Database

```bash
cd backend
npm run db:studio
```

This opens Prisma Studio where you can:
- View all data
- Create/edit/delete records
- Verify relationships

### Check Network Requests

1. Open DevTools: `F12`
2. Go to **Network** tab
3. Perform an action (create project)
4. Look for request to `http://localhost:3000/projects`
5. Check response for data

---

## 🚀 Step 9: Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

This creates `dist/` folder with optimized code.

### Backend Build

No build needed! Backend runs directly with Node.js.

### Environment for Production

Create `.env` for production:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL="file:./prod.db"
FRONTEND_URL=https://yourdomain.com
LOG_LEVEL=info
```

---

## 📋 Complete Terminal Commands Reference

### Backend

```bash
# Start development server
npm run dev

# Start production server
npm start

# Initialize database
npm run db:migrate

# View database in browser
npm run db:studio

# Reset database (WARNING: deletes all data)
npm run db:reset

# Seed sample data
npm run db:seed

# Run linter
npm run lint

# Run tests
npm run test
```

### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🎯 Quick Start (TL;DR)

If you just want to get it running:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then visit: `http://localhost:5173/`

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend running: `http://localhost:3000/health`
- [ ] Frontend running: `http://localhost:5173`
- [ ] API docs available: `http://localhost:3000/api-docs`
- [ ] Can create project from UI
- [ ] Can create user story
- [ ] Can create task
- [ ] Can drag task between columns
- [ ] Dark mode works
- [ ] No errors in console
- [ ] No errors in backend logs

If all ✅, you're ready to go! 🎉

---

## 🆘 Need Help?

1. **Check logs**: Look at console and `logs/` folder
2. **Check network**: DevTools → Network tab
3. **Check API**: Visit `http://localhost:3000/api-docs`
4. **Check database**: Run `npm run db:studio`
5. **Restart servers**: Kill and restart both terminals
6. **Clear cache**: Hard refresh with Ctrl+Shift+R

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `frontend/README_START_HERE.md` | Frontend quick start |
| `frontend/QUICK_START.md` | Frontend 5-min setup |
| `backend/README.md` | Backend documentation |
| This file | Full-stack integration guide |

---

## 🎉 You're All Set!

Your full-stack Agile Project Management Tool is ready to use! 

Start building amazing projects! 🚀

---

**Built with ❤️ using React, Node.js, and Express.js**

**Last Updated**: April 2024
**Version**: 1.0.0
