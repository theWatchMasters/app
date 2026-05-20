import { loadSession, Session, SessionContext } from "@/components/auth/SessionContext";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import "../global.css";

export default function RootLayout() {
  const [session, setSession] = useState<Session>({ signed_in: false });
  useEffect(() => {
    loadSession({ session, setSession });
  })
  return <SessionContext value={{ session, setSession }}><Stack /></SessionContext>;
}
