import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!title.trim()) {
      setError('Task title cannot be empty.')
      return
    }
    setSubmitting(true)
    try {
      await onAdd(title)
      setTitle('')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              if (error) setError(null)
            }}
            placeholder="What needs to be done?"
            maxLength={120}
            disabled={submitting}
            className="
              w-full bg-ink-800 border border-ink-600 rounded-lg
              px-4 py-3 font-body text-mist placeholder-mist/30
              focus:outline-none focus:border-acid focus:ring-1 focus:ring-acid/40
              disabled:opacity-50 transition-colors duration-150
            "
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-mist/30">
            {title.length}/120
          </span>
        </div>
        <button
          type="submit"
          disabled={submitting || !title.trim()}
          className="
            bg-acid text-ink-950 font-display font-700 px-6 py-3 rounded-lg
            hover:bg-acid-dim active:scale-95
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-150 whitespace-nowrap
          "
        >
          {submitting ? '…' : '+ Add'}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-400 text-sm font-body">{error}</p>
      )}
    </form>
  )
}
