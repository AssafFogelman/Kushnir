export const ARIA_LABELS = {
  navigation: {
    main: 'ניווט ראשי',
    categories: 'קטגוריות',
    cart: 'עגלת קניות',
    search: 'חיפוש',
    skipToMain: 'דלג לתוכן הראשי',
  },
  buttons: {
    addToCart: 'הוסף לעגלה',
    removeFromCart: 'הסר מהעגלה',
    checkout: 'המשך לתשלום',
    back: 'חזרה',
    next: 'הבא',
    previous: 'קודם',
  },
  forms: {
    search: 'חיפוש מוצרים',
    quantity: 'כמות',
    coupon: 'קוד קופון',
  },
  products: {
    image: 'תמונת מוצר',
    price: 'מחיר',
    description: 'תיאור מוצר',
    variations: 'וריאציות מוצר',
  },
  cart: {
    empty: 'עגלת קניות ריקה',
    items: 'פריטים בעגלה',
    total: 'סכום כולל',
  },
} as const;

export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
} as const;

export const FOCUS_MANAGEMENT = {
  TRAP: 'trap',
  RESTORE: 'restore',
} as const;

export const ROLE = {
  DIALOG: 'dialog',
  ALERT: 'alert',
  BUTTON: 'button',
  LINK: 'link',
  IMG: 'img',
  LIST: 'list',
  LISTITEM: 'listitem',
  NAVIGATION: 'navigation',
  MAIN: 'main',
  SEARCH: 'search',
  FORM: 'form',
} as const;

export const generateId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const getAriaLabel = (key: string, context?: string) => {
  const keys = key.split('.');
  let value: Record<string, unknown> | string = ARIA_LABELS;

  for (const k of keys) {
    if (value && typeof value === 'object') {
      const obj = value as Record<string, unknown>;
      value = obj[k] as Record<string, unknown> | string;
    } else {
      return key;
    }
  }

  return context ? `${value} ${context}` : (value as string);
};
