import Column from '../components/Column.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TaskForm from '../components/TaskForm.jsx';
import { useTaskStore } from '../store/useTaskStore.js';
import { LayoutGrid } from 'lucide-react';

/** Column order for the Kanban board */
const columns = ['todo', 'inprogress', 'review', 'done'];

const Index = () => {
  const totalTasks = useTaskStore((s) => s.tasks.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
              <LayoutGrid className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wide uppercase text-foreground">
                Kanban Board
              </h1>
              <p className="text-xs text-muted-foreground">{totalTasks} tasks</p>
            </div>
          </div>
          <SearchBar />
        </div>
      </header>

      {/* Board */}
      <main className="p-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((col) => (
            <Column key={col} status={col} />
          ))}
        </div>
      </main>

      {/* Task form modal */}
      <TaskForm />
    </div>
  );
};

export default Index;
