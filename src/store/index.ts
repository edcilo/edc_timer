import { create } from 'zustand';

export type Task = {
    id: string;
    title: string;
    description: string;
    duration: number; // duration in seconds
    completed: boolean;
}

type NewTask = {
    title: string;
    description: string;
    duration: number; // duration in seconds
} 

type TaskStore = {
    tasks: Task[];
    activeTask: Task | null;
    addTask: (task: NewTask) => void;
    removeTask: (id: string) => void;
    setActiveTask: (id: string) => void;
    completeTask: (id: string) => void;
}

export const useStore = create<TaskStore>((set) => ({
    tasks: [],
    activeTask: null,
    addTask: (task) => set((state) => ({
        tasks: [...state.tasks, {
            ...task,
            id: crypto.randomUUID(),
            completed: false,
        }]
    })),
    removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter(task => task.id!== id)
    })),
    setActiveTask: (id) => set((state) => ({
        activeTask: state.tasks.find(task => task.id === id) || null
    })),
    completeTask: (id) => set((state) => ({
        tasks: state.tasks.map(task => task.id === id ? { ...task, completed: true } : task)
    }))
}))
