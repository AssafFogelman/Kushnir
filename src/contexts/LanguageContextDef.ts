import { createContext } from 'react';
import { LanguageContextType } from '@/lib/language-types';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
