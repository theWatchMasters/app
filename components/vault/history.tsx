import { View } from 'react-native';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

const FAKE_HISTORY = [
  {
    length: '15m',
    amount: '$0.50',
    ends_at: new Date(2026, 0, 1, 1, 12, 15).toISOString(),
    title: 'Study for CS2030S midterms',
    successful: true,
  },
  {
    length: '1h',
    amount: '$2.00',
    ends_at: new Date(2026, 0, 1, 1, 0, 0).toISOString(),
    title: '',
    successful: false,
  },
];
export default function VaultHistory() {
  return (
    <View className="w-[80%] flex flex-col gap-2">
      {FAKE_HISTORY.map((item, index) => (
        <Card
          key={index}
          className="border-gray w-full"
          style={
            item.successful
              ? { borderColor: 'green', borderWidth: 2 }
              : { borderColor: 'red', borderWidth: 2 }
          }
        >
          <CardHeader>
            <CardTitle>
              {item.amount} for {item.length}
            </CardTitle>
            <CardDescription>
              {item.title || 'No title'} -{' '}
              {new Date(item.ends_at).toLocaleString()}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </View>
  );
}
