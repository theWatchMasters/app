import {
  loadSession,
  Session,
  SessionContext,
} from '@/components/auth/SessionContext';
import { Task, TaskContext } from '@/components/vault/TaskContext';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import '../components/i18n/i18n';
import '../global.css';

export default function RootLayout() {
  const [session, setSession] = useState<Session>({ signed_in: false });
  const [task, setTask] = useState<Task>({ task_active: false });
  const [shouldReloadSession, setShouldReloadSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    (async () => {
      shouldReloadSession && setShouldReloadSession(false);
      loadSession({
        session,
        setSession,
        reloadSession: () => setShouldReloadSession(true),
      });
      setIsLoading(false);
    })();
  }, [shouldReloadSession]);

  if (isLoading) {
    return null;
  }
  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <TaskContext value={{ task, setTask }}>
        <SessionContext
          value={{
            session,
            setSession,
            reloadSession: () => setShouldReloadSession(true),
          }}
        >
          <StatusBar />
          <Stack screenOptions={{ headerShown: false }} />
          <PortalHost />
          <Toast />
        </SessionContext>
      </TaskContext>
    </ThemeProvider>
  );
}
