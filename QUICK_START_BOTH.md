# 🎯 Complete Quick Start Guide - Full Stack Running

## ⚡ Run Everything in 5 Minutes

### What You Need
- ✅ Node.js 16+ installed
- ✅ Two terminal windows open
- ✅ Both frontend and backend folders exist

---

## 🚀 Step 1: Terminal #1 - Start Backend

```bash
# Navigate to backend
cd d:\Agile_Project\backend

# Install dependencies (first time only)
npm install

# Initialize database (first time only)
npm run db:migrate

# Seed sample data (first time only - optional)
npm run db:seed

# Start backend server
npm run dev
```

**Expected Output:**
```
✨ Server running at http://localhost:3000
📚 API Docs available at http://localhost:3000/api-docs
```

✅ **Backend is running!** Leave this terminal open.

---

## 🎨 Step 2: Terminal #2 - Start Frontend

Open a **new terminal window** and run:

```bash
# Navigate to frontend
cd d:\Agile_Project\frontend

# Install dependencies (if not already done)
npm install

# Start frontend dev server
npm run dev
```

**Expected Output:**
```
  ➜  Local:   http://localhost:5173/
```

✅ **Frontend is running!**

---

## 🌐 Step 3: Open in Browser

### Open these URLs:

1. **Frontend (Main App)**
   ```
   http://localhost:5173/
   ```
   
2. **API Documentation**
   ```
   http://localhost:3000/api-docs
   ```

3. **Backend Health Check**
   ```
   http://localhost:3000/health
   ```

---

## ✅ Step 4: Test the Integration

### In Frontend (http://localhost:5173/):

1. **Create a Project**
   - Click "Create Project" button
   - Enter: Name = "Test", Description = "Testing"
   - Click "Create"
   - ✅ Project appears in list

2. **Create a User Story**
   - Click on project card
   - Click "New Story"
   - Enter: Title = "Story 1"
   - Click "Create"
   - ✅ Story appears in list

3. **Create a Task**
   - Click on story to expand
   - Click "Add Task"
   - Enter: Title = "Task 1", Assigned To = "You"
   - Click "Create"
   - ✅ Task appears under story

4. **Test Kanban View**
   - Click "Kanban" button (top right)
   - See tasks in columns
   - Drag task to "In Progress"
   - ✅ Task updates in board

5. **Test Dark Mode**
   - Click moon icon in header
   - ✅ UI goes dark
   - Refresh page
   - ✅ Dark mode persists

---

## 🔍 Troubleshooting While Running

### Issue: Can't Create Project
**Check:**
1. Backend terminal - any errors?
2. Browser console (F12) - any errors?
3. Network tab - request status?
4. Backend running at localhost:3000? ✓

### Issue: "Connection Refused"
**Solution:**
```bash
# Backend not running?
# Terminal 1: Ctrl+C then npm run dev

# Different port?
# Check backend .env: PORT=3000
```

### Issue: Port Already in Use
```bash
# Terminal 1: Kill process on 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Terminal 2: Kill process on 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Issue: Dark Mode Not Working
```bash
# Check browser DevTools > Application > localStorage
# Should see "darkMode" key

# Or hard refresh: Ctrl+Shift+R
```

---

## 📊 Monitoring While Running

### Backend Terminal
Watch for:
- ✅ "Server running at http://localhost:3000"
- ✅ API request logs
- ❌ Error messages
- ❌ "Connection refused"

### Frontend Terminal
Watch for:
- ✅ "Local: http://localhost:5173/"
- ✅ File change detection
- ❌ Compilation errors
- ❌ "Port already in use"

### Browser Console (F12)
Watch for:
- ❌ Red errors
- ✅ Network requests completing
- ✅ No CORS errors

---

## 🎯 Complete Feature Checklist

While both are running, test:

- [ ] Create project
- [ ] View projects list
- [ ] Get project details
- [ ] Update project name
- [ ] Create user story
- [ ] View stories by project
- [ ] Update story status
- [ ] Delete story
- [ ] Create task
- [ ] View tasks by story
- [ ] Update task status
- [ ] Drag task in Kanban
- [ ] Delete task
- [ ] Delete project
- [ ] Toggle dark mode
- [ ] Responsive design (F12 → mobile)
- [ ] No console errors
- [ ] API docs work (http://localhost:3000/api-docs)

**All checked?** ✅ Full stack is working!

---

## 📱 Test Responsive Design

While running:

1. **Desktop**: Browser normal size ✅
2. **Tablet**: F12 → iPad size ✅
3. **Mobile**: F12 → iPhone size ✅
4. **Mobile Toggle**: Sidebar should collapse ✅

---

## 🔗 API Testing While Running

### Test in Browser
Visit: `http://localhost:3000/api-docs`
- Interactive API testing
- Try all endpoints
- See response examples

