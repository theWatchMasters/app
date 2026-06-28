// Note: this is injected at build time
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3001/';

export const GOOGLE_OAUTH2_ANDROID_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_OAUTH2_ANDROID_CLIENT_ID || '';
export const GOOGLE_OAUTH2_IOS_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_OAUTH2_IOS_CLIENT_ID || '';

export const DISCORD_OAUTH2_CLIENT_ID =
  process.env.EXPO_PUBLIC_DISCORD_OAUTH2_CLIENT_ID || '';
