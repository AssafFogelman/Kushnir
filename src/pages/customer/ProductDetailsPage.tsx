import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Carousel from '@/components/ui/carousel';
import { mockProducts } from '@/mocks/mock-data';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h2 className='text-2xl font-bold mb-4'>{t('products.noProducts')}</h2>
        <Button onClick={() => navigate('/shop')}>{t('products.backToShop')}</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name.he,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
    navigate('/cart');
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <Carousel images={product.images} className='mb-4' />
        </div>
        <div>
          <h1 className='text-3xl font-bold'>{product.name.he}</h1>
          <p className='text-2xl font-medium'>
            {product.price} {t('products.shekel')}
          </p>
          {product.description && <p className='text-muted-foreground'>{product.description.he}</p>}
          {product.dimensions && (
            <div>
              <h3 className='font-medium'>{t('products.dimensions')}</h3>
              <p>{product.dimensions.he}</p>
            </div>
          )}
          {product.material && (
            <div>
              <h3 className='font-medium'>{t('products.material')}</h3>
              <p>{product.material.he}</p>
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
