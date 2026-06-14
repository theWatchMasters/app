import { useSession } from '@/components/auth/SessionContext';
import { MFARegisterForm } from '@/components/forms/2fa-register-form';
import { Redirect } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function MFARegisterPage() {
  const session = useSession();
  if (!session.session.signed_in) {
    return <Redirect href="/login" />;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex justify-center items-center h-[100vh] w-full p-5">
        <MFARegisterForm />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
