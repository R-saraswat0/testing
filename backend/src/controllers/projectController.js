import prisma from '../utils/db.js'
import { AppError } from '../middlewares/errorHandler.js'
import { validateProject, validateId } from '../utils/validators.js'

/**
 * Create a new project
 * POST /projects
 */
export const createProject = async (req, res, next) => {
  try {
    const validatedData = validateProject(req.body)

    const project = await prisma.project.create({
      data: validatedData,
    })

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get all projects
 * GET /projects
 */
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        userStories: {
          include: {
            tasks: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: projects,
      count: projects.length,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Get project by ID with user stories and tasks
 * GET /projects/:id
 */
export const getProjectById = async (req, res, next) => {
  try {
    const id = validateId(parseInt(req.params.id))

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        userStories: {
          include: {
            tasks: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!project) {
      throw new AppError('Project not found', 404)
    }

    res.status(200).json({
      success: true,
      message: 'Project retrieved successfully',
      data: project,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Update project
 * PATCH /projects/:id
 */
export const updateProject = async (req, res, next) => {
  try {
    const id = validateId(parseInt(req.params.id))
    const validatedData = validateProject(req.body)

    const project = await prisma.project.update({
      where: { id },
      data: validatedData,
    })

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Delete project
 * DELETE /projects/:id
 */
export const deleteProject = async (req, res, next) => {
  try {
    const id = validateId(parseInt(req.params.id))

    await prisma.project.delete({
      where: { id },
    })

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
