import { EmailVerify } from '@/components/email-verify';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function EmailVerifyPage() {
  return (
    <SafeAreaProvider>
      <View className="flex h-full w-full items-center justify-center p-5">
        <EmailVerify />
      </View>
    </SafeAreaProvider>
  );
}
