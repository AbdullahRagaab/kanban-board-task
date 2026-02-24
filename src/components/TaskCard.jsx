import { useTaskStore } from '../store/useTaskStore.js';
import { useUIStore } from '../store/useUIStore.js';
import { Trash2, GripVertical } from 'lucide-react';

/** Priority badge component */
const PriorityBadge = ({ priority }) => {
  const styles = {
    high: 'bg-priority-high-bg text-priority-high',
    medium: 'bg-priority-medium-bg text-priority-medium',
    low: 'bg-priority-low-bg text-priority-low',
  };

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[priority]}`}>
      {priority}
    </span>
  );
};

/** Individual task card component */
const TaskCard = ({ task }) => {
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const openForm = useUIStore((s) => s.openForm);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', String(task.id));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => openForm(task.column, task.id)}
      className="group bg-kanban-card border border-kanban-card-border rounded-lg p-3.5 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground leading-snug mb-1">
            {task.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
            {task.description}
          </p>
          <PriorityBadge priority={task.priority} />
        </div>
        <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
            className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
