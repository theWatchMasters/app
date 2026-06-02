import { useSession } from '@/components/auth/SessionContext';
import { MFAForm } from '@/components/forms/2fa-form';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function MFAPage() {
  const session = useSession();
  const { token } = useLocalSearchParams();
  if (!session.session.signed_in) {
    return <Redirect href="/" />;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex justify-center items-center h-[100vh] w-full p-5">
        <MFAForm access_token={token as string} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
