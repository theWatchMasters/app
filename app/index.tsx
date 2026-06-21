import { useSession } from '@/components/auth/SessionContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { loadTask, useTask } from '@/components/vault/TaskContext';
import Vault from '@/components/vault/vault';
import { Redirect, router } from 'expo-router';
import { HistoryIcon } from 'lucide-react-native';
import { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const session = useSession();
  const task = useTask();
  useEffect(() => {
    loadTask(session, task);
  }, []);
  if (!session.session.signed_in) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="items-center justify-center">
        <Vault />
        <Separator className="my-4" />
        <Button
          onPress={() => {
            router.navigate('/vault/history');
          }}
        >
          <Text className="flex flex-col">
            <HistoryIcon className="mt-3" />
            History
          </Text>
        </Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
