import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Carousel from '@/components/ui/carousel';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  dimensions?: string;
  material?: string;
  description?: string;
  colors?: string[];
  variations?: {
    id: string;
    name: string;
    price: number;
    images: string[];
  }[];
}

// Mock data - replace with API call later
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'ארון ספרים אורן',
    price: 1200,
    images: [
      '/images/products/bookshelf/1.jpg',
      '/images/products/bookshelf/2.jpg',
      '/images/products/bookshelf/3.jpg',
      '/images/products/bookshelf/4.jpg',
    ],
    category: 'furniture',
    dimensions: '180x40x200 ס״מ',
    material: 'אורן',
    description: 'ארון ספרים מעוצב מעץ אורן איכותי',
    colors: ['טבעי', 'כהה', 'לבן'],
    variations: [
      {
        id: '1-1',
        name: 'ארון ספרים אורן - טבעי',
        price: 1200,
        images: [
          '/images/products/bookshelf/natural/1.jpg',
          '/images/products/bookshelf/natural/2.jpg',
        ],
      },
      {
        id: '1-2',
        name: 'ארון ספרים אורן - כהה',
        price: 1300,
        images: ['/images/products/bookshelf/dark/1.jpg', '/images/products/bookshelf/dark/2.jpg'],
      },
      {
        id: '1-3',
        name: 'ארון ספרים אורן - לבן',
        price: 1400,
        images: [
          '/images/products/bookshelf/white/1.jpg',
          '/images/products/bookshelf/white/2.jpg',
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'שולחן אוכל אלון',
    price: 2500,
    images: [
      '/images/products/dining-table/1.jpg',
      '/images/products/dining-table/2.jpg',
      '/images/products/dining-table/3.jpg',
    ],
    category: 'furniture',
    dimensions: '160x90x75 ס״מ',
    material: 'אלון',
    description: 'שולחן אוכל מסורתי מעץ אלון',
    colors: ['טבעי', 'כהה'],
    variations: [
      {
        id: '2-1',
        name: 'שולחן אוכל אלון - טבעי',
        price: 2500,
        images: [
          '/images/products/dining-table/natural/1.jpg',
          '/images/products/dining-table/natural/2.jpg',
        ],
      },
      {
        id: '2-2',
        name: 'שולחן אוכל אלון - כהה',
        price: 2700,
        images: [
          '/images/products/dining-table/dark/1.jpg',
          '/images/products/dining-table/dark/2.jpg',
        ],
      },
    ],
  },
];

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h2 className='text-2xl font-bold mb-4'>{t('products.productNotFound')}</h2>
        <Button onClick={() => navigate('/shop')}>{t('products.backToShop')}</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const selectedProduct = selectedVariation
      ? product.variations?.find(v => v.id === selectedVariation)
      : product;

    if (!selectedProduct) return;

    addItem({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.images[0],
      quantity: 1,
    });
    navigate('/cart');
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <Carousel
            images={
              selectedVariation
                ? product.variations?.find(v => v.id === selectedVariation)?.images ||
                  product.images
                : product.images
            }
            className='mb-4'
          />
          {product.variations && (
            <div className='mt-4'>
              <h3 className='text-lg font-medium mb-2'>{t('products.variations')}</h3>
              <div className='flex gap-2'>
                {product.variations.map(variation => (
                  <Button
                    key={variation.id}
                    variant={selectedVariation === variation.id ? 'default' : 'outline'}
                    onClick={() => setSelectedVariation(variation.id)}
                  >
                    {variation.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <h1 className='text-3xl font-bold'>{product.name}</h1>
          <p className='text-2xl font-medium'>
            {selectedVariation
              ? product.variations?.find(v => v.id === selectedVariation)?.price
              : product.price}{' '}
            {t('products.shekel')}
          </p>
          {product.description && <p className='text-muted-foreground'>{product.description}</p>}
          {product.dimensions && (
            <div>
              <h3 className='font-medium'>{t('products.dimensions')}</h3>
              <p>{product.dimensions}</p>
            </div>
          )}
          {product.material && (
            <div>
              <h3 className='font-medium'>{t('products.material')}</h3>
              <p>{product.material}</p>
            </div>
          )}
          {product.colors && (
            <div>
              <h3 className='font-medium'>{t('products.colors')}</h3>
              <p>{product.colors.join(', ')}</p>
            </div>
          )}
          <div className='flex items-center gap-4'>
            <Input
              type='number'
              min='1'
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value, 10))}
              className='w-20'
            />
            <Button onClick={handleAddToCart} className='flex-1'>
              {t('products.addToCart')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
