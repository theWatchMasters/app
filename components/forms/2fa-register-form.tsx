import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { API_BASE_URL } from '@/constants';
import { router } from 'expo-router';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { Image, Linking, View } from 'react-native';
import { AuthForm } from '../auth/AuthForm';
import { authFetch, useSession } from '../auth/SessionContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { Text } from '../ui/text';
import { handleError, handleValidationError } from './utils';

interface IMFARegisterResponse {
  success: true;
  secret: string;
  qrCode: string;
  url: string;
}

interface IMFARegisterVerifyType {
  code: string;
}

export function MFARegisterForm() {
  const [data, setData] = React.useState<IMFARegisterResponse | null>(null);
  const [isRequestingCode, setRequestingCode] = React.useState<boolean>(false);
  const session = useSession();
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IMFARegisterVerifyType>({
    defaultValues: {
      code: '',
    },
  });

  React.useEffect(() => {
    (async () => {
      const response = await authFetch(session, API_BASE_URL + 'mfa/register', {
        method: 'POST',
      });
      if (!response) {
        return;
      }
      const data = (await response.json()) as IMFARegisterResponse;
      // TODO: add error handling
      setData(data);
    })();
  }, []);

  const onSuccess = async () => {
    router.navigate('/');
  };

  return (
    <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5 w-full">
      <CardHeader>
        <CardTitle className="text-center text-xl sm:text-left">
          {t('mfa_register.headings.text1')}
        </CardTitle>
        <CardDescription className="text-center sm:text-left">
          {isRequestingCode ? (
            <Text>{t('mfa_register_code.headings.text2')}</Text>
          ) : (
            <Trans i18nKey="mfa_register.headings.text2">
              Click the button below to enroll in 2FA with your authenticator
              app. Alternatively, you can scan the QR code
              <Text className="font-bold text-sm">with another device</Text>
              to enroll with 2FA on that device.
            </Trans>
          )}
        </CardDescription>
      </CardHeader>

      {isRequestingCode ? (
        <AuthForm
          className="gap-6"
          control={control}
          action={API_BASE_URL + 'mfa/register/verify'}
          method="post"
          encType="application/json"
          onSuccess={onSuccess}
          onError={handleError('mfa_register', t)}
          render={({ submit }) => (
            <CardContent className="gap-6">
              <View className="gap-6">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                    pattern: /^\d+$/,
                    deps: 'code',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View className="gap-1.5">
                      <Label htmlFor="code">
                        {t('mfa_register_code.headings.code')}
                      </Label>
                      <Input
                        id="code"
                        keyboardType="numeric"
                        autoComplete="one-time-code"
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={handleSubmit(
                          () => submit(),
                          handleValidationError('mfa_register_code', t),
                        )}
                        placeholder={t('mfa_register_code.placeholders.code')}
                        onBlur={onBlur}
                        onChangeText={(value) => {
                          onChange(value);
                          if (value.length === 6) {
                            handleSubmit(
                              () => submit(),
                              handleValidationError('mfa_register_code', t),
                            )();
                          }
                        }}
                        value={value}
                      />
                    </View>
                  )}
                  name="code"
                />
                <Button
                  onPress={() => setRequestingCode(false)}
                  variant={'outline'}
                >
                  <Text>Back</Text>
                </Button>
              </View>
            </CardContent>
          )}
        />
      ) : (
        <CardContent className="gap-6 items-center">
          <Button
            disabled={data === null}
            onPress={async () => await Linking.openURL(data?.url || '')}
          >
            <Text>{t('mfa_register.headings.authenticator')}</Text>
          </Button>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>
          <Text className="font-bold text-xl">
            {t('mfa_register.headings.other_device')}
          </Text>
          <View className="gap-6">
            {data ? (
              <Image src={data.qrCode} className="w-[50%] aspect-square" />
            ) : (
              <Skeleton className="w-[50%] aspect-square" />
            )}
          </View>
          <Button onPress={() => setRequestingCode(true)}>
            <Text>{t('mfa_register.headings.continue')}</Text>
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
