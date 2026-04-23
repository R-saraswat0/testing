# ✅ Pre-Launch Verification Checklist

Complete this checklist before running your full-stack application.

---

## 🔍 System Requirements

### Required Software
- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm 8+ installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Code editor (VS Code recommended)

### Required Permissions
- [ ] Can access `d:\Agile_Project\` folder
- [ ] Can create folders and files
- [ ] Can run npm commands
- [ ] Can use ports 3000 and 5173

---

## 📁 Project Files

### Frontend Folder
```bash
cd frontend
```
Check these files exist:
- [ ] `package.json` ✓
- [ ] `vite.config.js` ✓
- [ ] `tailwind.config.js` ✓
- [ ] `src/` folder exists ✓
- [ ] `src/components/` has 13+ components ✓
- [ ] `src/pages/` has Dashboard.jsx and ProjectDetails.jsx ✓
- [ ] `src/services/api.js` exists ✓
- [ ] `src/context/AppContext.jsx` exists ✓

### Backend Folder
```bash
cd backend
```
Check these files exist:
- [ ] `package.json` ✓
- [ ] `src/index.js` exists ✓
- [ ] `prisma/schema.prisma` exists ✓
- [ ] `src/controllers/` folder exists ✓
- [ ] `src/routes/` folder exists ✓
- [ ] `src/middlewares/` folder exists ✓
- [ ] `.env` file exists ✓
- [ ] `README.md` exists ✓

---

## ⚙️ Environment Configuration

### Frontend `.env`
```bash
cd frontend
cat .env
```
Should contain:
- [ ] `VITE_API_URL=http://localhost:3000` ✓

**If missing, create it:**
```bash
echo VITE_API_URL=http://localhost:3000 > .env
```

### Backend `.env`
```bash
cd backend
cat .env
```
Should contain:
- [ ] `DATABASE_URL="file:./dev.db"` ✓
- [ ] `NODE_ENV=development` ✓
- [ ] `PORT=3000` ✓
- [ ] `FRONTEND_URL=http://localhost:5173` ✓
- [ ] `LOG_LEVEL=debug` ✓

**If missing, create it from .env.example:**
```bash
copy .env.example .env
```

---

## 📦 Dependencies

### Frontend Dependencies
```bash
cd frontend
npm install
```
Should succeed with ✅

Check:
- [ ] `node_modules/` folder created ✓
- [ ] `package-lock.json` created ✓
- [ ] No errors in npm output ✓

### Backend Dependencies
```bash
cd backend
npm install
```
Should succeed with ✅

Check:
- [ ] `node_modules/` folder created ✓
- [ ] `package-lock.json` created ✓
- [ ] No errors in npm output ✓

**If errors:**
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

---

## 🗄️ Database Setup

### Initialize Database
```bash
cd backend
npm run db:migrate
```

Check for:
- [ ] No errors in output ✓
- [ ] Migration completed message ✓
- [ ] `prisma/migrations/` folder created ✓

### Optional: Seed Data
```bash
npm run db:seed
```

Check for:
- [ ] "Database seed completed successfully!" message ✓
- [ ] Sample projects created ✓

**If errors:**
```bash
npm run db:reset
npm run db:migrate
npm run db:seed
```

---

## 🌐 Port Availability

### Check Port 3000 (Backend)
```bash
netstat -ano | findstr :3000
```

- [ ] If shows process, note the PID ✓
- [ ] If empty, port is free ✓

If needed, kill process:
```bash
taskkill /PID <PID> /F
```

### Check Port 5173 (Frontend)
```bash
netstat -ano | findstr :5173
```

- [ ] If shows process, note the PID ✓
- [ ] If empty, port is free ✓

If needed, kill process:
```bash
taskkill /PID <PID> /F
```

---

## 🧪 Pre-Launch Tests

### Backend Health Check
```bash
cd backend
npm run dev &
# Wait 2 seconds
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "..."
}
```

- [ ] Response is OK ✓
- [ ] Status is 200 ✓

### API Documentation
Visit in browser: `http://localhost:3000/api-docs`

- [ ] Page loads ✓
- [ ] Swagger UI visible ✓
- [ ] Endpoints listed ✓

### Frontend Launch
```bash
cd frontend
npm run dev
```

Expected output:
```
Local: http://localhost:5173/
```

- [ ] Server started successfully ✓
- [ ] Local URL shown ✓

### Frontend Load
Visit in browser: `http://localhost:5173/`

- [ ] Page loads ✓
- [ ] Dashboard visible ✓
- [ ] No red errors in console ✓

---

## 📋 API Endpoints Verification

### Test Each Endpoint

**GET /health**
```bash
curl http://localhost:3000/health
```
- [ ] Returns 200 ✓

**GET /projects**
```bash
curl http://localhost:3000/projects
```
- [ ] Returns 200 ✓
- [ ] Returns JSON array ✓

**POST /projects** (create)
```bash
curl -X POST http://localhost:3000/projects ^
  -H "Content-Type: application/json" ^
  -d {"name":"Test","description":"Testing"}
```
- [ ] Returns 201 ✓
- [ ] Returns project data ✓

