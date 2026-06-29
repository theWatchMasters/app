import {
  loadSession,
  Session,
  SessionContext,
} from '@/components/auth/SessionContext';
import { Task, TaskContext } from '@/components/vault/TaskContext';
import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { StripeProvider } from '@stripe/stripe-react-native';
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
  const [isLoading, setIsLoading] = useState(true);
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    (async () => {
      loadSession({ session, setSession });
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK ?? ''}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <TaskContext
          value={{
            task,
            setTask,
            reloadTask: () => loadSession({ session, setSession }),
          }}
        >
          <SessionContext value={{ session, setSession }}>
            <StatusBar />
            <Stack screenOptions={{ headerShown: false }} />
            <PortalHost />
            <Toast />
          </SessionContext>
        </TaskContext>
      </ThemeProvider>
    </StripeProvider>
  );
}
