import { useSession } from '@/components/auth/SessionContext';
import { Separator } from '@/components/ui/separator';
import VaultHistory from '@/components/vault/history';
import Vault from '@/components/vault/vault';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const session = useSession();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="items-center justify-center">
        <Vault />
        <Separator className='w-[80%] m-4'/>
        <VaultHistory />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