### Test with cURL
```bash
# Get all projects
curl http://localhost:3000/projects

# Create project
curl -X POST http://localhost:3000/projects ^
  -H "Content-Type: application/json" ^
  -d {"name":"Test","description":"API Test"}

# View database
# Terminal 1: Ctrl+C (stop backend)
# npm run db:studio
```

---

## 💾 View Database

While backend is running:

```bash
# Terminal 3: Open new terminal
cd backend
npm run db:studio
```

This opens Prisma Studio where you can:
- View all projects, stories, tasks
- Create/edit/delete records
- See relationships
- Browse data

---

## 📊 View Logs

### Real-time Backend Logs
```bash
# Terminal 1 already shows logs
# Watch for request logs
```

### Log Files (after stopping backend)
```bash
# Backend logs saved to:
backend/logs/all.log      # All logs
backend/logs/error.log    # Errors only

# View
type backend\logs\all.log
```

---

## 🛑 Stopping the Servers

### Stop Backend (Terminal 1)
```
Ctrl+C
```

### Stop Frontend (Terminal 2)
```
Ctrl+C
```

Both will gracefully shut down ✅

---

## 🔄 Restart If Needed

### Quick Restart
```bash
# Terminal 1: Ctrl+C then
npm run dev

# Terminal 2: Ctrl+C then
npm run dev
```

### Full Reset
```bash
# Terminal 1
npm run db:reset     # ⚠️ WARNING: Deletes all data!
npm run db:seed
npm run dev

# Terminal 2
npm run dev
```

---

## 📝 Environment Files

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

### Backend (.env)
```
DATABASE_URL="file:./dev.db"
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
LOG_LEVEL=debug
```

---

## 🎉 What You Have Running

| Component | URL | Status |
|-----------|-----|--------|
| Frontend App | http://localhost:5173 | ✅ Running |
| Backend API | http://localhost:3000 | ✅ Running |
| API Docs | http://localhost:3000/api-docs | ✅ Running |
| Health Check | http://localhost:3000/health | ✅ Running |
| Database | SQLite (dev.db) | ✅ Running |

---

## 💡 Tips While Working

1. **Make code changes** → Frontend auto-refreshes
2. **API Docs** → Always check `/api-docs` for endpoints
3. **Network tab** → Debug API calls (F12)
4. **Database Studio** → View/edit data directly
5. **Terminal logs** → Backend logs show all requests
6. **Dark mode** → Persists across page reloads

---

## 📚 Documentation Files

While running, see these files for help:

| File | Purpose |
|------|---------|
| `FULL_STACK_SETUP.md` | Detailed setup guide |
| `BACKEND_API_INTEGRATION.md` | API endpoint reference |
| `frontend/README_START_HERE.md` | Frontend guide |
| `backend/README.md` | Backend documentation |

---

## 🚀 You're Ready to Build!

Both frontend and backend are running! 

### Next Steps:
1. Create projects, stories, tasks
2. Test all features
3. Deploy when ready
4. Add authentication (future)
5. Customize design/colors
6. Add more features

---

## ❓ Quick Reference

| Need | Command |
|------|---------|
| Backend logs | Terminal 1 (running) |
| Frontend logs | Terminal 2 (running) |
| View database | `npm run db:studio` |
| Reset database | `npm run db:reset` |
| Seed data | `npm run db:seed` |
| API docs | http://localhost:3000/api-docs |
| Frontend | http://localhost:5173 |
| Backend health | http://localhost:3000/health |

---

## 🎊 Success!

If everything is working:
- ✅ Frontend loads at localhost:5173
- ✅ Backend responds at localhost:3000
- ✅ Can create/edit/delete projects
- ✅ Kanban board works
- ✅ Dark mode works
- ✅ No errors in console

**You're running a full-stack Agile Project Management Tool!** 🎉

---

**Happy building!** 🚀

*Last Updated: April 2024*
*Version: 1.0.0*
