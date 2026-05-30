import { Session, SessionContext } from "@/components/auth/SessionContext";
import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import "../components/i18n/i18n";
import "../global.css";

export default function RootLayout() {
  const [session, setSession] = useState<Session>({ signed_in: false });
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    loadSession({ session, setSession });
  }, [session]);
  return <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}><SessionContext value={{ session, setSession }}>
    <StatusBar />
    <Stack screenOptions={{ headerShown: false }} />
    <PortalHost />
    <Toast />
  </SessionContext></ThemeProvider>;
}
