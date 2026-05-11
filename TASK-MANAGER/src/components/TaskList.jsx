import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete, onEdit, filter }) {
  if (tasks.length === 0) {
    const messages = {
      all: { emoji: '✦', text: 'No tasks yet. Add one above.' },
      active: { emoji: '◎', text: 'No active tasks. Well done!' },
      completed: { emoji: '◉', text: 'Nothing completed yet.' },
    }
    const msg = messages[filter] || messages.all
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-3xl text-mist/20 mb-3">{msg.emoji}</span>
        <p className="font-body text-sm text-mist/30">{msg.text}</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </li>
      ))}
    </ul>
  )
}
