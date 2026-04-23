import cron from 'node-cron'
import prisma from '../utils/db.js'
import { logger } from '../utils/logger.js'

/**
 * Background job that runs daily at 00:00 (midnight)
 * Generates a report of completed tasks from the previous day
 */
export const startDailyReportJob = () => {
  // Run every day at 00:00 (midnight)
  const job = cron.schedule('0 0 * * *', async () => {
    try {
      logger.info('🔄 Daily report job started...')

      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Find completed tasks from yesterday
      const completedTasks = await prisma.task.findMany({
        where: {
          status: 'Done',
          updatedAt: {
            gte: yesterday,
            lt: today,
          },
        },
        include: {
          userStory: {
            include: {
              project: true,
            },
          },
        },
      })

      // Find all done tasks by priority
      const tasksByPriority = await prisma.task.findMany({
        where: { status: 'Done' },
        include: {
          userStory: {
            include: {
              project: true,
            },
          },
        },
      })

      // Count tasks by status
      const taskStats = await prisma.task.groupBy({
        by: ['status'],
        _count: {
          id: true,
        },
      })

      // Generate report
      const report = {
        timestamp: new Date().toISOString(),
        completedTasksYesterday: completedTasks.length,
        completedTasks,
        tasksByPriority: {
          high: tasksByPriority.filter(t => t.priority === 'High').length,
          medium: tasksByPriority.filter(t => t.priority === 'Medium').length,
          low: tasksByPriority.filter(t => t.priority === 'Low').length,
        },
        totalStats: taskStats,
        summary: {
          totalTasksCompleted: completedTasks.length,
          totalOverallTasks: tasksByPriority.length,
          averageTasksPerDay: Math.round(tasksByPriority.length / 30),
        },
      }

      logger.info('✅ Daily Report Generated:', JSON.stringify(report, null, 2))

      // Optional: Save report to a file or database
      // await saveReportToDatabase(report)

      return report
    } catch (error) {
      logger.error('❌ Daily report job failed:', error)
      // Retry logic can be added here
      throw error
    }
  })

  logger.info('📅 Daily report job scheduled (runs at 00:00 every day)')
  return job
}

// Start the job when this module is imported
startDailyReportJob()

export default startDailyReportJob
