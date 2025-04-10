import { enTranslations } from './en';
import { heTranslations } from './he';
import { Language } from './types';

// Combined translations object
export const translations = {
  en: enTranslations,
  he: heTranslations,
};

// Export individual language translations
export { enTranslations, heTranslations };

// Export the Language type
export type { Language };
