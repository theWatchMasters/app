import MFARequest from '@/components/auth/2fa-request';
import {
  SessionContextType,
  useSession,
} from '@/components/auth/SessionContext';
import { API_BASE_URL } from '@/constants';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';

import { setAccessToken } from '@/components/auth/utils';
import { IUser } from '@/components/types/responses';
interface IEmailVerifyResponse {
  success: true;
  user: IUser;
  access_token: string;
}
// Email handler for registration magic link
export default function RegisterEmailPage() {
  const { id } = useLocalSearchParams();
  const session = useSession();

  const [mfaFormOpen, setMFAFormOpen] = React.useState(false);
  const [user, setUser] = React.useState<SessionContextType['session']>({
    signed_in: false,
  });
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
          setUser({ signed_in: true, ...data.user });
          setMFAFormOpen(true);
        }
      })
      .catch((err) => {
        console.error(err);
        router.navigate('/');
      });
  }, [id]);
  return <MFARequest open={mfaFormOpen} setOpen={setMFAFormOpen} user={user} />;
}
