import express from 'express'
import * as userStoryController from '../controllers/userStoryController.js'

const router = express.Router()

/**
 * @swagger
 * /user-stories:
 *   post:
 *     summary: Create a new user story
 *     tags: [User Stories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [projectId, title]
 *             properties:
 *               projectId:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: "Design homepage mockups"
 *               description:
 *                 type: string
 *                 example: "Create initial designs for homepage"
 *               status:
 *                 type: string
 *                 enum: [Todo, In Progress, Done]
 *                 example: "Todo"
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 example: "High"
 *     responses:
 *       201:
 *         description: User story created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Project not found
 */
router.post('/', userStoryController.createUserStory)

/**
 * @swagger
 * /user-stories:
 *   get:
 *     summary: Get user stories by project
 *     tags: [User Stories]
 *     parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: List of user stories for the project
 *       404:
 *         description: Project not found
 */
router.get('/', userStoryController.getUserStoriesByProject)

/**
 * @swagger
 * /user-stories/{id}:
 *   patch:
 *     summary: Update user story
 *     tags: [User Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Todo, In Progress, Done]
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *     responses:
 *       200:
 *         description: User story updated successfully
 *       404:
 *         description: User story not found
 */
router.patch('/:id', userStoryController.updateUserStory)

/**
 * @swagger
 * /user-stories/{id}:
 *   delete:
 *     summary: Delete user story
 *     tags: [User Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User story deleted successfully
 *       404:
 *         description: User story not found
 */
router.delete('/:id', userStoryController.deleteUserStory)

export default router
