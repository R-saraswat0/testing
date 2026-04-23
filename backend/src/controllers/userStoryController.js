import prisma from '../utils/db.js'
import { AppError } from '../middlewares/errorHandler.js'
import { validateUserStory, validateId } from '../utils/validators.js'

/**
 * Create a new user story
 * POST /user-stories
 */
export const createUserStory = async (req, res, next) => {
  try {
    const validatedData = validateUserStory(req.body)

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: validatedData.projectId },
    })

    if (!project) {
      throw new AppError('Project not found', 404)
    }

    const story = await prisma.userStory.create({
      data: validatedData,
      include: { tasks: true },
    })

    res.status(201).json({
      success: true,
      message: 'User story created successfully',
      data: story,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get user stories by project
 * GET /user-stories?projectId=:projectId
 */
export const getUserStoriesByProject = async (req, res, next) => {
  try {
    const projectId = req.query.projectId
      ? validateId(parseInt(req.query.projectId))
      : null

    if (!projectId) {
      throw new AppError('projectId query parameter is required', 400)
    }

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      throw new AppError('Project not found', 404)
    }

    const stories = await prisma.userStory.findMany({
      where: { projectId },
      include: { tasks: true },
      orderBy: { createdAt: 'desc' },
    })

    res.status(200).json({
      success: true,
      message: 'User stories retrieved successfully',
      data: stories,
      count: stories.length,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Update user story
 * PATCH /user-stories/:id
 */
export const updateUserStory = async (req, res, next) => {
  try {
    const id = validateId(parseInt(req.params.id))

    // Only allow updating specific fields
    const updateData = {}
    const allowedFields = ['title', 'description', 'status', 'priority']
    
    for (const field of allowedFields) {
      if (field in req.body) {
        updateData[field] = req.body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      throw new AppError('At least one field must be provided', 400)
    }

    const story = await prisma.userStory.update({
      where: { id },
      data: updateData,
      include: { tasks: true },
    })

    res.status(200).json({
      success: true,
      message: 'User story updated successfully',
      data: story,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete user story
 * DELETE /user-stories/:id
 */
export const deleteUserStory = async (req, res, next) => {
  try {
    const id = validateId(parseInt(req.params.id))

    await prisma.userStory.delete({
      where: { id },
    })

    res.status(200).json({
      success: true,
      message: 'User story deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
