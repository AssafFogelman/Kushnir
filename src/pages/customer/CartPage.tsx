import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CartPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: string) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity)) {
      updateQuantity(productId, quantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h2 className='text-2xl font-bold mb-4'>{t('cart.yourCart')}</h2>
        <p className='text-lg text-muted-foreground mb-4'>{t('cart.cartEmpty')}</p>
        <Button onClick={() => navigate('/shop')}>{t('cart.continueShopping')}</Button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold mb-8'>{t('cart.yourCart')}</h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <div className='space-y-4'>
            {items.map(item => (
              <div key={item.id} className='flex items-center gap-4 p-4 border rounded-lg'>
                <img src={item.image} alt={item.name} className='w-24 h-24 object-cover rounded' />
                <div className='flex-1'>
                  <h3 className='font-medium'>{item.name}</h3>
                  <p className='text-muted-foreground'>
                    {t('products.price')}: {item.price} {t('products.shekel')}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <Input
                    type='number'
                    min='1'
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item.id, e.target.value)}
                    className='w-20'
                  />
                  <Button variant='outline' onClick={() => removeItem(item.id)}>
                    {t('cart.remove')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='border rounded-lg p-6 space-y-4'>
          <h3 className='text-lg font-medium'>{t('checkout.orderSummary')}</h3>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>{t('cart.subtotal')}</span>
              <span>
                {totalPrice} {t('products.shekel')}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>{t('cart.shipping')}</span>
              <span>{t('cart.freeShipping')}</span>
            </div>
            <div className='border-t pt-2'>
              <div className='flex justify-between font-medium'>
                <span>{t('cart.total')}</span>
                <span>
                  {totalPrice} {t('products.shekel')}
                </span>
              </div>
            </div>
          </div>
          <Button className='w-full' onClick={() => navigate('/checkout')}>
            {t('cart.proceedToCheckout')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
