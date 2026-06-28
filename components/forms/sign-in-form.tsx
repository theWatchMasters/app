import { SocialConnections } from '@/components/social-connections';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { API_BASE_URL } from '@/constants';
import { Redirect, router } from 'expo-router';
import * as React from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, type TextInput, View } from 'react-native';
import { useSession } from '../auth/SessionContext';
import { setAccessToken } from '../auth/utils';
import { IUser } from '../types/responses';
import { handleError, handleValidationError } from './utils';

interface ILoginType {
  email: string;
  password: string;
}

type ILoginResponse =
  | {
      success: true;
      '2fa_enabled': false;
      user: IUser;
      access_token: string;
    }
  | {
      success: true;
      '2fa_enabled': true;
      access_token: string;
    };

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const { t } = useTranslation();
  const session = useSession();

  const { control, handleSubmit } = useForm<ILoginType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (session.session.signed_in) {
    return <Redirect href="/" />;
  }

  const onSuccess = async ({ response }: { response: Response }) => {
    const data = (await response.json()) as ILoginResponse;
    if (data['2fa_enabled']) {
      router.navigate({
        pathname: '/2fa/[token]',
        params: {
          token: data.access_token,
        },
      });
    } else {
      session.setSession({ signed_in: true, ...data.user });
      await setAccessToken(data.access_token);
      if (router.canGoBack()) {
        router.back();
      } else {
        router.navigate('/');
      }
    }
  };

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  return (
    <Form
      className="gap-6"
      control={control}
      action={API_BASE_URL + 'login'}
      method="post"
      encType="application/json"
      onSuccess={onSuccess}
      onError={handleError('login', t)}
      render={({ submit }) => (
        <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5 w-full">
          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-left">
              {t('login.headings.text1')}
            </CardTitle>
            <CardDescription className="text-center sm:text-left">
              {t('login.headings.text2')}
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-6">
            <View className="gap-6">
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 6,
                  maxLength: 320,
                  deps: 'email',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="gap-1.5">
                    <Label htmlFor="email">{t('login.headings.email')}</Label>
                    <Input
                      id="email"
                      keyboardType="email-address"
                      autoComplete="email"
                      autoCapitalize="none"
                      onSubmitEditing={onEmailSubmitEditing}
                      returnKeyType="next"
                      submitBehavior="submit"
                      placeholder={t('login.placeholders.email')}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                name="email"
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  deps: 'password',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View className="gap-1.5">
                    <View className="flex-row items-center">
                      <Label htmlFor="password">
                        {t('login.headings.password')}
                      </Label>
                      <Button
                        variant="link"
                        size="sm"
                        className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                        onPress={() => {
                          // TODO: Navigate to forgot password screen
                        }}
                      >
                        <Text className="font-normal leading-4">
                          {t('login.forgot_password')}
                        </Text>
                      </Button>
                    </View>
                    <Input
                      ref={passwordInputRef}
                      id="password"
                      secureTextEntry
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(
                        () => submit(),
                        handleValidationError('login', t),
                      )}
                      placeholder={t('login.placeholders.password')}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                name="password"
              />
              <Button
                className="w-full"
                onPress={handleSubmit(
                  () => submit(),
                  handleValidationError('login', t),
                )}
              >
                <Text>{t('login.continue')}</Text>
              </Button>
            </View>
            <Text className="text-center text-sm flex items-center">
              {t('login.sign_up.1')}{' '}
              <Pressable
                onPress={() => {
                  router.replace('/register');
                }}
              >
                <Text className="text-sm underline underline-offset-4">
                  {t('login.sign_up.2')}
                </Text>
              </Pressable>
            </Text>
            <View className="flex-row items-center">
              <Separator className="flex-1" />
              <Text className="text-muted-foreground px-4 text-sm">or</Text>
              <Separator className="flex-1" />
            </View>
            <SocialConnections setUser={() => {}} setMFAFormOpen={() => {}} />
          </CardContent>
        </Card>
      )}
    />
  );
}
