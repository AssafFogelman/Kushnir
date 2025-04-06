import { useEffect, useState } from 'react';

const getLuminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getContrastRatio = (l1: number, l2: number) => {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

export const useColorContrast = (backgroundColor: string, textColor: string) => {
  const [contrastRatio, setContrastRatio] = useState<number>(0);

  useEffect(() => {
    const getRGB = (color: string) => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return [r, g, b];
    };

    const [bgR, bgG, bgB] = getRGB(backgroundColor);
    const [textR, textG, textB] = getRGB(textColor);

    const bgLuminance = getLuminance(bgR, bgG, bgB);
    const textLuminance = getLuminance(textR, textG, textB);

    const ratio = getContrastRatio(bgLuminance, textLuminance);
    setContrastRatio(ratio);
  }, [backgroundColor, textColor]);

  const meetsWCAGAA = contrastRatio >= 4.5;
  const meetsWCAGAAA = contrastRatio >= 7;

  return {
    contrastRatio,
    meetsWCAGAA,
    meetsWCAGAAA,
  };
};
