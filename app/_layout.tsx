import {
  loadSession,
  Session,
  SessionContext,
} from '@/components/auth/SessionContext';
import NavBar from '@/components/ui/navbar';
import { Task, TaskContext } from '@/components/vault/TaskContext';
import { NAV_THEME } from '@/lib/theme';
import { PortalHost } from '@rn-primitives/portal';
import { Stack, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import '../components/i18n/i18n';
import '../global.css';
export default function RootLayout() {
  const [session, setSession] = useState<Session>({ signed_in: false });
  const [task, setTask] = useState<Task>({ task_active: false });
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    (async () => {
      await loadSession({ session, setSession });
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <TaskContext value={{ task, setTask }}>
        <SessionContext value={{ session, setSession }}>
          <StatusBar />
          <Stack screenOptions={{ headerShown: false }} />
          <NavBar />
          <PortalHost />
          <Toast />
        </SessionContext>
      </TaskContext>
    </ThemeProvider>
  );
}
