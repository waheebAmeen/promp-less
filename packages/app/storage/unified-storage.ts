import { Platform } from 'react-native';

export const unifiedStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(name);
  },
};
