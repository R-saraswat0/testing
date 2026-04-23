# Installation & Troubleshooting Guide

## 🚀 Complete Installation Steps

### Prerequisites
- Node.js 16.0.0 or higher
- npm 8.0.0 or higher (or yarn/pnpm)
- Git (optional)

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

**What gets installed:**
- React 18.2 - UI library
- React Router 6.14 - Routing
- Tailwind CSS 3.3 - Styling
- Framer Motion 10.16 - Animations
- Lucide React 0.263 - Icons
- Axios 1.4 - HTTP client
- dnd-kit 6.0 - Drag & drop
- Vite 4.4 - Build tool

### Step 3: Configure Environment
Create `.env` file in frontend directory:
```env
VITE_API_URL=http://localhost:3000
```

### Step 4: Start Development Server
```bash
npm run dev
```

Expected output:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 5: Open in Browser
Visit `http://localhost:5173/`

## 📦 Available Scripts

### Development
```bash
npm run dev
```
- Starts Vite dev server
- Hot module replacement
- Fast refresh on changes

### Build
```bash
npm run build
```
- Creates production build
- Optimizes code and assets
- Generates dist/ folder

### Preview
```bash
npm run preview
```
- Preview production build locally
- Useful for testing before deploy

### Lint (when available)
```bash
npm run lint
```
- Check code style
- Find potential issues

## 🔧 Configuration Files

### vite.config.js
```javascript
// Already configured for React
// Includes:
// - React plugin (@vitejs/plugin-react)
// - Port 5173
// - CORS headers for API
```

### tailwind.config.js
```javascript
// Customization:
// - Custom colors (primary blue)
// - Custom animations (fadeIn, slideUp)
// - Dark mode with 'class' strategy
// - Font families configured
```

### package.json
```json
{
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .js,.jsx"
  },
  // Dependencies and devDependencies listed
}
```

## 🐛 Troubleshooting

### Issue: Dependencies Installation Fails

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Try installing with legacy peer deps
npm install --legacy-peer-deps

# Or use yarn
yarn install
```

### Issue: Port 5173 Already in Use

**Error**: `Port 5173 is already in use`

**Solution**:
```bash
# Find process using port 5173 (macOS/Linux)
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or use different port
npm run dev -- --port 3001
```

**On Windows**:
```bash
# Find process using port 5173
netstat -ano | findstr :5173

# Kill the process
taskkill /PID <PID> /F
```

### Issue: Cannot Connect to API

**Error**: `Failed to load projects` or CORS error

**Checklist**:
1. ✅ Backend is running on http://localhost:3000
2. ✅ VITE_API_URL is correct in .env
3. ✅ Backend has CORS enabled
4. ✅ Check browser console for exact error

**Solution**:
```bash
# Restart backend
cd backend
npm run dev

# In new terminal, restart frontend
cd frontend
npm run dev
```

### Issue: Dark Mode Not Working

**Symptoms**: Dark mode toggle doesn't work or doesn't persist

**Checklist**:
1. ✅ AppContext is wrapping app (check App.jsx)
2. ✅ localStorage is enabled in browser
3. ✅ No browser extension blocking it

**Solution**:
```javascript
// Check if dark mode state exists
console.log(localStorage.getItem('darkMode'))

// Manually enable dark mode
localStorage.setItem('darkMode', 'true')
// Refresh page
```

### Issue: Animations Not Smooth

**Symptoms**: Choppy animations, stuttering

**Solution**:
```javascript
// Check browser GPU acceleration
// Chrome DevTools → Settings → Rendering
// Enable: Paint timing, Rendering fps meter

// Reduce animation complexity in Framer Motion
// Simplify transforms, use will-change CSS
```

### Issue: Hot Reload Not Working

**Symptoms**: Changes don't reflect without manual refresh

**Solution**:
```bash
# Restart dev server
npm run dev

# Or manually refresh browser (Ctrl+R / Cmd+R)

# Check if file is saved
# VS Code: ensure auto-save is enabled
```

### Issue: Build Fails

**Error**: `vite build` fails with error

**Solution**:
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build

# Check for TypeScript errors
# Check console for specific error messages
```

### Issue: Slow Performance

**Symptoms**: App feels sluggish, takes long to load

**Solution**:
```bash
# Analyze bundle size
npm install --save-dev rollup-plugin-visualizer

# Clear cache and rebuild
npm cache clean --force
npm run build

# Check DevTools Performance tab
# Look for long tasks or excessive re-renders
```

