import { API_BASE_URL } from '@/constants';
import { useStripe } from '@stripe/stripe-react-native';
import { router } from 'expo-router';
import { View } from 'lucide-react-native';
import { useEffect } from 'react';
import { authFetch, useSession } from '../auth/SessionContext';

export type CheckoutScreenProps = {
  client_secret: string;
  id: string;
};
export default function CheckoutScreen({
  client_secret,
  id,
}: CheckoutScreenProps) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'theWatchMasters',
      paymentIntentClientSecret: client_secret,
    });
    if (error) {
      // handle error
    }
  };
  const session = useSession();

  useEffect(() => {
    (async () => {
      await initializePaymentSheet();
      const { error } = await presentPaymentSheet();
      if (error) {
        return;
      }
      await authFetch(session, API_BASE_URL + 'vault/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intent: id,
        }),
      });
      router.navigate('/');
    })();
  }, []);

  return <View></View>;
}
