import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Edit2, Trash2, ChevronDown, LayoutGrid, List as ListIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../hooks/useApp'
import { projectsAPI, userStoriesAPI, tasksAPI } from '../services/api'
import { Card, CardBody, CardHeader, ActionButtons } from '../components/Card'
import { Button, SecondaryButton } from '../components/Button'
import { Modal } from '../components/Modal'
import { StatusBadge, PriorityBadge } from '../components/Badges'
import { ProjectForm } from '../components/ProjectForm'
import { UserStoryForm } from '../components/UserStoryForm'
import { TaskForm } from '../components/TaskForm'
import { KanbanBoard } from '../components/KanbanBoard'
import { EmptyState } from '../components/EmptyState'
import { CardSkeleton } from '../components/SkeletonLoaders'
import { format } from 'date-fns'

export const ProjectDetails = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { showSuccess, showError, setLoading, loading } = useApp()

  const [project, setProject] = useState(null)
  const [stories, setStories] = useState([])
  const [tasks, setTasks] = useState({})
  const [expandedStories, setExpandedStories] = useState(new Set())
  const [viewMode, setViewMode] = useState('list') // 'list' or 'kanban'

  // Modals
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showStoryModal, setShowStoryModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [editingStory, setEditingStory] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [selectedStoryId, setSelectedStoryId] = useState(null)

  useEffect(() => {
    fetchProjectData()
  }, [projectId])

  const fetchProjectData = async () => {
    try {
      setLoading(true)
      const [projectRes, storiesRes] = await Promise.all([
        projectsAPI.getById(projectId),
        userStoriesAPI.getByProject(projectId),
      ])
      setProject(projectRes.data)
      setStories(storiesRes.data || [])

      // Fetch tasks for all stories
      const allTasks = {}
      await Promise.all(
        (storiesRes.data || []).map(story =>
          tasksAPI.getByStory(story.id)
            .then(res => { allTasks[story.id] = res.data || [] })
            .catch(() => { allTasks[story.id] = [] })
        )
      )
      setTasks(allTasks)
    } catch (error) {
      showError('Failed to load project')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProject = async (formData) => {
    try {
      setLoading(true)
      await projectsAPI.update(projectId, formData)
      showSuccess('Project updated successfully!')
      setShowProjectModal(false)
      fetchProjectData()
    } catch (error) {
      showError('Failed to update project')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async () => {
    if (window.confirm('Are you sure? This will delete all user stories and tasks.')) {
      try {
        setLoading(true)
        await projectsAPI.delete(projectId)
        showSuccess('Project deleted successfully!')
        navigate('/')
      } catch (error) {
        showError('Failed to delete project')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleCreateStory = async (formData) => {
    try {
      setLoading(true)
      await userStoriesAPI.create({ ...formData, projectId: parseInt(projectId) })
      showSuccess('User story created!')
      setShowStoryModal(false)
      fetchProjectData()
    } catch (error) {
      showError('Failed to create story')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStory = async (formData) => {
    try {
      setLoading(true)
      await userStoriesAPI.update(editingStory.id, formData)
      showSuccess('Story updated!')
      setShowStoryModal(false)
      setEditingStory(null)
      fetchProjectData()
    } catch (error) {
      showError('Failed to update story')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteStory = async (storyId) => {
    if (window.confirm('Delete this user story and all its tasks?')) {
      try {
        setLoading(true)
        await userStoriesAPI.delete(storyId)
        showSuccess('Story deleted!')
        fetchProjectData()
      } catch (error) {
        showError('Failed to delete story')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleCreateTask = async (formData) => {
    try {
      setLoading(true)
      await tasksAPI.create({ ...formData, userStoryId: selectedStoryId })
      showSuccess('Task created!')
      setShowTaskModal(false)
      fetchProjectData()
    } catch (error) {
      showError('Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateTask = async (formData) => {
    try {
      setLoading(true)
      await tasksAPI.update(editingTask.id, formData)
      showSuccess('Task updated!')
      setShowTaskModal(false)
      setEditingTask(null)
      fetchProjectData()
    } catch (error) {
      showError('Failed to update task')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Delete this task?')) {
      try {
        setLoading(true)
        await tasksAPI.delete(taskId)
        showSuccess('Task deleted!')
        fetchProjectData()
      } catch (error) {
        showError('Failed to delete task')
      } finally {
        setLoading(false)
      }
    }
  }

  const toggleStory = (storyId) => {
    const newExpanded = new Set(expandedStories)
    if (newExpanded.has(storyId)) {
      newExpanded.delete(storyId)
    } else {
      newExpanded.add(storyId)
    }
    setExpandedStories(newExpanded)
  }

  if (!project) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <CardSkeleton />
          </motion.div>
        ))}
      </motion.div>
    )
  }

  // Calculate stats
  const totalStories = stories.length
  const totalTasks = Object.values(tasks).reduce((sum, arr) => sum + (arr?.length || 0), 0)
  const completedStories = stories.filter(s => s.status === 'done').length
  const inProgressStories = stories.filter(s => s.status === 'in-progress').length

  // Prepare tasks for Kanban view
  const kanbanTasks = {
    todo: Object.values(tasks).flat().filter(t => t.status === 'todo'),
    'in-progress': Object.values(tasks).flat().filter(t => t.status === 'in-progress'),
    done: Object.values(tasks).flat().filter(t => t.status === 'done'),
  }

  return (
    <motion.div className="space-y-6">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </motion.button>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              icon={Edit2}
              onClick={() => {
                setEditingProject(project)
                setShowProjectModal(true)
              }}
              className="dark:border-slate-600 dark:text-gray-300"
            >
              Edit
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={handleDeleteProject}
            >
              Delete
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Stories', value: totalStories, icon: '📋' },
          { label: 'In Progress', value: inProgressStories, icon: '⚡' },
          { label: 'Completed', value: completedStories, icon: '✅' },
          { label: 'Total Tasks', value: totalTasks, icon: '✓' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* View Mode Toggle & Add Story Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <div className="flex gap-2 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded transition-all ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <ListIcon className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-2 rounded transition-all ${
              viewMode === 'kanban'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </motion.button>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="sm"
            icon={Plus}
            onClick={() => {
              setEditingStory(null)
              setShowStoryModal(true)
            }}
          >
            Add Story
          </Button>
        </motion.div>
      </motion.div>

      {/* Stories Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {viewMode === 'list' ? (
          // List View
          <div className="space-y-2">
            {stories.length === 0 ? (
              <EmptyState
                icon="stories"
                title="No user stories yet"
                description="Create your first user story to organize your work"
                action={() => setShowStoryModal(true)}
                actionLabel="Create Story"
              />
            ) : (
              <AnimatePresence>
                {stories.map((story, idx) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow dark:hover:shadow-lg">
                      <motion.div
                        className="px-6 py-4 flex items-center gap-4 cursor-pointer"
                        onClick={() => toggleStory(story.id)}
                        whileHover={{ paddingLeft: 28 }}
                      >
                        <motion.div
                          animate={{ rotate: expandedStories.has(story.id) ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{story.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">{story.description}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <StatusBadge status={story.status} />
                          <PriorityBadge priority={story.priority} />
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex gap-1 opacity-0 hover:opacity-100 transition-opacity"
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
                              onClick={() => {
                                setEditingStory(story)
                                setShowStoryModal(true)
                              }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                              onClick={() => handleDeleteStory(story.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>

                      {/* Expanded Tasks Section */}
                      <AnimatePresence>
                        {expandedStories.has(story.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-6 py-4 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700 space-y-2"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-gray-700 dark:text-gray-300">
                                Tasks ({tasks[story.id]?.length || 0})
                              </h4>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 font-medium"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedStoryId(story.id)
                                  setEditingTask(null)
                                  setShowTaskModal(true)
                                }}
                              >
                                <Plus className="w-4 h-4" />
                                Add Task
                              </motion.button>
                            </div>

                            {tasks[story.id]?.length === 0 ? (
                              <p className="text-sm text-gray-600 dark:text-gray-400 py-4 text-center">
                                No tasks yet. Add one to get started!
                              </p>
                            ) : (
                              <div className="space-y-2">
                                <AnimatePresence>
                                  {tasks[story.id].map((task, tidx) => (
                                    <motion.div
                                      key={task.id}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -20 }}
                                      transition={{ delay: tidx * 0.05 }}
                                    >
                                      <Card className="bg-white dark:bg-slate-800 hover:shadow-sm transition-shadow">
                                        <CardBody>
                                          <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                              <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{task.description}</p>
                                              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                                                {task.assigned_to && (
                                                  <span>👤 {task.assigned_to}</span>
                                                )}
                                                {task.due_date && (
                                                  <span>📅 {format(new Date(task.due_date), 'MMM d')}</span>
                                                )}
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                              <StatusBadge status={task.status} />
                                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <motion.button
                                                  whileHover={{ scale: 1.1 }}
                                                  whileTap={{ scale: 0.95 }}
                                                  className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded"
                                                  onClick={() => {
                                                    setEditingTask(task)
                                                    setShowTaskModal(true)
                                                  }}
                                                >
                                                  <Edit2 className="w-3.5 h-3.5" />
                                                </motion.button>
                                                <motion.button
                                                  whileHover={{ scale: 1.1 }}
                                                  whileTap={{ scale: 0.95 }}
                                                  className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                                                  onClick={() => handleDeleteTask(task.id)}
                                                >
                                                  <Trash2 className="w-3.5 h-3.5" />
                                                </motion.button>
                                              </div>
                                            </div>
                                          </div>
                                        </CardBody>
                                      </Card>
                                    </motion.div>
                                  ))}
                                </AnimatePresence>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        ) : (
          // Kanban View
          <div className="overflow-x-auto -mx-6 px-6">
            {totalTasks === 0 ? (
              <EmptyState
                icon="tasks"
                title="No tasks in this project"
                description="Create user stories and add tasks to organize your work"
                size="md"
              />
            ) : (
              <KanbanBoard tasks={kanbanTasks} />
            )}
          </div>
        )}
      </motion.div>

      {/* Project Modal */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => {
          setShowProjectModal(false)
          setEditingProject(null)
        }}
        title="Edit Project"
        size="lg"
      >
        <ProjectForm
          initialData={editingProject}
          onSubmit={handleUpdateProject}
          onCancel={() => {
            setShowProjectModal(false)
            setEditingProject(null)
          }}
          isLoading={loading}
        />
      </Modal>

      {/* Story Modal */}
      <Modal
        isOpen={showStoryModal}
        onClose={() => {
          setShowStoryModal(false)
          setEditingStory(null)
        }}
        title={editingStory ? 'Edit User Story' : 'Create User Story'}
        size="lg"
      >
        <UserStoryForm
          initialData={editingStory}
          onSubmit={editingStory ? handleUpdateStory : handleCreateStory}
          onCancel={() => {
            setShowStoryModal(false)
            setEditingStory(null)
          }}
          isLoading={loading}
        />
      </Modal>

      {/* Task Modal */}
      <Modal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false)
          setEditingTask(null)
        }}
        title={editingTask ? 'Edit Task' : 'Create Task'}
        size="lg"
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => {
            setShowTaskModal(false)
            setEditingTask(null)
          }}
          isLoading={loading}
        />
      </Modal>
    </motion.div>
  )
}
