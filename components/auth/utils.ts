import Keychain, { STORAGE_TYPE } from 'react-native-keychain';

export async function setAccessToken(token: string) {
  await Keychain.setGenericPassword('token', token, {
    service: 'access_token',
    storage: STORAGE_TYPE.AES_GCM_NO_AUTH,
  });
}

export async function getAccessToken() {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'access_token',
    });
    return (credentials || null)?.password;
  } catch (error) {
    return null;
  }
}

export async function clearAccessToken() {
  await Keychain.resetGenericPassword({ service: 'access_token' });
}
