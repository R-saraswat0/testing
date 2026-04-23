import cron from 'node-cron'
import prisma from '../utils/db.js'
import { logger } from '../utils/logger.js'

const REPORT_RETRY_ATTEMPTS = 3
const REPORT_RETRY_DELAY_MS = 1000

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const generateDailyReport = async () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

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

  const doneTasks = await prisma.task.findMany({
    where: { status: 'Done' },
    include: {
      userStory: {
        include: {
          project: true,
        },
      },
    },
  })

  const taskStats = await prisma.task.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  })

  return {
    timestamp: new Date().toISOString(),
    completedTasksYesterday: completedTasks.length,
    completedTasks,
    tasksByPriority: {
      high: doneTasks.filter(task => task.priority === 'High').length,
      medium: doneTasks.filter(task => task.priority === 'Medium').length,
      low: doneTasks.filter(task => task.priority === 'Low').length,
    },
    totalStats: taskStats,
    summary: {
      totalTasksCompletedYesterday: completedTasks.length,
      totalDoneTasks: doneTasks.length,
      averageDoneTasksPerDay: Math.round(doneTasks.length / 30),
    },
  }
}

// The assignment calls for a simple async workflow without external queues.
// This retry loop handles transient database/runtime failures locally and
// leaves a clear log trail for each attempt.
const runWithRetry = async (work, attempts = REPORT_RETRY_ATTEMPTS) => {
  let lastError

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await work()
    } catch (error) {
      lastError = error
      logger.warn(`Daily report attempt ${attempt}/${attempts} failed: ${error.message}`)

      if (attempt < attempts) {
        await delay(REPORT_RETRY_DELAY_MS * attempt)
      }
    }
  }

  throw lastError
}

/**
 * Background job that runs daily at midnight.
 * It summarizes completed work and logs the generated report.
 * If all retry attempts fail, the API server keeps running and the error is
 * captured in logs for operational follow-up.
 */
export const startDailyReportJob = () => {
  const job = cron.schedule('0 0 * * *', async () => {
    try {
      logger.info('Daily report job started')

      const report = await runWithRetry(generateDailyReport)

      logger.info('Daily report generated', report)
      return report
    } catch (error) {
      logger.error('Daily report job failed after retries', error)
      return null
    }
  })

  logger.info('Daily report job scheduled (runs at 00:00 every day)')
  return job
}

startDailyReportJob()

export default startDailyReportJob
