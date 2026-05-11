# Task Manager

A full-stack-style Task Manager built with **React + Vite + Tailwind CSS**, using **localStorage** as the persistence layer (no server required).

## Tech Stack

| Layer     | Choice                          |
|-----------|---------------------------------|
| Frontend  | React 18, Vite 4, Tailwind CSS 3 |
| Persistence | localStorage (via taskService.js) |
| State     | React hooks (useState, useEffect) |
| IDs       | uuid v4                         |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

### Build for production
```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Features

### Core
- ✅ View all tasks
- ✅ Add a new task (with validation — required, max 120 chars)
- ✅ Mark a task complete / incomplete
- ✅ Delete a task
- ✅ Loading and error states throughout

### Bonus
- ✅ Filter tasks — All / Active / Completed
- ✅ Edit an existing task's title inline
- ✅ Persist tasks after refresh (localStorage)

---

## Project Structure

```
src/
├── taskService.js          # "API" layer — all CRUD ops against localStorage
├── hooks/
│   └── useTasks.js         # Data-fetching hook, mirrors REST API semantics
├── components/
│   ├── TaskForm.jsx         # Add-task form with validation
│   ├── TaskItem.jsx         # Individual task row with toggle/edit/delete
│   ├── TaskList.jsx         # Renders list or empty state
│   └── FilterBar.jsx        # All / Active / Completed filter tabs
├── App.jsx                  # Root layout, wires everything together
└── index.css                # Tailwind directives + custom animations
```

---

## API Design (taskService.js)

All functions are async and mirror a REST interface.

| Function       | Mirrors         | Behaviour                              |
|----------------|-----------------|----------------------------------------|
| `getTasks()`   | GET /tasks      | Returns all tasks from localStorage   |
| `createTask()` | POST /tasks     | Validates title, generates uuid        |
| `updateTask()` | PATCH /tasks/:id| Accepts partial patch (completed/title)|
| `deleteTask()` | DELETE /tasks/:id| Removes by id                         |

Errors throw with a descriptive message, caught by the hook or component.

---

## Assumptions & Trade-offs

- **No separate backend** — `taskService.js` acts as the API layer. Swapping it for real `fetch()` calls would require only changing that file; all hooks and components are decoupled from the storage mechanism.
- **In-memory delay simulation** — a 120 ms artificial delay is added in `taskService.js` so loading/busy states are exercised during local dev.
- **UUID from npm** — used for reliably unique IDs without a server.
- **Scoped styles via Tailwind** — no CSS modules or styled-components to keep things simple.
