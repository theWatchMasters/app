import { useSession } from '@/components/auth/SessionContext';
import Settings from '@/components/settings/settings';
import { Redirect } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsPage() {
  const session = useSession();
  if (!session.session.signed_in) {
    return <Redirect href="/login" />;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className="items-center justify-center">
        <Settings />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
