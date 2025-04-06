/* cspell:disable */
import { useState, ReactNode } from 'react';
import { Language } from '@/lib/language-types';
import { translations } from '@/lib/translations/index';
import { LanguageContext } from './LanguageContextDef';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('he');
  const direction = language === 'he' ? 'rtl' : 'ltr';

  const t = (key: string) => {
    // Split the key by dot to handle sectioned translations
    const parts = key.split('.');

    // If there's no section specified, try to find the key in all sections
    if (parts.length === 1) {
      // First try to find in common section
      if (translations[language].common && key in translations[language].common) {
        return translations[language].common[key];
      }

      // Then try to find in other sections
      for (const section in translations[language]) {
        if (key in translations[language][section]) {
          return translations[language][section][key];
        }
      }

      // If not found, return the key
      return key;
    }

    // If section is specified (e.g., 'home.heroTitle')
    const [section, sectionKey] = parts;
    if (section in translations[language] && sectionKey in translations[language][section]) {
      return translations[language][section][sectionKey];
    }

    // If not found, return the key
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      <div dir={direction} lang={language}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
