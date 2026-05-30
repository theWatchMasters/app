import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222 47% 11%)',

    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(222 47% 11%)',

    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(222 47% 11%)',

    primary: 'hsl(222 84% 55%)',
    primaryForeground: 'hsl(210 40% 98%)',

    secondary: 'hsl(240 5% 96%)',
    secondaryForeground: 'hsl(222 47% 11%)',

    muted: 'hsl(240 5% 96%)',
    mutedForeground: 'hsl(240 5% 45%)',

    accent: 'hsl(240 5% 96%)',
    accentForeground: 'hsl(222 47% 11%)',

    destructive: 'hsl(0 72% 55%)',

    border: 'hsl(240 6% 90%)',
    input: 'hsl(240 6% 90%)',
    ring: 'hsl(240 5% 65%)',

    radius: '0.625rem',

    chart1: 'hsl(210 80% 60%)',
    chart2: 'hsl(200 70% 45%)',
    chart3: 'hsl(220 60% 40%)',
    chart4: 'hsl(222 80% 55%)',
    chart5: 'hsl(240 60% 45%)',

    sidebar: 'hsl(0 0% 98%)',
    sidebarForeground: 'hsl(222 47% 11%)',
    sidebarPrimary: 'hsl(222 80% 55%)',
    sidebarPrimaryForeground: 'hsl(210 40% 98%)',
    sidebarAccent: 'hsl(240 5% 96%)',
    sidebarAccentForeground: 'hsl(222 47% 11%)',
    sidebarBorder: 'hsl(240 6% 90%)',
    sidebarRing: 'hsl(240 5% 65%)',
  },

  dark: {
    background: 'hsl(222 47% 11%)',
    foreground: 'hsl(210 40% 98%)',

    card: 'hsl(224 28% 16%)',
    cardForeground: 'hsl(210 40% 98%)',

    popover: 'hsl(224 28% 16%)',
    popoverForeground: 'hsl(210 40% 98%)',

    primary: 'hsl(240 60% 55%)',
    primaryForeground: 'hsl(210 40% 98%)',

    secondary: 'hsl(222 15% 18%)',
    secondaryForeground: 'hsl(210 40% 98%)',

    muted: 'hsl(222 15% 18%)',
    mutedForeground: 'hsl(240 5% 65%)',

    accent: 'hsl(222 15% 18%)',
    accentForeground: 'hsl(210 40% 98%)',

    destructive: 'hsl(0 70% 55%)',

    border: 'hsl(222 15% 18%)',
    input: 'hsl(222 15% 18%)',
    ring: 'hsl(240 5% 55%)',

    radius: '0.625rem',

    chart1: 'hsl(210 80% 60%)',
    chart2: 'hsl(160 60% 45%)',
    chart3: 'hsl(30 80% 55%)',
    chart4: 'hsl(280 65% 60%)',
    chart5: 'hsl(340 75% 55%)',

    sidebar: 'hsl(224 28% 16%)',
    sidebarForeground: 'hsl(210 40% 98%)',
    sidebarPrimary: 'hsl(220 70% 50%)',
    sidebarPrimaryForeground: 'hsl(210 40% 98%)',
    sidebarAccent: 'hsl(222 15% 18%)',
    sidebarAccentForeground: 'hsl(210 40% 98%)',
    sidebarBorder: 'hsl(222 15% 18%)',
    sidebarRing: 'hsl(240 5% 55%)',
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};