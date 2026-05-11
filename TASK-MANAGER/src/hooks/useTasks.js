import { useState, useEffect, useCallback } from 'react'
import * as taskService from '../taskService'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await taskService.getTasks()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const addTask = useCallback(async (title) => {
    const task = await taskService.createTask(title)
    setTasks((prev) => [task, ...prev])
    return task
  }, [])

  const toggleTask = useCallback(async (id, completed) => {
    const updated = await taskService.updateTask(id, { completed })
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    return updated
  }, [])

  const editTask = useCallback(async (id, title) => {
    const updated = await taskService.updateTask(id, { title })
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    return updated
  }, [])

  const removeTask = useCallback(async (id) => {
    await taskService.deleteTask(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { tasks, loading, error, addTask, toggleTask, editTask, removeTask, refetch: fetchTasks }
}
