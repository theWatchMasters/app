import { MFAForm } from '@/components/2fa-form';
import { useSession } from '@/components/auth/SessionContext';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function MFAPage() {
  const session = useSession();
  const { token } = useLocalSearchParams();
  if (session.session.signed_in) {
    router.navigate('/');
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <MFAForm access_token={token as string} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
