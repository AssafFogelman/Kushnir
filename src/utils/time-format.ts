import { TranslationKeys } from '@/lib/language-types';

export const formatTimeUnit = (
  value: number,
  unit: string,
  t: (key: TranslationKeys) => string
) => {
  return `${value} ${t(`home.${unit}` as TranslationKeys)}`;
};

export const formatTimeUnitNoSpace = (
  value: number,
  unit: string,
  t: (key: TranslationKeys) => string
) => {
  return `${value}${t(`home.${unit}` as TranslationKeys)}`;
};
