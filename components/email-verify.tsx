import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { View } from 'react-native';
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

export function EmailVerify() {
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    const handler = setInterval(() => {
      setSeconds(seconds - 1);
      if (seconds <= 0) {
        setSeconds(0);
        clearInterval(handler);
      }
    }, 1000);
    return () => clearInterval(handler);
  });
  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle variant={'h2'}>{t('email_verify.headings.text1')}</CardTitle>
        <CardDescription>{t('email_verify.headings.text2')}</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className="flex items-center">
        <View className="flex flex-row items-center gap-5">
          <Button disabled={seconds !== 0}>
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
