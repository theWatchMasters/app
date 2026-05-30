import { SignUpForm } from '@/components/sign-up-form';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Login() {
  return (
    <SafeAreaProvider>
      <View className="flex h-full w-full items-center justify-center p-5">
        <SignUpForm />
      </View>
    </SafeAreaProvider>
  );
}
