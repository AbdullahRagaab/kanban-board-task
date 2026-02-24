import { create } from 'zustand';

const initialTasks = [
  { id: 1, title: 'API integration', description: 'Connect frontend to REST API endpoints', column: 'todo', priority: 'high' },
  { id: 2, title: 'Unit tests', description: 'Write tests for utility functions and hooks', column: 'todo', priority: 'low' },
  { id: 3, title: 'Performance audit', description: 'Lighthouse scores and bundle analysis', column: 'todo', priority: 'low' },
  { id: 4, title: 'Notification system', description: 'Toast notifications and in-app alerts', column: 'todo', priority: 'medium' },
  { id: 5, title: 'User settings page', description: 'Profile editing, preferences, and account management', column: 'todo', priority: 'low' },
  { id: 6, title: 'Authentication flow', description: 'Implement login, signup, and password reset screens', column: 'inprogress', priority: 'high' },
  { id: 7, title: 'File upload component', description: 'Drag and drop file upload with preview', column: 'inprogress', priority: 'medium' },
  { id: 8, title: 'Dark mode support', description: 'Add theme toggle and CSS variable switching', column: 'review', priority: 'medium' },
  { id: 9, title: 'Dashboard layout', description: 'Build responsive sidebar and main content area', column: 'review', priority: 'medium' },
  { id: 10, title: 'Design system tokens', description: 'Set up color palette, typography, and spacing scales', column: 'done', priority: 'high' },
];

let nextId = 11;

export const useTaskStore = create((set) => ({
  tasks: initialTasks,
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: nextId++ }],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  moveTask: (id, column) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, column } : t)),
    })),
}));
