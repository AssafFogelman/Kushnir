import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { Product } from '@/lib/mock-data';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { t, language } = useLanguage();

  return (
    <div className='group relative'>
      <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
        <img
          src={product.image}
          alt={product.name[language]}
          className='h-full w-full object-cover object-center group-hover:opacity-75'
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-sm text-gray-700'>
            <Link to={`/product/${product.id}`}>
              <span aria-hidden='true' className='absolute inset-0' />
              {product.name[language]}
            </Link>
          </h3>
          {product.dimensions && (
            <p className='mt-1 text-sm text-gray-500'>
              {t('products.dimensions')}: {product.dimensions}
            </p>
          )}
          {product.material && (
            <p className='mt-1 text-sm text-gray-500'>
              {t('products.material')}: {product.material}
            </p>
          )}
        </div>
        <p className='text-sm font-medium text-gray-900'>
          {t('products.price')}: {product.price} {t('products.shekel')}
        </p>
      </div>
      <div className='mt-4'>
        <Button onClick={() => onAddToCart(product)} className='w-full' variant='outline'>
          {t('products.addToCart')}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
