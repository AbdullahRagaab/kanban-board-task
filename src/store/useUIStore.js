import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isFormOpen: false,
  editingTaskId: null,
  formColumn: 'todo',
  openForm: (column, taskId) =>
    set({ isFormOpen: true, formColumn: column, editingTaskId: taskId ?? null }),
  closeForm: () =>
    set({ isFormOpen: false, editingTaskId: null }),
}));