### Issue: Form Validation Not Working

**Symptoms**: Form submits with empty fields

**Checklist**:
1. ✅ Validation function is being called
2. ✅ Error state is being set
3. ✅ Error is displayed in UI

**Debug**:
```javascript
// Add console logs to validate function
const validate = () => {
  console.log('Validating...', formData)
  // Check validation logic
}
```

### Issue: Drag & Drop Not Working

**Symptoms**: Tasks can't be dragged between columns

**Checklist**:
1. ✅ dnd-kit library is installed
2. ✅ DndContext wraps the board
3. ✅ Sensors are configured
4. ✅ Column and task IDs are unique

**Solution**:
```bash
# Reinstall dnd-kit
npm uninstall @dnd-kit/core @dnd-kit/sortable
npm install @dnd-kit/core@^6.0.0 @dnd-kit/sortable@^7.0.0
```

## 🔍 Debugging Tips

### Enable Debug Logging
```javascript
// In browser console
localStorage.setItem('DEBUG', 'true')

// View logs
console.log('Debug info here')
```

### Check Network Requests
```bash
# In browser DevTools
1. Open Network tab
2. Make API call
3. Check request/response
4. Look for status codes (200, 404, 500, etc.)
```

### React DevTools
```bash
# Install browser extension
# - React Developer Tools
# - Redux DevTools (if using Redux)

# Use to inspect:
# - Component hierarchy
# - Props and state
# - Re-renders
```

### Terminal Output
```bash
# Development server logs
# - Compilation warnings
# - API errors
# - Console.log() output

# Watch for:
# - Vite build errors
# - Missing imports
# - Syntax errors
```

## 📊 Performance Optimization

### Check Bundle Size
```bash
npm run build

# Analyze output
du -sh dist/

# Typical size: 200-300 KB (gzipped)
```

### Improve Performance
```javascript
// Lazy load components
const Dashboard = React.lazy(() => import('./pages/Dashboard'))

// Memoize expensive computations
const memoizedValue = useMemo(() => expensiveOperation(), [dependency])

// Reduce re-renders
const MemoComponent = React.memo(Component)
```

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Environment variables configured
- [ ] Backend API URL correct
- [ ] Build completes without errors: `npm run build`
- [ ] Build preview works: `npm run preview`
- [ ] Dark mode works correctly
- [ ] Responsive design tested on mobile/tablet
- [ ] All forms validated
- [ ] Error handling working
- [ ] Notifications display correctly
- [ ] Performance optimized
- [ ] SEO meta tags added
- [ ] Favicon configured
- [ ] Security headers in place

## 📱 Browser Compatibility

### Supported Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Testing
```bash
# Test in different browsers
# Use BrowserStack or similar for multiple OS

# Check console for errors
# DevTools → Console tab
```

## 🆘 Getting Help

### Check These First
1. [React Documentation](https://react.dev)
2. [Tailwind CSS Docs](https://tailwindcss.com)
3. [Vite Documentation](https://vitejs.dev)
4. Browser console for errors
5. Network tab for API issues

### Useful Commands
```bash
# Clear node_modules and reinstall
rm -rf node_modules && npm install

# Update all dependencies
npm update

# Check npm version
npm --version

# Check Node version
node --version
```

## 📝 Common Error Messages

### "Cannot find module 'react'"
- Solution: Run `npm install`

### "EADDRINUSE: address already in use :::5173"
- Solution: Kill process or change port

### "CORS error when calling API"
- Solution: Check backend CORS config

### "Tailwind CSS not compiling"
- Solution: Check tailwind.config.js, restart dev server

### "Module not found: ./path/to/file"
- Solution: Check file path and extension

## 💾 Version Management

### Update Single Package
```bash
npm install package-name@latest
```

### Update All Packages
```bash
npm update
```

### Check Outdated Packages
```bash
npm outdated
```

### Lock Dependencies
```bash
# package-lock.json (created automatically)
# Ensures consistent versions
```

---

## 📞 Support Resources

- **Documentation**: See `FRONTEND_COMPLETE_BUILD.md`
- **Quick Start**: See `QUICK_START.md`
- **Design System**: See `DESIGN_SYSTEM.md`
- **GitHub Issues**: Check if issue exists
- **Stack Overflow**: Tag with [react] [vite] [tailwind-css]

---

**If all else fails:**
1. Check terminal output for specific errors
2. Read browser console error messages
3. Review all configuration files
4. Reinstall dependencies from scratch
5. Restart development server

**Happy coding!** 🎉
