/* cspell:disable */
import { useState, ReactNode } from 'react';
import { Language, TranslationKeys } from '@/lib/language-types';
import { translations } from '@/i18n/locales/index';
import { LanguageContext } from './LanguageContextDef';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('he');
  const direction = language === 'he' ? 'rtl' : 'ltr';

  const t = (key: TranslationKeys) => {
    const parts = key.split('.');
    const [section, sectionKey] = parts as [keyof (typeof translations)[Language], string];

    if (section in translations[language] && sectionKey in translations[language][section]) {
      return (translations[language][section] as Record<string, string>)[sectionKey];
    }
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
