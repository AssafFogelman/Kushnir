import { enTranslations } from './en';
import { heTranslations } from './he';
import { Language, isValidTranslations } from './types';

// Combined translations object
export const translations = {
  en: enTranslations,
  he: heTranslations,
};

// Export individual language translations
export { enTranslations, heTranslations };

// Helper function to get a translation by key
export function getTranslation(lang: Language, section: string, key: string): string {
  // Check if the section and key exist
  if (section in translations[lang] && key in translations[lang][section]) {
    return translations[lang][section][key];
  }

  // If key doesn't exist, return the key itself
  console.warn(`Translation key "${key}" not found in section "${section}" for language "${lang}"`);
  return key;
}

// Helper function to get all translations for a section
export function getSectionTranslations(lang: Language, section: string): Record<string, string> {
  return translations[lang][section];
}

// Helper function to validate that all translations have the same structure
export function validateTranslations(): boolean {
  // Check that both language objects are valid translations
  if (!isValidTranslations(translations.en) || !isValidTranslations(translations.he)) {
    console.error('Invalid translation structure detected');
    return false;
  }

  // Get all sections from both languages
  const enSections = Object.keys(translations.en);
  const heSections = Object.keys(translations.he);

  // Check if both languages have the same sections
  if (enSections.length !== heSections.length) {
    console.error('Different number of sections between languages');
    return false;
  }

  // Check if all sections in English exist in Hebrew and vice versa
  const missingInHebrew = enSections.filter(section => !heSections.includes(section));
  const missingInEnglish = heSections.filter(section => !enSections.includes(section));

  if (missingInHebrew.length > 0) {
    console.error(`Sections missing in Hebrew: ${missingInHebrew.join(', ')}`);
    return false;
  }

  if (missingInEnglish.length > 0) {
    console.error(`Sections missing in English: ${missingInEnglish.join(', ')}`);
    return false;
  }

  // Check if all sections have the same keys
  for (const section of enSections) {
    const enKeys = Object.keys(translations.en[section]);
    const heKeys = Object.keys(translations.he[section]);

    if (enKeys.length !== heKeys.length) {
      console.error(`Different number of keys in section "${section}"`);
      return false;
    }

    const missingInHebrewKeys = enKeys.filter(key => !heKeys.includes(key));
    const missingInEnglishKeys = heKeys.filter(key => !enKeys.includes(key));

    if (missingInHebrewKeys.length > 0) {
      console.error(
        `Keys missing in Hebrew for section "${section}": ${missingInHebrewKeys.join(', ')}`
      );
      return false;
    }

    if (missingInEnglishKeys.length > 0) {
      console.error(
        `Keys missing in English for section "${section}": ${missingInEnglishKeys.join(', ')}`
      );
      return false;
    }
  }

  return true;
}

// Export the Language type
export type { Language };
