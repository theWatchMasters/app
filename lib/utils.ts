import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600 / 1000)
  const minutes = Math.floor((seconds % 3600000) / 60)
  const secs = Math.floor(seconds % 60000)
  return ((hours ? `${hours}h ` : '') + (minutes ? `${minutes}m ` : '') + (secs ? `${secs}s` : '')).trim();
}