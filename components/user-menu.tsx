import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { TriggerRef } from '@rn-primitives/popover';
import { LogOutIcon, SettingsIcon } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';
import { useSession } from './auth/SessionContext';
import { clearAccessToken } from './auth/utils';

export function UserMenu() {
  const popoverTriggerRef = React.useRef<TriggerRef>(null);
  const { session, setSession } = useSession();
  async function onSignOut() {
    popoverTriggerRef.current?.close();
    await clearAccessToken();
    setSession({ signed_in: false });
  }

  if (!session.signed_in) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild ref={popoverTriggerRef}>
        <Button variant="ghost" size="icon" className="size-8 rounded-full">
          <UserAvatar />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" side="bottom" className="w-80 p-0">
        <View className="border-border gap-3 border-b p-3">
          <View className="flex-row items-center gap-3">
            <UserAvatar className="size-10" />
            <View className="flex-1">
              <Text className="font-medium leading-5">{session.email}</Text>
            </View>
          </View>
          <View className="flex-row flex-wrap gap-3 py-0.5">
            <Button
              variant="outline"
              size="sm"
              onPress={() => {
                // TODO: Navigate to account settings screen
              }}
            >
              <Icon as={SettingsIcon} className="size-4" />
              <Text>Manage Account</Text>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onPress={onSignOut}
            >
              <Icon as={LogOutIcon} className="size-4" />
              <Text>Sign Out</Text>
            </Button>
          </View>
        </View>
        {/* <Button
          variant="ghost"
          size="lg"
          className="h-16 justify-start gap-3 rounded-none rounded-b-md px-3 sm:h-14"
          onPress={() => {
            // TODO: Navigate to add account screen
          }}
        >
          <View className="size-10 items-center justify-center">
            <View className="border-border bg-muted/50 size-7 items-center justify-center rounded-full border border-dashed">
              <Icon as={PlusIcon} className="size-5" />
            </View>
          </View>
          <Text>Add account</Text>
        </Button> */}
      </PopoverContent>
    </Popover>
  );
}
function generateInitials(email: string) {
  const nameParts = email.split('@')[0].split('.');
  return nameParts.map((part) => part[0].toUpperCase()).join('');
}
function UserAvatar({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Avatar>, 'alt'>) {
  const { session } = useSession();
  if (!session.signed_in) {
    return null;
  }
  return (
    <Avatar
      alt={`${session.email}'s avatar`}
      className={cn('size-8', className)}
      {...props}
    >
      <AvatarImage
        source={{ uri: 'https://gravatar.com/avatar/' + session.avatar_id }}
      />
      <AvatarFallback>
        <Text>{generateInitials(session.email)}</Text>
      </AvatarFallback>
    </Avatar>
  );
}
