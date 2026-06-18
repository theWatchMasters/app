import { EmailVerify } from '@/components/email-verify';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function EmailVerifyPage() {
  const token = useLocalSearchParams().token;
  return (
    <SafeAreaProvider>
      <View className="flex h-full w-full items-center justify-center p-5">
        <EmailVerify token={token as string} />
      </View>
    </SafeAreaProvider>
  );
}
