import { useSession } from '@/components/auth/SessionContext';
import Vault from '@/components/vault';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const session = useSession();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="items-center justify-center">
        <Vault />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
