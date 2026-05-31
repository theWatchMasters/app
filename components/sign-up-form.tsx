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
import { router } from 'expo-router';
import * as React from 'react';
import { Controller, FieldErrors, Form, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, type TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSession } from './auth/SessionContext';

interface IRegisterType {
  email: string;
  password: string;
}

interface User {
  id: string;
  avatar_id: string;
  email: string;
}

interface IRegisterResponse {
  success: true;
  user: User;
}
interface IErrorResponse {
    success: false;
    error: string;
};

export function SignUpForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const { t } = useTranslation();
  const session = useSession();

  const { control, handleSubmit } = useForm<IRegisterType>({
    defaultValues: {
      email: '',
      password: '',
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
    if (error instanceof TypeError)
      errorText = t('register.errors.network_failure');
    else if (response instanceof Response && response !== null)
      errorText = t(((await response.json()) as IErrorResponse).error);
    else errorText = t('error.generic_error');
    Toast.show({
      type: 'error',
      swipeable: true,
      autoHide: true,
      text1: t('register.errors.heading'),
      text2: errorText,
    });
  };

  const onValidationError = (errors: FieldErrors<IRegisterType>) => {
    for (let i of Object.keys(errors) as (keyof typeof errors)[]) {
      Toast.show({
        type: 'error',
        swipeable: true,
        autoHide: true,
        text1: t('register.errors.heading'),
        text2: t('register.errors.' + i + '-' + errors[i]?.type),
      });
    }
  };

  React.useEffect(() => {
    if (session.session.signed_in) {
      router.navigate('/');
    }
  }, [session]);

  const onSuccess = async ({ response }: { response: Response }) => {
    const data = (await response.json()) as IRegisterResponse;
    session.setSession({ signed_in: true, ...data.user });
    router.navigate('/');
  };

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  return (
    <Form
      className="gap-6"
      control={control}
      action={API_BASE_URL + '/register'}
      method="post"
      encType="application/json"
      onSuccess={onSuccess}
      onError={onError}
      render={({ submit }) => (
        <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5 w-full">
          <CardHeader>
            <CardTitle className="text-center text-xl sm:text-left">
              {t('register.headings.text1')}
            </CardTitle>
            <CardDescription className="text-center sm:text-left">
              {t('register.headings.text2')}
              {}
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
                    <Label htmlFor="email">
                      {t('register.headings.email')}
                    </Label>
                    <Input
                      id="email"
                      keyboardType="email-address"
                      autoComplete="email"
                      autoCapitalize="none"
                      onSubmitEditing={onEmailSubmitEditing}
                      returnKeyType="next"
                      submitBehavior="submit"
                      placeholder={t('register.placeholders.email')}
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
                        {t('register.headings.password')}
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
                          {t('register.forgot_password')}
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
                        onValidationError,
                      )}
                      placeholder={t('register.placeholders.password')}
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
                onPress={handleSubmit(() => submit(), onValidationError)}
              >
                <Text>{t('register.continue')}</Text>
              </Button>
            </View>
            <Text className="text-center text-sm flex items-center">
              {t('register.sign_in.1')}{' '}
              <Pressable
                onPress={() => {
                  router.navigate('/login');
                }}
              >
                <Text className="text-sm underline underline-offset-4">
                  {t('register.sign_in.2')}
                </Text>
              </Pressable>
            </Text>
            <View className="flex-row items-center">
              <Separator className="flex-1" />
              <Text className="text-muted-foreground px-4 text-sm">or</Text>
              <Separator className="flex-1" />
            </View>
            <SocialConnections />
          </CardContent>
        </Card>
      )}
    />
  );
}
