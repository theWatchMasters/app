import { useSession } from '@/components/auth/SessionContext';
import { setAccessToken } from '@/components/auth/utils';
import { IUser } from '@/components/types/responses';
import { API_BASE_URL } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
interface IEmailVerifyResponse {
  success: true;
  user: IUser;
  access_token: string;
}
// Email handler for registration magic link
export default function RegisterEmailPage() {
  const { id } = useLocalSearchParams();
  const session = useSession();
  useEffect(() => {
    fetch(API_BASE_URL + 'email', {
      method: 'POST',
      body: JSON.stringify({ access_token: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        const data: IEmailVerifyResponse = await res.json();
        if (data.success) {
          session.setSession({ signed_in: true, ...data.user });
          await setAccessToken(data.access_token);
        }
        router.navigate('/');
      })
      .catch((err) => {
        console.error(err);
        router.navigate('/');
      });
  }, [id]);
}
