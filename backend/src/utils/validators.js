import Joi from 'joi'
import { AppError } from '../middlewares/errorHandler.js'

export const validateProject = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(100),
    description: Joi.string().optional().max(500),
  })

  const { error, value } = schema.validate(data)
  if (error) {
    throw new AppError(error.details[0].message, 400)
  }
  return value
}

export const validateUserStory = (data) => {
  const schema = Joi.object({
    projectId: Joi.number().integer().required(),
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().optional().max(500),
    status: Joi.string().valid('Todo', 'In Progress', 'Done').optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
  })

  const { error, value } = schema.validate(data)
  if (error) {
    throw new AppError(error.details[0].message, 400)
  }
  return value
}

export const validateTask = (data) => {
  const schema = Joi.object({
    userStoryId: Joi.number().integer().required(),
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().optional().max(500),
    status: Joi.string().valid('Todo', 'In Progress', 'Done').optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
    assignedTo: Joi.string().optional().max(100),
    dueDate: Joi.date().optional(),
  })

  const { error, value } = schema.validate(data)
  if (error) {
    throw new AppError(error.details[0].message, 400)
  }
  return value
}

export const validateId = (id) => {
  const schema = Joi.number().integer().positive().required()
  const { error, value } = schema.validate(id)
  if (error) {
    throw new AppError('Invalid ID format', 400)
  }
  return value
}
