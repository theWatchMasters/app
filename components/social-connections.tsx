import { Button } from '@/components/ui/button';
import {
  API_BASE_URL,
  DISCORD_OAUTH2_CLIENT_ID,
  GOOGLE_OAUTH2_ANDROID_CLIENT_ID,
  GOOGLE_OAUTH2_IOS_CLIENT_ID,
} from '@/constants';
import { cn } from '@/lib/utils';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useColorScheme } from 'nativewind';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Platform, View } from 'react-native';
import { SessionContextType, useSession } from './auth/SessionContext';
import { setAccessToken } from './auth/utils';
import { handleError } from './forms/utils';
WebBrowser.maybeCompleteAuthSession();
const SOCIAL_CONNECTION_STRATEGIES = [
  {
    type: 'oauth_google',
    source: { uri: 'https://img.clerk.com/static/google.png?width=160' },
    useTint: false,
  },
  {
    type: 'oauth_discord',
    source: { uri: 'https://img.clerk.com/static/discord.png?width=160' },
    useTint: true,
  },
] as const;

export function SocialConnections({
  setMFAFormOpen,
  setUser,
}: {
  setMFAFormOpen: (arg0: boolean) => void;
  setUser: (arg0: SessionContextType['session']) => void;
}) {
  const { colorScheme } = useColorScheme();
  const [ggRequest, ggResponse, ggPromptAsync] = Google.useAuthRequest({
    androidClientId: GOOGLE_OAUTH2_ANDROID_CLIENT_ID,
    iosClientId: GOOGLE_OAUTH2_IOS_CLIENT_ID,
    redirectUri: makeRedirectUri({ isTripleSlashed: true }),
  });
  const [dcRequest, dcResponse, dcPromptAsync] = useAuthRequest(
    {
      clientId: DISCORD_OAUTH2_CLIENT_ID,
      scopes: ['identify', 'email'],
      redirectUri:
        makeRedirectUri({
          isTripleSlashed: true,
        }) + '//',
    },
    {
      authorizationEndpoint: 'https://discord.com/api/oauth2/authorize',
      tokenEndpoint: 'https://discord.com/api/oauth2/token',
    },
  );
  const prompts = useMemo(() => {
    return {
      oauth_google: ggPromptAsync,
      oauth_discord: dcPromptAsync,
    };
  }, [ggPromptAsync, dcPromptAsync]);
  const requests = useMemo(() => {
    return {
      google: ggRequest,
      discord: dcRequest,
    };
  }, [ggRequest, dcRequest]);
  const responses = useMemo(() => {
    return {
      google: ggResponse,
      discord: dcResponse,
    };
  }, [ggResponse, dcResponse]);

  const { t } = useTranslation();
  const session = useSession();
  const submitSSO = async (
    type: string,
    accessToken: string,
    codeVerifier: string | undefined,
  ) => {
    try {
      const response = await fetch(API_BASE_URL + `sso`, {
        method: 'POST',
        body: JSON.stringify({
          jwt: accessToken,
          type,
          code_verifier: codeVerifier,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        return handleError('sso', t)({ response });
      }
      const data = await response.json();
      switch (data.status) {
        case 'new':
          setMFAFormOpen(true);
        case 'current':
          setUser({ signed_in: true, ...data.user });
          await setAccessToken(data.access_token);
          session.setSession({ signed_in: true, ...data.user });
          break;
        case '2fa':
          router.navigate({
            pathname: '/2fa/[token]',
            params: {
              token: data.access_token,
            },
          });
      }
    } catch (error) {
      return handleError('sso', t)({ error });
    }
  };
  useEffect(() => {
    for (const [type, response] of Object.entries(responses)) {
      if (response?.type === 'success') {
        const { authentication } = response;
        if (authentication?.accessToken || response.params?.code) {
          submitSSO(
            type,
            authentication?.accessToken || response.params?.code,
            requests[type as keyof typeof requests]?.codeVerifier,
          );
        }
      }
    }
  }, [responses]);
  return (
    <View className="gap-2 sm:flex-row sm:gap-3">
      {SOCIAL_CONNECTION_STRATEGIES.map((strategy) => {
        return (
          <Button
            key={strategy.type}
            variant="outline"
            size="sm"
            className="sm:flex-1"
            onPress={() =>
              (prompts[strategy.type] || (() => {}))({ showInRecents: true })
            }
          >
            <Image
              className={cn(
                'size-4',
                strategy.useTint && Platform.select({ web: 'dark:invert' }),
              )}
              tintColor={Platform.select({
                native: strategy.useTint
                  ? colorScheme === 'dark'
                    ? 'white'
                    : 'black'
                  : undefined,
              })}
              source={strategy.source}
            />
          </Button>
        );
      })}
    </View>
  );
}
