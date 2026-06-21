import { API_BASE_URL } from '@/constants';
import { formatTime } from '@/lib/utils';
import { Link } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { authFetch, useSession } from '../auth/SessionContext';
import { handleError } from '../forms/utils';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import PageBar from '../ui/pagebar';
import { Skeleton } from '../ui/skeleton';
import { Text } from '../ui/text';

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

export default function VaultHistory() {
  const [page, setPage] = React.useState(0);
  const [numPages, setNumPages] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const [pageData, setPageData] = React.useState<HistoryItem[]>([]);
  const session = useSession();
  const { t } = useTranslation();
  useEffect(() => {
    (async () => {
      try {
        const response = await authFetch(
          session,
          API_BASE_URL + `vault/list?page=${page}`,
        );
        if (!response) {
          return;
        }
        if (!response.ok) {
          return handleError('history', t)({ response });
        }
        const data = await response.json();
        setPageData(data.tasks);
        setNumPages(data.pages);
      } catch (error) {
        return handleError('history', t)({ error });
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  return (
    <ScrollView
      className="w-[80%] flex flex-col gap-2 h-full"
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Link href="/" className="text-muted-foreground">
        &larr;Back
      </Link>
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
      {!loading && numPages === 0 && (
        <Card className="border-gray w-full">
          <CardHeader>
            <CardTitle>{t('history.no_history')}</CardTitle>
          </CardHeader>
        </Card>
      )}
      {!loading && numPages && (
        <>
          <PageBar value={page} onChange={setPage} maxValue={numPages} />
          {pageData.map((item, index) => (
            <Card
              key={index}
              className="border-gray w-full my-2"
              style={
                !item.completed
                  ? { borderColor: 'blue', borderWidth: 3 }
                  : item.finished
                    ? { borderColor: 'green', borderWidth: 2 }
                    : { borderColor: 'red', borderWidth: 2 }
              }
            >
              <CardHeader>
                <CardTitle>
                  {item.amount === item.deductible_amount || item.finished ? (
                    (+item.amount).toFixed(2)
                  ) : (
                    <>
                      <Text className="text-muted-foreground line-through">
                        {(+item.amount).toFixed(2)}
                      </Text>{' '}
                      {(+item.deductible_amount).toFixed(2)}
                    </>
                  )}{' '}
                  for {formatTime(item.length)}
                </CardTitle>
                <CardDescription>
                  {item.title || 'No title'} -{' '}
                  {new Date(item.ends_at).toLocaleString()}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </>
      )}
    </ScrollView>
  );
}
