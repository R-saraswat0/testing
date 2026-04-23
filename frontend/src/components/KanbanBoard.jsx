import React, { useState } from 'react'
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { motion, AnimatePresence } from 'framer-motion'
import { GripVertical, Plus, User } from 'lucide-react'
import { KanbanColumn } from './KanbanColumn'
import { KanbanTask } from './KanbanTask'

export const KanbanBoard = ({ tasks = { todo: [], 'in-progress': [], done: [] } }) => {
  const [items, setItems] = useState(tasks)
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-slate-800', count: items.todo?.length || 0 },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900/20', count: items['in-progress']?.length || 0 },
    { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900/20', count: items.done?.length || 0 },
  ]

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const activeStatus = Object.keys(items).find(key =>
      items[key].some(item => item.id === active.id)
    )
    const overStatus = Object.keys(items).find(key =>
      items[key].some(item => item.id === over.id)
    ) || over.id

    if (activeStatus && overStatus) {
      const activeIndex = items[activeStatus].findIndex(item => item.id === active.id)
      const overIndex = items[overStatus].findIndex(item => item.id === over.id)

      if (activeStatus === overStatus) {
        setItems({
          ...items,
          [activeStatus]: arrayMove(items[activeStatus], activeIndex, overIndex),
        })
      } else {
        const newItems = JSON.parse(JSON.stringify(items))
        const [movedItem] = newItems[activeStatus].splice(activeIndex, 1)
        newItems[overStatus].splice(overIndex, 0, movedItem)
        setItems(newItems)
      }
    }

    setActiveId(null)
  }

  const findTaskStatus = (taskId) => {
    return Object.keys(items).find(key =>
      items[key].some(item => item.id === taskId)
    )
  }

  const findTask = (taskId) => {
    for (const status of Object.keys(items)) {
      const task = items[status].find(item => item.id === taskId)
      if (task) return task
    }
    return null
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6">
        <AnimatePresence>
          {columns.map((column, idx) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex-shrink-0 w-80"
            >
              <KanbanColumn
                column={column}
                tasks={items[column.id] || []}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <DragOverlay>
        {activeId && (
          <KanbanTask
            task={findTask(activeId)}
            isDragging
          />
        )}
      </DragOverlay>
    </DndContext>
  )
}
