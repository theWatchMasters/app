import { API_BASE_URL } from '@/constants';
import { formatRelativeTime } from '@/lib/utils';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { authFetch, useSession } from '../auth/SessionContext';
import { handleError } from '../forms/utils';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { Text } from '../ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type HistoryItem = {
  length: number;
  amount: string;
  ends_at: string;
  id: string;
  title: string;
  finished: boolean;
  completed: boolean;
  deductible_amount: string;
};

export default function VaultExpiry() {
  const [loading, setLoading] = React.useState(true);

  const [pageData, setPageData] = React.useState<HistoryItem[]>([]);
  const session = useSession();
  const { t } = useTranslation();
  useEffect(() => {
    (async () => {
      try {
        const response = await authFetch(
          session,
          API_BASE_URL + `vault/list?unfinished=true`,
        );
        if (!response) {
          return;
        }
        if (!response.ok) {
          return handleError('expiry', t)({ response });
        }
        const data = await response.json();
        setPageData(data.tasks);
      } catch (error) {
        return handleError('expiry', t)({ error });
      } finally {
        setLoading(false);
      }
    })();
  }, [session.session]);

  return (
    <ScrollView
      className="w-[80%] flex flex-col gap-2 h-full"
      contentContainerStyle={{ alignItems: 'center' }}
    >
      {loading && <Separator className="my-4" />}
      {loading &&
        new Array(10).fill(0).map((_, index) => (
          <Card key={index} className="border-gray w-full my-2">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-4 w-[100px]" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-[200px]" />
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      {!loading &&
        pageData.map((item, index) => {
          const date = new Date(item.ends_at);
          date.setDate(date.getDate() + 7);
          return (
            <Card key={index} className="border-gray w-full my-2">
              <CardHeader className="flex-row justify-between">
                <CardTitle>
                  <Text>${(+item.deductible_amount).toFixed(2)}</Text>
                </CardTitle>
                <View className="flex-row items-center">
                  <Text>Expires </Text>
                  <Tooltip>
                    <TooltipTrigger>
                      <Text className="border-b border-muted-foreground border-dotted">
                        {formatRelativeTime(date.toUTCString())}
                      </Text>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Text>{date.toLocaleString()}</Text>
                    </TooltipContent>
                  </Tooltip>
                </View>
              </CardHeader>
            </Card>
          );
        })}
    </ScrollView>
  );
}
