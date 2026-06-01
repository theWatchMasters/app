import { API_BASE_URL } from '@/constants';
import { createContext, useContext } from 'react';


export type Task =
  | {
      task_active: false;
    }
  | {
      task_active: true;
      ends_at: string;
      title: string;
      id: string;
  }


export type TaskContextType = {
  task: Task;
  setTask: (arg0: Task) => void;
};

export const TaskContext = createContext<TaskContextType>({
  task: { task_active: false },
  setTask: () => {},
});

export const useTask = () => useContext(TaskContext);

export const loadTask = async (task: TaskContextType) => {
  const value = await fetch(API_BASE_URL + '/current_task');
  if (value.status === 401) {
    return task.setTask({ task_active: false });
  }
  const data = await value.json();
  task.setTask({
    task_active: true,
    ...data,
  });
};