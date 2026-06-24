import { useSession } from '@/components/auth/SessionContext';
import VaultHistory from '@/components/vault/history';
import { Redirect } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function VaultHistoryPage() {
  const session = useSession();
  if (!session.session.signed_in) {
    return <Redirect href="/login" />;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex justify-center items-center h-[100vh] w-full p-5">
        <VaultHistory />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
