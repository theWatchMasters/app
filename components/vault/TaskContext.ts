import { API_BASE_URL } from '@/constants';
import { createContext, useContext } from 'react';
import { authFetch, SessionContextType } from '../auth/SessionContext';

export type Task =
  | {
      task_active: false;
    }
  | {
      task_active: true;
      ends_at: string;
      title: string;
      id: string;
      payment_intent: string;
      payment_intent_client_secret: string;
      payment_status: string;
    };

export type TaskContextType = {
  task: Task;
  setTask: (arg0: Task) => void;
  reloadTask: () => void;
};

export const TaskContext = createContext<TaskContextType>({
  task: { task_active: false },
  setTask: () => {},
  reloadTask: () => {},
});

export const useTask = () => useContext(TaskContext);

export const loadTask = async (
  session: SessionContextType,
  task: TaskContextType,
) => {
  const value = await authFetch(session, API_BASE_URL + 'vault/active');
  if (value === null || value.status === 401) {
    return task.setTask({ task_active: false });
  }
  const data = await value.json();
  if (!data.task) {
    return task.setTask({ task_active: false });
  }
  task.setTask({
    task_active: true,
    ...data.task,
  });
};
