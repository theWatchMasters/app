import { API_BASE_URL } from '@/constants';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { handleError } from './forms/utils';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Separator } from './ui/separator';
import { Text } from './ui/text';

export function EmailVerify({ token }: { token: string }) {
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(60);
  const [restartKey, setRestartKey] = useState<number>(0);
  useEffect(() => {
    const handler = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds <= 1) {
          clearInterval(handler);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
    return () => clearInterval(handler);
  }, [restartKey]);
  const errorHandler = handleError('email_verify', t);
  const onPress = async () => {
    let response: Response | null;
    try {
      response = await fetch(API_BASE_URL + 'email/resend', {
        method: 'POST',
        body: JSON.stringify({ access_token: token }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return errorHandler({ error });
    }
    if (!response.ok) {
      return errorHandler({ response });
    }
    setSeconds(60);
    setRestartKey((prev) => prev + 1);
    Toast.show({
      type: 'success',
      text1: t('email_verify.headings.success'),
      text2: t('email_verify.headings.success-desc'),
    });
  };

  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle variant={'h2'}>{t('email_verify.headings.text1')}</CardTitle>
        <CardDescription>{t('email_verify.headings.text2')}</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="flex items-center">
        <View className="flex flex-row items-center gap-5">
          <Button disabled={seconds !== 0} onPress={onPress}>
            <Text>
              {seconds !== 0 ? (
                <Trans i18nKey="email_verify.headings.resend">
                  Re-send Email in {{ seconds }}s
                </Trans>
              ) : (
                <Trans i18nKey="email_verify.headings.resend-enabled">
                  Re-send Email
                </Trans>
              )}
            </Text>
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}
