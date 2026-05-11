import { useState, useMemo } from 'react'
import { useTasks } from './hooks/useTasks'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'

export default function App() {
  const { tasks, loading, error, addTask, toggleTask, editTask, removeTask } = useTasks()
  const [filter, setFilter] = useState('all')
  const [globalError, setGlobalError] = useState(null)

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.completed)
    if (filter === 'completed') return tasks.filter((t) => t.completed)
    return tasks
  }, [tasks, filter])

  const counts = useMemo(() => ({
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
    total: tasks.length,
  }), [tasks])

  async function handleAdd(title) {
    setGlobalError(null)
    try {
      await addTask(title)
    } catch (err) {
      setGlobalError(err.message)
      throw err
    }
  }

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(184,255,87,0.07) 0%, transparent 70%)',
        }}
      />

      <main className="relative flex-1 w-full max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <header className="mb-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-xs text-acid/70 uppercase tracking-widest mb-1">
                workspace
              </p>
              <h1 className="font-display text-4xl font-800 text-mist leading-none">
                Task<span className="text-acid">s</span>
              </h1>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-mist/20 leading-loose">
                {counts.completed}/{counts.total} done
              </p>
              {counts.total > 0 && (
                <div className="w-24 h-1 bg-ink-700 rounded-full overflow-hidden ml-auto mt-1">
                  <div
                    className="h-full bg-acid rounded-full transition-all duration-500"
                    style={{ width: `${counts.total ? (counts.completed / counts.total) * 100 : 0}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        {(error || globalError) && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm font-body">
            {error || globalError}
          </div>
        )}

        <TaskForm onAdd={handleAdd} />

        {tasks.length > 0 && (
          <FilterBar filter={filter} onChange={setFilter} counts={counts} />
        )}

        {loading ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-6 h-6 border-2 border-acid border-t-transparent rounded-full animate-spin" />
            <p className="font-body text-sm text-mist/30">Loading tasks…</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            filter={filter}
            onToggle={toggleTask}
            onDelete={removeTask}
            onEdit={editTask}
          />
        )}
      </main>

      <footer className="relative border-t border-ink-800 py-4 text-center">
        <p className="font-mono text-xs text-mist/20">
          Tasks persisted in localStorage
        </p>
      </footer>
    </div>
  )
}
