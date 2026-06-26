import { API_BASE_URL } from '@/constants';
import { Download } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { authFetch, useSession } from '../auth/SessionContext';
import { handleError } from '../forms/utils';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Icon } from '../ui/icon';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Text } from '../ui/text';
export default function Settings() {
  const session = useSession();
  const { setColorScheme } = useColorScheme();
  const [theme, setTheme] = React.useState(
    session.session.signed_in ? session.session.theme : '',
  );
  const { t } = useTranslation();

  if (!session.session.signed_in) {
    return null;
  }

  const updateSettings = async (change: Record<any, any>) => {
    return authFetch(session, API_BASE_URL + 'modify', {
      method: 'PATCH',
      body: JSON.stringify(change),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const onThemeUpdate = (value: string) => {
    const valueLower = value.toLowerCase();
    if (!['dark', 'light', 'system'].includes(valueLower)) {
      return;
    }
    setColorScheme(valueLower as 'dark' | 'light' | 'system');
    setTheme(value);
    return updateSettings({ theme: value });
  };

  const onDownloadData = async () => {
    try {
      const response = await authFetch(session, API_BASE_URL + 'export', {
        method: 'POST',
      });
      if (!response) {
        return;
      }
      if (!response.ok) {
        return handleError('export', t)({ response });
      }
      Toast.show({
        text1: 'Export Started',
        text2:
          'Your data is being downloaded. Please check your email for the file.',
        type: 'success',
      });
    } catch (error) {
      handleError('export', t)({ error });
    }
  };
  return (
    <View className="flex flex-col items-center gap-4">
      <Text variant={'h1'} className="text-lg font-bold">
        Settings
      </Text>
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-center">Personal Information</CardTitle>
        </CardHeader>
        <View className="flex flex-col justify-center items-center">
          <View className="flex flex-row items-center">
            <Text className="font-bold">Email: </Text>
            <Input
              value={session.session.email}
              editable={false}
              className="w-[70vw]"
            />
          </View>
          <View className="flex flex-row items-center">
            <Text className="font-bold">Theme: </Text>
            <Tabs
              value={theme}
              onValueChange={onThemeUpdate}
              className="w-[70vw]"
            >
              <TabsList>
                <TabsTrigger value="DARK">
                  <Text>Dark</Text>
                </TabsTrigger>
                <TabsTrigger value="LIGHT">
                  <Text>Light</Text>
                </TabsTrigger>
                <TabsTrigger value="SYSTEM">
                  <Text>System</Text>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </View>
        </View>
      </Card>
      <Button variant="secondary" onPress={onDownloadData}>
        <Icon as={Download} />
        <Text className="text-lg font-bold">Download Data</Text>
      </Button>
    </View>
  );
}
