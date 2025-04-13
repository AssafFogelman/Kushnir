import { en } from './en';
import { he } from './he';
import { Language } from './types';

// Combined translations object
export const translations = {
  en: en,
  he: he,
};

// Export individual language translations
export { en as enTranslations, he as heTranslations };

// Export the Language type
export type { Language };
