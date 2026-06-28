import { SignInForm } from '@/components/forms/sign-in-form';
import { View } from 'react-native';

export default function Login() {
  return (
    <View className="flex h-full w-full items-center justify-center p-5">
      <SignInForm />
    </View>
  );
}
