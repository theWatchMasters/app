import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { API_BASE_URL } from '@/constants';
import { router } from 'expo-router';
import * as jose from 'jose';
import * as React from 'react';
import { Controller, FieldErrors, Form, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSession } from './auth/SessionContext';
import { Text } from './ui/text';

interface IMFAType {
  token: string;
  code: string;
}

interface User {
  id: string;
  avatar_id: string;
  email: string;
}

interface IMFAResponse {
  success: true;
  user: User;
}

interface IErrorResponse {
  success: false;
  error: string;
}

export function MFAForm({ access_token }: { access_token: string }) {
  const { t } = useTranslation();
  const session = useSession();
  const { control, handleSubmit } = useForm<IMFAType>({
    defaultValues: {
      token: '',
      code: '',
    },
  });

  const onError = async ({
    response,
    error,
  }:
    | {
        response: Response;
        error?: undefined;
      }
    | {
        response?: undefined;
        error: unknown;
      }) => {
    let errorText: string;
    if (error instanceof TypeError) errorText = t('mfa.errors.network_failure');
    else if (response instanceof Response && response !== null)
      errorText = t(((await response.json()) as IErrorResponse).error);
    else errorText = t('mfa.generic_error');
    Toast.show({
      type: 'error',
      swipeable: true,
      autoHide: true,
      text1: t('mfa.errors.heading'),
      text2: errorText,
    });
  };

  const onValidationError = (errors: FieldErrors<IMFAType>) => {
    for (let i of Object.keys(errors) as (keyof typeof errors)[]) {
      Toast.show({
        type: 'error',
        swipeable: true,
        autoHide: true,
        text1: t('mfa.errors.heading'),
        text2: t('mfa.errors.' + i + '-' + errors[i]?.type),
      });
    }
  };

  const onSuccess = async ({ response }: { response: Response }) => {
    const data = (await response.json()) as IMFAResponse;
    session.setSession({ signed_in: true, ...data.user });
    router.navigate('/');
  };
  console.log(access_token)

  return (
    <Form
      className="gap-6"
      control={control}
      action={API_BASE_URL + '/mfa'}
      method="post"
      encType="application/json"
      onSuccess={onSuccess}
      onError={onError}
      render={({ submit }) => (
        <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5 w-full">
          <View className="absolute -top-3 left-[30%] bg-secondary w-full h-6 text-center w-[40%] rounded-full"> 
            <Text className='text-center w-min-content'>{jose.decodeJwt(access_token).email as string || ""}</Text>
          </View>

          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-left">
              {t('mfa.headings.text1')}
            </CardTitle>
            <CardDescription className="text-center sm:text-left">
              {t('mfa.headings.text2')}
            </CardDescription>
          </CardHeader>
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
                    <Label htmlFor="code">{t('mfa.headings.code')}</Label>
                    <Input
                      id="code"
                      keyboardType="numeric"
                      autoComplete="one-time-code"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onSubmitEditing={handleSubmit(
                        () => submit(),
                        onValidationError,
                      )}
                      placeholder={t('mfa.placeholders.code')}
                      onBlur={onBlur}
                      onChangeText={(value) => {
                        onChange(value);
                        if (value.length === 6)
                          handleSubmit(() => submit(), onValidationError)();
                      }}
                      value={value}
                    />
                  </View>
                )}
                name="code"
              />
              <Controller
                control={control}
                defaultValue={access_token}
                name="token"
                render={() => <></>}
              ></Controller>
            </View>
          </CardContent>
        </Card>
      )}
    />
  );
}
