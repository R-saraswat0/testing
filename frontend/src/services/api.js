import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ==================== Add JWT Token to Requests ====================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ==================== Projects ====================
export const projectsAPI = {
  // Get all projects with nested user stories and tasks
  getAll: () => api.get('/projects'),
  
  // Get project by ID with user stories and tasks
  getById: (id) => api.get(`/projects/${id}`),
  
  // Create new project
  create: (data) => api.post('/projects', data),
  
  // Update project
  update: (id, data) => api.patch(`/projects/${id}`, data),
  
  // Delete project
  delete: (id) => api.delete(`/projects/${id}`),
}

// ==================== User Stories ====================
export const userStoriesAPI = {
  // Get user stories by project ID
  getByProject: (projectId) => api.get('/user-stories', {
    params: { projectId },
  }),
  
  // Create new user story
  create: (data) => api.post('/user-stories', data),
  
  // Update user story
  update: (id, data) => api.patch(`/user-stories/${id}`, data),
  
  // Delete user story
  delete: (id) => api.delete(`/user-stories/${id}`),
}

// ==================== Tasks ====================
export const tasksAPI = {
  // Get tasks by user story ID
  getByStory: (storyId) => api.get('/tasks', {
    params: { storyId },
  }),
  
  // Create new task
  create: (data) => api.post('/tasks', data),
  
  // Update task
  update: (id, data) => api.patch(`/tasks/${id}`, data),
  
  // Delete task
  delete: (id) => api.delete(`/tasks/${id}`),
}

// ==================== Error Handling & Response Transformation ====================
api.interceptors.response.use(
  (response) => {
    // If response has the standard { success, message, data, ... } structure, extract the data
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      // Return response with the nested data as the main data property
      return {
        ...response,
        data: response.data.data
      }
    }
    // For other response structures, return as-is
    return response
  },
  (error) => {
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.response.data)
    } else if (error.response?.status === 400) {
      console.error('Validation error:', error.response.data)
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data)
    }
    return Promise.reject(error)
  },
)

export default api
