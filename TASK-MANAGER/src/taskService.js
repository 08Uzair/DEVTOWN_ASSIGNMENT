import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'task_manager_tasks'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function delay(ms = 120) {
  return new Promise((res) => setTimeout(res, ms))
}

export async function getTasks() {
  await delay()
  return load()
}

export async function createTask(title) {
  await delay()
  const trimmed = title?.trim()
  if (!trimmed) throw new Error('Title is required.')
  if (trimmed.length > 120) throw new Error('Title must be 120 characters or fewer.')

  const task = {
    id: uuidv4(),
    title: trimmed,
    completed: false,
    createdAt: new Date().toISOString(),
  }

  const tasks = load()
  tasks.unshift(task)
  save(tasks)
  return task
}

export async function updateTask(id, patch) {
  await delay()
  const tasks = load()
  const idx = tasks.findIndex((t) => t.id === id)
  if (idx === -1) throw new Error('Task not found.')

  if ('title' in patch) {
    const trimmed = patch.title?.trim()
    if (!trimmed) throw new Error('Title is required.')
    if (trimmed.length > 120) throw new Error('Title must be 120 characters or fewer.')
    patch.title = trimmed
  }

  tasks[idx] = { ...tasks[idx], ...patch }
  save(tasks)
  return tasks[idx]
}

export async function deleteTask(id) {
  await delay()
  const tasks = load()
  const idx = tasks.findIndex((t) => t.id === id)
  if (idx === -1) throw new Error('Task not found.')
  tasks.splice(idx, 1)
  save(tasks)
  return { id }
}
