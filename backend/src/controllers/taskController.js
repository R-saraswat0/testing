import prisma from '../utils/db.js'
import { AppError } from '../middlewares/errorHandler.js'
import { validateTask, validateId } from '../utils/validators.js'

/**
 * Create a new task
 * POST /tasks
 */
export const createTask = async (req, res, next) => {
  try {
    const validatedData = validateTask(req.body)

    // Verify user story exists
    const story = await prisma.userStory.findUnique({
      where: { id: validatedData.userStoryId },
    })

    if (!story) {
      throw new AppError('User story not found', 404)
    }

    const task = await prisma.task.create({
      data: validatedData,
    })

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get tasks by user story
 * GET /tasks?storyId=:storyId
 */
export const getTasksByStory = async (req, res, next) => {
  try {
    const storyId = req.query.storyId
      ? validateId(parseInt(req.query.storyId))
      : null

    if (!storyId) {
      throw new AppError('storyId query parameter is required', 400)
    }

    // Verify user story exists
    const story = await prisma.userStory.findUnique({
      where: { id: storyId },
    })

    if (!story) {
      throw new AppError('User story not found', 404)
    }

    const tasks = await prisma.task.findMany({
      where: { userStoryId: storyId },
      orderBy: { createdAt: 'desc' },
    })

    res.status(200).json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks,
      count: tasks.length,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Update task
 * PATCH /tasks/:id
 */
export const updateTask = async (req, res, next) => {
  try {
    const id = validateId(parseInt(req.params.id))

    // Only allow updating specific fields
    const updateData = {}
    const allowedFields = ['title', 'description', 'status', 'priority', 'assignedTo', 'dueDate']
    
    for (const field of allowedFields) {
      if (field in req.body) {
        updateData[field] = req.body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      throw new AppError('At least one field must be provided', 400)
    }

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
    })

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete task
 * DELETE /tasks/:id
 */
export const deleteTask = async (req, res, next) => {
  try {
    const id = validateId(parseInt(req.params.id))

    await prisma.task.delete({
      where: { id },
    })

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
