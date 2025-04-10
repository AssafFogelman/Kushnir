// Define a generic type for translation objects
export type TranslationObject = Record<string, string>;

// Define the complete translations structure
export interface Translations {
  [key: string]: TranslationObject;
}

// Define the language type
export type Language = 'he' | 'en';
