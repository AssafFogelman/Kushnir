/**
 * Example usage of the translations system
 *
 * This file demonstrates how to use the new translation structure
 * with language-specific files and TypeScript type safety.
 */

import { getTranslation, getSectionTranslations, validateTranslations } from './index';

// Example 1: Get a translation for a specific section and key
function exampleGetTranslation() {
  // Get translations for both languages
  const heHomeTitle = getTranslation('he', 'home', 'heroTitle');
  const enHomeTitle = getTranslation('en', 'home', 'heroTitle');

  console.log('Hebrew home title:', heHomeTitle); // Should print: ריהוט עץ מותאם אישית
  console.log('English home title:', enHomeTitle); // Should print: Custom Wood Furniture
}

// Example 2: Get all translations for a section
function exampleGetSectionTranslations() {
  // Get all common translations for both languages
  const heCommon = getSectionTranslations('he', 'common');
  const enCommon = getSectionTranslations('en', 'common');

  console.log('Hebrew home translation:', heCommon.home); // Should print: בית
  console.log('English home translation:', enCommon.home); // Should print: Home
}

// Example 3: Get a translation for an invalid key
function exampleInvalidKey() {
  const invalidKey = 'nonExistentKey';
  const heTranslation = getTranslation('he', 'common', invalidKey);
  const enTranslation = getTranslation('en', 'common', invalidKey);

  console.log('Hebrew translation for invalid key:', heTranslation); // Should print: nonExistentKey
  console.log('English translation for invalid key:', enTranslation); // Should print: nonExistentKey
}

// Example 4: Validate translations
function exampleValidateTranslations() {
  const isValid = validateTranslations();
  console.log('Translations are valid:', isValid);
}

// Run the examples
console.log('=== Translation Examples ===');
exampleGetTranslation();
exampleGetSectionTranslations();
exampleInvalidKey();
exampleValidateTranslations();
