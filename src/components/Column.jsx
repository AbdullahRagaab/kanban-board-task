import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore.js';
import { useUIStore } from '../store/useUIStore.js';
import TaskCard from './TaskCard.jsx';
import { Plus } from 'lucide-react';

/** Column configuration */
const columnConfig = {
  todo: { label: 'TO DO', dotClass: 'bg-dot-todo' },
  inprogress: { label: 'IN PROGRESS', dotClass: 'bg-dot-inprogress' },
  review: { label: 'IN REVIEW', dotClass: 'bg-dot-review' },
  done: { label: 'DONE', dotClass: 'bg-dot-done' },
};

const TASKS_PER_PAGE = 5;

/** Column component displaying tasks for a given status */
const Column = ({ status }) => {
  const tasks = useTaskStore((s) => s.tasks);
  const searchQuery = useTaskStore((s) => s.searchQuery);
  const moveTask = useTaskStore((s) => s.moveTask);
  const openForm = useUIStore((s) => s.openForm);
  const [visibleCount, setVisibleCount] = useState(TASKS_PER_PAGE);

  const config = columnConfig[status];

  // Filter tasks by column and search query
  const columnTasks = tasks.filter((t) => {
    if (t.column !== status) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
  });

  const visibleTasks = columnTasks.slice(0, visibleCount);
  const hasMore = visibleCount < columnTasks.length;

  /** Handle drag over for drop target */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  /** Handle drop to move task */
  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData('taskId'));
    if (taskId) {
      moveTask(taskId, status);
    }
  };

  return (
    <div
      className="flex flex-col min-w-[260px] w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <span className={`w-2.5 h-2.5 rounded-full ${config.dotClass}`} />
        <h2 className="text-xs font-bold tracking-widest text-foreground uppercase">
          {config.label}
        </h2>
        <span className="text-xs font-medium text-muted-foreground ml-1">
          {columnTasks.length}
        </span>
      </div>

      {/* Task cards list */}
      <div className="flex flex-col gap-2.5 kanban-scrollbar">
        {visibleTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {/* Load more button */}
        {hasMore && (
          <button
            onClick={() => setVisibleCount((c) => c + TASKS_PER_PAGE)}
            className="text-xs text-primary font-medium py-2 hover:underline"
          >
            Show more ({columnTasks.length - visibleCount} remaining)
          </button>
        )}
      </div>

      {/* Add task button */}
      <button
        onClick={() => openForm(status)}
        className="mt-2.5 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-dashed border-border text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        <Plus className="h-3.5 w-3.5" />
        Add task
      </button>
    </div>
  );
};

export default Column;
