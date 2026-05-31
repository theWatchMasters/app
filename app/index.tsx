import { useSession } from '@/components/auth/SessionContext';
import { Link } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const session = useSession();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="items-center justify-center">
        <Link href={'/login'} className='text-foreground'>Login</Link>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
