type SaleMethods = 'REGULAR' | 'NEW' | 'LIMITED_OFFER' | 'SPECIAL_OFFER';

interface Product {
  inceptionDate: Date;
  id: string;
  name: {
    he: string;
    en: string;
  };
  initialPrice: number;
  price: number;
  discountPercentage: number;
  images: string[];
  categories: productCategory[];
  saleMethod: SaleMethods;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  material?: {
    he: string;
    en: string;
  };
  description?: {
    he: string;
    en: string;
  };
  shipmentFee: number;
  estimatedCompletionTime: number;
  shipmentTime?: number;
  inStock: boolean;
  isHidden: boolean;
}

interface Category {
  he: string;
  en: string;
}

type productCategory = Category;

export type { Product, productCategory };