**API Docs Available**
```
http://localhost:3000/api-docs
```
- [ ] Loads without error ✓
- [ ] All endpoints listed ✓

---

## 🎨 Frontend Component Verification

### In Browser (http://localhost:5173/)

**Dashboard Page**
- [ ] Loads without errors ✓
- [ ] Shows header ✓
- [ ] Shows sidebar ✓
- [ ] Shows "Create Project" button ✓

**Create Project Modal**
- [ ] Click "Create Project" ✓
- [ ] Modal appears ✓
- [ ] Has name and description fields ✓
- [ ] Has cancel and create buttons ✓

**Dark Mode**
- [ ] Click moon icon in header ✓
- [ ] UI switches to dark mode ✓
- [ ] Refresh page ✓
- [ ] Dark mode persists ✓

**Responsive Design**
- [ ] Press F12 (DevTools) ✓
- [ ] Toggle device toolbar ✓
- [ ] Select iPad size ✓
- [ ] Layout adjusts ✓
- [ ] Select iPhone size ✓
- [ ] Mobile menu works ✓

---

## 🔗 Frontend-Backend Integration

### Create Project Test
1. Frontend: Click "Create Project"
2. Enter: Name = "Integration Test"
3. Click "Create"

- [ ] Project created without error ✓
- [ ] Project appears in list ✓
- [ ] No console errors ✓
- [ ] Backend logs show request ✓

### Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Create another project

- [ ] Request shows to localhost:3000 ✓
- [ ] Status is 201 ✓
- [ ] Response has project data ✓

---

## 📊 Console & Logs Verification

### Browser Console (F12)
- [ ] No red error messages ✓
- [ ] No CORS warnings ✓
- [ ] No 404 errors ✓

### Backend Terminal
- [ ] No error messages ✓
- [ ] API requests logged ✓
- [ ] No database errors ✓

### Log Files
```bash
cd backend
type logs\all.log
type logs\error.log
```
- [ ] `logs/all.log` created ✓
- [ ] Contains request logs ✓
- [ ] `logs/error.log` exists ✓

---

## ✅ Final Verification

### Both Servers Running
- [ ] Backend: Terminal 1 `npm run dev` running ✓
- [ ] Frontend: Terminal 2 `npm run dev` running ✓

### Can Access
- [ ] Frontend: http://localhost:5173 ✓
- [ ] Backend: http://localhost:3000 ✓
- [ ] API Docs: http://localhost:3000/api-docs ✓
- [ ] Health: http://localhost:3000/health ✓

### Core Features Work
- [ ] Create project ✓
- [ ] View projects ✓
- [ ] Create user story ✓
- [ ] Create task ✓
- [ ] Drag task in Kanban ✓
- [ ] Update task status ✓
- [ ] Delete task ✓
- [ ] Dark mode toggle ✓

### No Errors
- [ ] Browser console clean ✓
- [ ] Backend logs clean ✓
- [ ] Network requests 200/201 ✓
- [ ] Database operations working ✓

---

## 📝 Troubleshooting Checklist

If something's not working:

### Port Already in Use
- [ ] Ran netstat to check ✓
- [ ] Killed process if needed ✓
- [ ] Updated port in `.env` ✓

### Dependencies Not Installing
- [ ] Cleared npm cache ✓
- [ ] Tried `npm install --legacy-peer-deps` ✓
- [ ] Checked Node version ✓

### Database Error
- [ ] Ran `npm run db:migrate` ✓
- [ ] Ran `npm run db:seed` ✓
- [ ] Checked prisma/schema.prisma ✓

### API Not Responding
- [ ] Checked backend is running ✓
- [ ] Tested /health endpoint ✓
- [ ] Checked FRONTEND_URL in backend .env ✓
- [ ] Checked VITE_API_URL in frontend .env ✓

### Frontend Not Loading
- [ ] Checked frontend is running ✓
- [ ] Cleared browser cache ✓
- [ ] Hard refresh (Ctrl+Shift+R) ✓
- [ ] Checked browser console errors ✓

---

## 🎉 Ready to Launch!

If you've checked everything above ✅, you're ready!

### Launch Commands

**Terminal 1 - Backend:**
```bash
cd d:\Agile_Project\backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd d:\Agile_Project\frontend
npm run dev
```

**Browser:**
```
http://localhost:5173
```

---

## 📚 Next Steps

1. ✅ Complete this checklist
2. 🚀 Launch both servers
3. 🧪 Test all features
4. 📖 Read relevant documentation
5. 🏗️ Deploy to production (when ready)

---

## 🆘 If Something's Wrong

| Issue | Solution |
|-------|----------|
| Port in use | `taskkill /PID <PID> /F` |
| Deps failing | `npm cache clean --force` |
| DB error | `npm run db:migrate` |
| CORS error | Check .env files |
| Can't connect | Check ports 3000 & 5173 |
| API returns 404 | Check endpoint URL |
| Dark mode broken | Hard refresh browser |

---

## ✨ Verification Complete!

All systems go! 🚀

Start your servers and build amazing things! 💪

---

*Last Updated: April 2024*
*Version: 1.0.0*
