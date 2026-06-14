import { router } from 'expo-router';
import { Trans, useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Text } from '../ui/text';
import { SessionContextType, useSession } from './SessionContext';

export default function MFARequest({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: SessionContextType['session'];
}) {
  const { setSession } = useSession();
  const onEnroll = () => {
    setSession(user);
    router.navigate('/2fa-register');
    setOpen(false);
  };
  const onContinue = () => {
    setSession(user);
    router.navigate('/');
    setOpen(false);
  };
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onContinue}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('mfa_request.headings.text1')}</DialogTitle>
          <DialogDescription>
            <Trans i18nKey={'mfa_request.headings.text2'}>
              2FA helps improve the security of your account by requiring a
              separate authentication code.{'\n'}
              <Text className="font-bold">
                It is required for payment-related features
              </Text>
            </Trans>
          </DialogDescription>
        </DialogHeader>
        <View className="flex flex-row w-full gap-2">
          <Button onPress={onEnroll}>
            <Text>{t('mfa_request.options.enroll')}</Text>
          </Button>
          <Button onPress={onContinue} variant={'secondary'}>
            <Text>{t('mfa_request.options.continue')}</Text>
          </Button>
        </View>
      </DialogContent>
    </Dialog>
  );
}
