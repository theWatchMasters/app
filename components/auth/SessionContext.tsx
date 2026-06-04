import { API_BASE_URL } from '@/constants';
import { createContext, useContext } from 'react';

export type Session =
  | {
      signed_in: false;
    }
  | {
      signed_in: true;
      id: string;
      email: string;
      avatar_id: string;
    };

export type SessionContextType = {
  session: Session;
  setSession: (arg0: Session) => void;
};

export const SessionContext = createContext<SessionContextType>({
  session: { signed_in: false },
  setSession: () => {},
});

export const useSession = () => useContext(SessionContext);

export const loadSession = async (session: SessionContextType) => {
  const value = await fetch(API_BASE_URL + '/me');
  if (value.status === 401) {
    return session.setSession({ signed_in: false });
  }
  const data = await value.json();
  session.setSession({
    signed_in: true,
    ...data,
  });
};

/**
 * Acts as a normal fetch, but signs the user out if the session is invalid
 * @param session The session context (session + setSession)
 * @returns The usual fetch response
 */
export const authFetch = async (
  session: SessionContextType,
  ...args: Parameters<typeof fetch>
): ReturnType<typeof fetch> => {
  const value = await fetch(...args);
  if (value.status === 401) {
    session.setSession({ signed_in: false });
  }
  return value;
};
