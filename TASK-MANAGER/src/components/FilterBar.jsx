const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

export default function FilterBar({ filter, onChange, counts }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex gap-1 bg-ink-800 rounded-lg p-1">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`
              px-3 py-1.5 rounded-md text-sm font-display transition-all duration-150
              ${filter === key
                ? 'bg-acid text-ink-950 font-700'
                : 'text-mist/50 hover:text-mist'}
            `}
          >
            {label}
          </button>
        ))}
      </div>
      <span className="font-mono text-xs text-mist/30">
        {counts.active} remaining
      </span>
    </div>
  )
}
