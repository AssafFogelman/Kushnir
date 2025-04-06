// Define a generic type for translation objects
export type TranslationObject = Record<string, string>;

// Define the complete translations structure
export interface Translations {
  [key: string]: TranslationObject;
}

// Define the language type
export type Language = 'he' | 'en';

// Type guard to check if an object is a valid translation object
export function isTranslationObject(obj: unknown): obj is TranslationObject {
  if (typeof obj !== 'object' || obj === null) return false;

  // Check that all values are strings
  return Object.values(obj).every(value => typeof value === 'string');
}

// Type guard to check if an object is a valid translations object
export function isValidTranslations(obj: unknown): obj is Translations {
  if (typeof obj !== 'object' || obj === null) return false;

  // Check that all values are translation objects
  return Object.values(obj).every(isTranslationObject);
}
