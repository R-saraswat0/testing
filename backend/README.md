# 🚀 Agile Project Management Backend API

A production-ready REST API for an Agile Project Management Tool built with Node.js, Express.js, and SQLite using Prisma ORM.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Background Jobs](#background-jobs)
- [Security](#security)
- [Deployment](#deployment)

## ✨ Features

✅ **Complete CRUD Operations** for Projects, User Stories, and Tasks
✅ **Hierarchical Data Structure** - Project → User Story → Task
✅ **Input Validation** - Using Joi for robust validation
✅ **Global Error Handling** - Consistent error responses
✅ **Logging** - Morgan and Winston for comprehensive logging
✅ **Rate Limiting** - Prevent API abuse
✅ **CORS Support** - Seamless frontend integration
✅ **Swagger/OpenAPI Documentation** - Interactive API docs
✅ **Background Jobs** - Daily task completion reports
✅ **Database Migrations** - Prisma migrations included
✅ **Security** - Helmet, input sanitization, SQL injection prevention
✅ **Seed Data** - Faker.js for development data

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 16+ | JavaScript runtime |
| Express.js | 4.18 | Web framework |
| SQLite | Latest | Database |
| Prisma | 5.8 | ORM & migrations |
| Joi | 17.11 | Input validation |
| Winston | 3.11 | Logging |
| Node-Cron | 3.0 | Background jobs |
| Swagger | 6.2 | API documentation |
| Helmet | 7.1 | Security middleware |

## 📦 Installation

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Steps

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

4. **Initialize database**
```bash
npm run db:migrate
```

5. **Seed database with sample data** (optional)
```bash
npm run db:seed
```

## ⚙️ Configuration

### Environment Variables (.env)

```env
# Database
DATABASE_URL="file:./dev.db"

# Server
NODE_ENV=development
PORT=3000

# CORS
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=debug
```

### For Production

```env
DATABASE_URL="your_production_database_url"
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://yourdomain.com
LOG_LEVEL=info
```

## 🗄️ Database Setup

### Initialize Prisma
```bash
npm run db:migrate
```

### View Database (Prisma Studio)
```bash
npm run db:studio
```

### Reset Database (⚠️ WARNING: Deletes all data)
```bash
npm run db:reset
```

### Seed with Sample Data
```bash
npm run db:seed
```

## 🚀 Running the Server

### Development Mode (with hot reload)
```bash
npm run dev
```

Server will be available at `http://localhost:3000`

### Production Mode
```bash
npm start
```

## 📚 API Documentation

### Swagger UI
Once the server is running, visit:
```
http://localhost:3000/api-docs
```

### Health Check
```bash
curl http://localhost:3000/health
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── projectController.js
│   │   ├── userStoryController.js
│   │   └── taskController.js
│   │
│   ├── routes/               # API routes
│   │   ├── projects.js
│   │   ├── userStories.js
│   │   └── tasks.js
│   │
│   ├── middlewares/          # Custom middleware
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── rateLimiter.js
│   │
│   ├── utils/                # Utility functions
│   │   ├── db.js             # Prisma client
│   │   ├── logger.js         # Winston logger
│   │   ├── validators.js     # Joi validators
│   │   └── seed.js           # Database seeding
│   │
│   ├── jobs/                 # Background jobs
│   │   └── dailyReport.js    # Daily report job
│   │
│   └── index.js              # Entry point
│
├── prisma/
│   └── schema.prisma         # Database schema
│
├── logs/                     # Application logs
├── .env                      # Environment variables
├── .env.example              # Example environment
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/projects` | Create project |
| GET | `/projects` | Get all projects |
| GET | `/projects/:id` | Get project with stories & tasks |
| PATCH | `/projects/:id` | Update project |
| DELETE | `/projects/:id` | Delete project |

### User Stories

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/user-stories` | Create story |
| GET | `/user-stories?projectId=1` | Get stories by project |
| PATCH | `/user-stories/:id` | Update story |
| DELETE | `/user-stories/:id` | Delete story |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create task |
| GET | `/tasks?storyId=1` | Get tasks by story |
| PATCH | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

## 📝 Example API Calls

### Create a Project
```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mobile App Redesign",
    "description": "Redesign the mobile app for better UX"
  }'
```

### Get All Projects
```bash
curl http://localhost:3000/projects
```

### Create a User Story
```bash
curl -X POST http://localhost:3000/user-stories \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": 1,
    "title": "Design homepage",
    "description": "Create mockups for homepage",
    "status": "In Progress",
    "priority": "High"
  }'
```

### Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "userStoryId": 1,
    "title": "Create wireframes",
    "description": "Design wireframes for homepage",
    "status": "Todo",
    "priority": "High",
    "assignedTo": "John Doe",
    "dueDate": "2024-12-31"
  }'
```

### Update a Task
```bash
curl -X PATCH http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "In Progress",
    "assignedTo": "Jane Smith"
  }'
```

## ❌ Error Handling

### Response Format
```json
{
  "success": false,
  "message": "Error message here",
  "stack": "Stack trace (development only)"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `429` - Too Many Requests (rate limited)
- `500` - Server Error

### Error Examples

**Validation Error**
```json
{
  "success": false,
  "message": "\"name\" is required"
}
```

**Not Found Error**
```json
{
  "success": false,
  "message": "Project not found"
}
```

## 📅 Background Jobs

### Daily Report Job
- **Schedule**: Every day at 00:00 (midnight)
- **Function**: Generates report of completed tasks
- **Output**: Logged to console and files
- **Location**: `src/jobs/dailyReport.js`

### Metrics Tracked
- Tasks completed yesterday
- Tasks by priority (High/Medium/Low)
- Overall task statistics
- Average tasks per day

### Customization
Edit `src/jobs/dailyReport.js` to:
- Change schedule timing
- Modify report metrics
- Save reports to database
- Send reports via email

## 🔒 Security

### Implemented Security Features

✅ **CORS** - Restricted to frontend domain
✅ **Helmet** - HTTP security headers
✅ **Input Validation** - Joi schema validation
✅ **Rate Limiting** - 100 requests per 15 minutes
✅ **Error Handling** - No sensitive info in errors
✅ **SQL Injection Prevention** - Prisma ORM
✅ **HTTPS Ready** - Deploy with SSL/TLS

### Security Checklist

- [ ] Use HTTPS in production
- [ ] Update `.env` with secure values
- [ ] Enable rate limiting for public endpoints
- [ ] Set strong database credentials
- [ ] Implement authentication if needed
- [ ] Use environment variables for secrets
- [ ] Regular dependency updates: `npm audit`
- [ ] Enable CORS only for trusted domains

## 🚢 Deployment

### Vercel
```bash
vercel deploy
```

### Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY src ./src
COPY prisma ./prisma
EXPOSE 3000
CMD ["npm", "start"]
```

### AWS/Azure/GCP
1. Set up database (PostgreSQL recommended for production)
2. Update DATABASE_URL in environment
3. Deploy using your platform's CLI
4. Run migrations: `npm run db:migrate`

## 📊 Monitoring & Logging

### Log Files
```
logs/
├── error.log     # Error logs only
└── all.log       # All logs
```

### Log Levels
- `debug` - Detailed debugging information
- `info` - General information
- `warn` - Warning messages
- `error` - Error messages

### View Real-time Logs
```bash
tail -f logs/all.log
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Manual Testing
Use Swagger UI at `http://localhost:3000/api-docs` or:
- Postman
- Insomnia
- cURL
- Thunder Client

## 📦 Dependencies

### Production
- **@prisma/client** - Database ORM
- **express** - Web framework
- **cors** - CORS middleware
- **helmet** - Security headers
- **morgan** - HTTP logger
- **joi** - Input validation
- **winston** - Application logging
- **node-cron** - Background jobs
- **swagger-jsdoc** - Swagger generation
- **express-rate-limit** - Rate limiting

### Development
- **prisma** - Migration tool
- **@faker-js/faker** - Seed data generation
- **eslint** - Code linting
- **jest** - Testing framework

## 🆘 Troubleshooting

### Database Connection Error
```
Error: ENOENT: no such file or directory, open './dev.db'
```
**Solution**: Run `npm run db:migrate`

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution**: Change PORT in .env or kill process using port 3000

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Update FRONTEND_URL in .env

### Prisma Migration Error
```
Error: Couldn't parse the schema
```
**Solution**: Check `prisma/schema.prisma` syntax

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Joi Validation](https://joi.dev/)
- [Node-Cron](https://github.com/node-cron/node-cron)
- [Winston Logging](https://github.com/winstonjs/winston)

## 📝 License

MIT License - see LICENSE file for details

## 👨‍💻 Support

For issues and questions:
1. Check the troubleshooting section
2. Review Swagger API documentation
3. Check logs in `logs/` folder
4. Open an issue on GitHub

---

**Built with ❤️ using Node.js and Express.js**

**Version**: 1.0.0
**Last Updated**: April 2024
