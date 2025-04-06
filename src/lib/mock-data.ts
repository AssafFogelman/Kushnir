export interface Product {
  id: string;
  name: {
    en: string;
    he: string;
  };
  price: number;
  image: string;
  category: string;
  dimensions?: string;
  material?: string;
  description?: string;
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
    image: '/images/products/dining-table/1.jpg',
    category: 'furniture',
    dimensions: '120x80x75 cm',
    material: 'Oak',
    description: 'Beautiful wooden table made from solid oak.',
    isNew: true,
  },
  {
    id: '2',
    name: {
      en: 'Wooden Chair',
      he: 'כיסא עץ',
    },
    price: 350,
    image: '/images/products/bookshelf/1.jpg',
    category: 'furniture',
    dimensions: '45x45x90 cm',
    material: 'Pine',
    description: 'Comfortable wooden chair made from pine.',
    isSpecialOffer: true,
  },
  {
    id: '3',
    name: {
      en: 'Wooden Shelf',
      he: 'מדף עץ',
    },
    price: 450,
    image: '/images/products/bookshelf/2.jpg',
    category: 'furniture',
    dimensions: '100x30x200 cm',
    material: 'Birch',
    description: 'Stylish wooden shelf made from birch.',
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
    image: '/images/products/dining-table/2.jpg',
    category: 'boards',
    dimensions: '200x20x5 cm',
    material: 'Oak',
    description: 'High-quality oak board for various woodworking projects.',
  },
  {
    id: '5',
    name: {
      en: 'Pine Board',
      he: 'לוח עץ אורן',
    },
    price: 60,
    image: '/images/products/dining-table/3.jpg',
    category: 'boards',
    dimensions: '200x20x5 cm',
    material: 'Pine',
    description: 'Affordable pine board for various woodworking projects.',
    isNew: true,
  },
  {
    id: '6',
    name: {
      en: 'Wooden Beam',
      he: 'קורת עץ',
    },
    price: 120,
    image: '/images/products/bookshelf/3.jpg',
    category: 'beams',
    dimensions: '300x10x10 cm',
    material: 'Oak',
    description: 'Strong wooden beam made from oak.',
    limitedOffer: {
      expiryDate: '2024-05-15T23:59:59Z',
    },
  },
];
