import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FieldValues, Form } from 'react-hook-form';
import { useSession } from './SessionContext';
import { getAccessToken } from './utils';
export function AuthForm<
  TFieldValues extends FieldValues,
  TTransformedValues = TFieldValues,
>(...props: Parameters<typeof Form<TFieldValues, TTransformedValues>>) {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const credentials = await getAccessToken();
      if (!credentials) {
        session.setSession({ signed_in: false });
        router.navigate('/login');
        return null;
      }
      setSessionToken(credentials);
    })();
  }, []);
  const session = useSession();
  const router = useRouter();

  const prop = {
    ...props[0],
    headers: {
      Authorization: `Bearer ${sessionToken}`,
      ...props[0].headers,
    },
  };

  return sessionToken && <Form {...prop} />;
}
