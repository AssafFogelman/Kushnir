import { translations } from '@/i18n/locales/index';

export type Language = 'he' | 'en';
export type Direction = 'rtl' | 'ltr';

// Create a type that represents all possible translation keys
type TranslationSection = keyof (typeof translations)[Language];
export type TranslationKeys = {
  [K in TranslationSection]: {
    [P in keyof (typeof translations)[Language][K] & string]: `${K}.${P}`;
  }[keyof (typeof translations)[Language][K] & string];
}[TranslationSection];

export interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}
