import { usePathname, useRouter } from 'expo-router';
import { Home } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { useSession } from '../auth/SessionContext';
import { UserMenu } from '../user-menu';
import { Button } from './button';
import { Icon } from './icon';

export default function NavBar() {
  const session = useSession();
  const pathname = usePathname();
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  if (!session.session.signed_in) {
    return null;
  }
  return (
    <View className="h-16 w-full bg-gray-200 dark:bg-gray-800 flex-row items-center justify-evenly px-4">
      <Button onPress={() => router.push('/')} variant="ghost" size="icon">
        <Icon as={Home} className="text-muted-foreground p-4" />
      </Button>
      <UserMenu />
    </View>
  );
}
