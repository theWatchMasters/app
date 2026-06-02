import { API_BASE_URL } from '@/constants';
import { createContext, useContext } from 'react';
import * as Keychain from 'react-native-keychain';
import { IUser } from '../types/responses';

export type Session =
  | {
      signed_in: false;
    }
  | {
      signed_in: true;
    } & IUser;

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
  const value = await authFetch(session, API_BASE_URL + '/me');
  
  if (value.status === 401) {
    return;
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
  const token = await Keychain.getGenericPassword();
  if (!token) {
    session.setSession({ signed_in: false });
    return Promise.reject(new Error('No valid session found'));
  }
  
  args[1] = args[1] || {};
  args[1].headers = new Headers(args[1].headers || {});
  args[1].headers.set('Authorization', `Bearer ${token}`);
  
  const value = await fetch(...args);
  if (value.status === 401) {
    session.setSession({ signed_in: false });
  }

  return value;
};
