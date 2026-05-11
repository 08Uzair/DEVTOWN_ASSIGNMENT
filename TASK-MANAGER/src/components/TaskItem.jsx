import { useState } from 'react'

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [editVal, setEditVal] = useState(task.title)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  async function handleToggle() {
    setBusy(true)
    try {
      await onToggle(task.id, !task.completed)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    setBusy(true)
    try {
      await onDelete(task.id)
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await onEdit(task.id, editVal)
      setEditing(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  function handleEditCancel() {
    setEditVal(task.title)
    setEditing(false)
    setError(null)
  }

  const dateStr = new Date(task.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div
      className={`
        task-enter group relative flex items-start gap-4
        bg-ink-800 border rounded-xl px-4 py-4
        transition-all duration-200
        ${task.completed ? 'border-ink-600 opacity-60' : 'border-ink-700 hover:border-ink-600'}
        ${busy ? 'pointer-events-none' : ''}
      `}
    >
      <button
        onClick={handleToggle}
        disabled={busy}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        className={`
          mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center
          transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-acid
          ${task.completed
            ? 'bg-acid border-acid'
            : 'border-ink-600 hover:border-acid bg-transparent'}
        `}
      >
        {task.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {editing ? (
          <form onSubmit={handleEditSubmit} className="flex gap-2">
            <input
              autoFocus
              value={editVal}
              onChange={(e) => setEditVal(e.target.value)}
              maxLength={120}
              className="
                flex-1 bg-ink-900 border border-acid/50 rounded-md
                px-3 py-1 text-sm font-body text-mist
                focus:outline-none focus:border-acid
              "
            />
            <button type="submit" disabled={busy || !editVal.trim()} className="text-acid text-sm font-display hover:text-acid-dim disabled:opacity-40">
              Save
            </button>
            <button type="button" onClick={handleEditCancel} className="text-mist/40 text-sm hover:text-mist/70">
              Cancel
            </button>
          </form>
        ) : (
          <p className={`font-body text-sm leading-snug break-words ${task.completed ? 'line-through text-mist/40' : 'text-mist'}`}>
            {task.title}
          </p>
        )}

        <div className="mt-1.5 flex items-center gap-3">
          <span className="font-mono text-xs text-mist/30">{dateStr}</span>
          {task.completed && (
            <span className="text-xs font-body text-acid/60 bg-acid/10 px-1.5 py-0.5 rounded">
              done
            </span>
          )}
        </div>

        {error && <p className="mt-1 text-red-400 text-xs">{error}</p>}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
        {!editing && (
          <button
            onClick={() => { setEditing(true); setError(null) }}
            disabled={busy}
            aria-label="Edit task"
            className="p-1.5 rounded-md text-mist/30 hover:text-mist hover:bg-ink-700 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9.5 2L12 4.5L5 11.5H2.5V9L9.5 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={busy}
          aria-label="Delete task"
          className="p-1.5 rounded-md text-mist/30 hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 4h10M5 4V2.5h4V4M5.5 6.5v4M8.5 6.5v4M3 4l.8 7.5h6.4L11 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {busy && (
        <div className="absolute inset-0 rounded-xl bg-ink-900/40 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-acid border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
