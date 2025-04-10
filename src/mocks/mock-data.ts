export interface Product {
  id: string;
  name: {
    en: string;
    he: string;
  };
  price: number;
  images: string[];
  categories: string[];
  dimensions?: {
    en: string;
    he: string;
  };
  material?: {
    en: string;
    he: string;
  };
  description?: {
    en: string;
    he: string;
  };
  isNew?: boolean;
  isSpecialOffer?: boolean;
  limitedOffer?: {
    expiryDate: string; // ISO date string
  };
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: {
      en: 'Wooden Table',
      he: 'שולחן עץ',
    },
    price: 1200,
    images: ['/images/products/dining-table/1.jpg'],
    categories: ['furniture', 'dining'],
    dimensions: {
      en: '120x80x75 cm',
      he: '120x80x75 ס"מ',
    },
    material: {
      en: 'Oak',
      he: 'אלון',
    },
    description: {
      en: 'Beautiful wooden table made from solid oak.',
      he: 'שולחן עץ יפה העשוי מאלון מלא.',
    },
    isNew: true,
  },
  {
    id: '2',
    name: {
      en: 'Wooden Chair',
      he: 'כיסא עץ',
    },
    price: 350,
    images: ['/images/products/bookshelf/1.jpg'],
    categories: ['furniture', 'dining'],
    dimensions: {
      en: '45x45x90 cm',
      he: '45x45x90 ס"מ',
    },
    material: {
      en: 'Pine',
      he: 'אורן',
    },
    description: {
      en: 'Comfortable wooden chair made from pine.',
      he: 'כיסא עץ נוח העשוי מאורן.',
    },
    isSpecialOffer: true,
  },
  {
    id: '3',
    name: {
      en: 'Wooden Shelf',
      he: 'מדף עץ',
    },
    price: 450,
    images: ['/images/products/bookshelf/2.jpg'],
    categories: ['furniture', 'storage'],
    dimensions: {
      en: '100x30x200 cm',
      he: '100x30x200 ס"מ',
    },
    material: {
      en: 'Birch',
      he: 'ליבנה',
    },
    description: {
      en: 'Stylish wooden shelf made from birch.',
      he: 'מדף עץ אלגנטי העשוי מליבנה.',
    },
    limitedOffer: {
      expiryDate: '2025-04-30T23:59:59Z',
    },
  },
  {
    id: '4',
    name: {
      en: 'Oak Board',
      he: 'לוח עץ אלון',
    },
    price: 80,
    images: ['/images/products/dining-table/2.jpg'],
    categories: ['boards', 'materials'],
    dimensions: {
      en: '200x20x5 cm',
      he: '200x20x5 ס"מ',
    },
    material: {
      en: 'Oak',
      he: 'אלון',
    },
    description: {
      en: 'High-quality oak board for various woodworking projects.',
      he: 'לוח אלון באיכות גבוהה למגוון פרויקטים בעץ.',
    },
  },
  {
    id: '5',
    name: {
      en: 'Pine Board',
      he: 'לוח עץ אורן',
    },
    price: 60,
    images: ['/images/products/dining-table/3.jpg'],
    categories: ['boards', 'materials'],
    dimensions: {
      en: '200x20x5 cm',
      he: '200x20x5 ס"מ',
    },
    material: {
      en: 'Pine',
      he: 'אורן',
    },
    description: {
      en: 'Affordable pine board for various woodworking projects.',
      he: 'לוח אורן במחיר סביר למגוון פרויקטים בעץ.',
    },
    isNew: true,
  },
  {
    id: '6',
    name: {
      en: 'Wooden Beam',
      he: 'קורת עץ',
    },
    price: 120,
    images: ['/images/products/bookshelf/3.jpg'],
    categories: ['beams', 'materials'],
    dimensions: {
      en: '300x10x10 cm',
      he: '300x10x10 ס"מ',
    },
    material: {
      en: 'Oak',
      he: 'אלון',
    },
    description: {
      en: 'Strong wooden beam made from oak.',
      he: 'קורת עץ חזקה העשויה מאלון.',
    },
    limitedOffer: {
      expiryDate: '2024-05-15T23:59:59Z',
    },
  },
  {
    id: '7',
    name: {
      en: 'Pine Bookshelf - Natural',
      he: 'ארון ספרים אורן - טבעי',
    },
    price: 1200,
    images: ['/images/products/bookshelf/natural/1.jpg'],
    categories: ['furniture', 'storage'],
    dimensions: {
      en: '180x40x200 cm',
      he: '180x40x200 ס"מ',
    },
    material: {
      en: 'Pine',
      he: 'אורן',
    },
    description: {
      en: 'Beautiful pine bookshelf with natural finish.',
      he: 'ארון ספרים מעוצב מעץ אורן איכותי - גוון טבעי',
    },
    isNew: true,
  },
  {
    id: '8',
    name: {
      en: 'Pine Bookshelf - Dark',
      he: 'ארון ספרים אורן - כהה',
    },
    price: 1300,
    images: ['/images/products/bookshelf/dark/1.jpg'],
    categories: ['furniture', 'storage'],
    dimensions: {
      en: '180x40x200 cm',
      he: '180x40x200 ס"מ',
    },
    material: {
      en: 'Pine',
      he: 'אורן',
    },
    description: {
      en: 'Beautiful pine bookshelf with dark finish.',
      he: 'ארון ספרים מעוצב מעץ אורן איכותי - גוון כהה',
    },
  },
  {
    id: '9',
    name: {
      en: 'Pine Bookshelf - White',
      he: 'ארון ספרים אורן - לבן',
    },
    price: 1400,
    images: ['/images/products/bookshelf/white/1.jpg'],
    categories: ['furniture', 'storage'],
    dimensions: {
      en: '180x40x200 cm',
      he: '180x40x200 ס"מ',
    },
    material: {
      en: 'Pine',
      he: 'אורן',
    },
    description: {
      en: 'Beautiful pine bookshelf with white finish.',
      he: 'ארון ספרים מעוצב מעץ אורן איכותי - גוון לבן',
    },
  },
  {
    id: '10',
    name: {
      en: 'Oak Dining Table - Natural',
      he: 'שולחן אוכל אלון - טבעי',
    },
    price: 2500,
    images: ['/images/products/dining-table/natural/1.jpg'],
    categories: ['furniture', 'dining'],
    dimensions: {
      en: '160x90x75 cm',
      he: '160x90x75 ס"מ',
    },
    material: {
      en: 'Oak',
      he: 'אלון',
    },
    description: {
      en: 'Traditional oak dining table with natural finish.',
      he: 'שולחן אוכל מסורתי מעץ אלון - גוון טבעי',
    },
  },
  {
    id: '11',
    name: {
      en: 'Oak Dining Table - Dark',
      he: 'שולחן אוכל אלון - כהה',
    },
    price: 2700,
    images: ['/images/products/dining-table/dark/1.jpg'],
    categories: ['furniture', 'dining'],
    dimensions: {
      en: '160x90x75 cm',
      he: '160x90x75 ס"מ',
    },
    material: {
      en: 'Oak',
      he: 'אלון',
    },
    description: {
      en: 'Traditional oak dining table with dark finish.',
      he: 'שולחן אוכל מסורתי מעץ אלון - גוון כהה',
    },
    isSpecialOffer: true,
  },
];
