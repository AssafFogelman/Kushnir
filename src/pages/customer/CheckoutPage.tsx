import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice, cn } from '@/lib/utils';
import { createCheckoutSchema } from '@/lib/validations/checkout';
import { TranslationKeys } from '@/lib/language-types';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { items, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount] = useState(0);

  // Create the schema with the current language
  const schema = createCheckoutSchema(language);
  type CheckoutFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      shippingMethod: 'pickup',
      privacyPolicy: false,
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      // Here we would integrate with the payment providers
      // For now, we'll just simulate a successful payment
      console.log('Processing payment with data:', data);

      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCost =
      shippingMethod === 'delivery'
        ? items.reduce((sum, item) => sum + (item.shippingFee || 0), 0)
        : 0;
    return subtotal + shippingCost - couponDiscount;
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
      <h1 className='text-3xl font-bold mb-8 text-right'>{t('checkout.checkout')}</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Order Summary */}
        <Card className='h-fit'>
          <CardHeader>
            <CardTitle className='text-right'>{t('checkout.orderSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {items.map(item => (
                <div key={item.id} className='flex justify-between items-center'>
                  <div className='flex items-center gap-4'>
                    <img
                      src={item.image}
                      alt={item.name}
                      className='w-16 h-16 object-cover rounded'
                    />
                    <div className='text-right'>
                      <h3 className='font-medium'>{item.name}</h3>
                      <p className='text-sm text-gray-500'>
                        {t('cart.quantity')}: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className='font-medium'>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}

              <Separator />

              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span>{t('cart.shipping')}:</span>
                  <span>
                    {shippingMethod === 'delivery'
                      ? formatPrice(items.reduce((sum, item) => sum + (item.shippingFee || 0), 0))
                      : t('cart.freeShipping')}
                  </span>
                </div>
                {couponDiscount > 0 && (
                  <div className='flex justify-between text-green-600'>
                    <span>{t('checkout.couponCode')}:</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                <div className='flex justify-between font-bold text-lg'>
                  <span>{t('cart.total')}:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          {/* Shipping Method */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-right'>
              {t('checkout.shippingMethod' as TranslationKeys)}
            </h2>
            <RadioGroup
              value={shippingMethod}
              onValueChange={(value: 'pickup' | 'delivery') => setShippingMethod(value)}
              className='flex flex-col gap-4'
            >
              <div className='flex items-center space-x-2 space-x-reverse'>
                <RadioGroupItem value='pickup' id='pickup' />
                <Label htmlFor='pickup' className='cursor-pointer'>
                  {t('checkout.pickup')}
                </Label>
              </div>
              <div className='flex items-center space-x-2 space-x-reverse'>
                <RadioGroupItem value='delivery' id='delivery' />
                <Label htmlFor='delivery' className='cursor-pointer'>
                  {t('checkout.delivery')}
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Contact Information */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-right'>{t('checkout.contactInfo')}</h2>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='phone'>{t('common.phone')}</Label>
                <Input id='phone' type='tel' {...register('phone')} className='text-right' />
                {errors.phone && <p className='text-red-500 text-sm'>{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor='email'>{t('common.email')}</Label>
                <Input id='email' type='email' {...register('email')} className='text-right' />
                {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-right'>{t('checkout.shippingAddress')}</h2>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='street'>{t('checkout.street')}</Label>
                <Input id='street' {...register('street')} className='text-right' />
                {errors.street && <p className='text-red-500 text-sm'>{errors.street.message}</p>}
              </div>
              <div>
                <Label htmlFor='number'>{t('checkout.number')}</Label>
                <Input id='number' {...register('number')} className='text-right' />
                {errors.number && <p className='text-red-500 text-sm'>{errors.number.message}</p>}
              </div>
              <div>
                <Label htmlFor='floor'>{t('checkout.floor')}</Label>
                <Input id='floor' {...register('floor')} className='text-right' />
                {errors.floor && <p className='text-red-500 text-sm'>{errors.floor.message}</p>}
              </div>
              <div>
                <Label htmlFor='apartment'>{t('checkout.apartment')}</Label>
                <Input id='apartment' {...register('apartment')} className='text-right' />
                {errors.apartment && (
                  <p className='text-red-500 text-sm'>{errors.apartment.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor='deliveryNotes'>{t('checkout.deliveryNotes')}</Label>
                <Input id='deliveryNotes' {...register('deliveryNotes')} className='text-right' />
                {errors.deliveryNotes && (
                  <p className='text-red-500 text-sm'>{errors.deliveryNotes.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-right'>{t('checkout.invoiceDetails')}</h2>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='firstName'>{t('checkout.firstName')}</Label>
                <Input id='firstName' {...register('firstName')} className={cn('text-right')} />
                {errors.firstName && (
                  <p className={cn('text-sm', 'text-red-500')}>{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor='lastName'>{t('checkout.lastName')}</Label>
                <Input id='lastName' {...register('lastName')} className={cn('text-right')} />
                {errors.lastName && (
                  <p className={cn('text-sm', 'text-red-500')}>{errors.lastName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor='companyName'>{t('checkout.companyName')}</Label>
                <Input id='companyName' {...register('companyName')} className={cn('text-right')} />
                {errors.companyName && (
                  <p className={cn('text-sm', 'text-red-500')}>{errors.companyName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor='companyNumber'>{t('checkout.companyNumber')}</Label>
                <Input
                  id='companyNumber'
                  {...register('companyNumber')}
                  className={cn('text-right')}
                />
                {errors.companyNumber && (
                  <p className={cn('text-sm', 'text-red-500')}>{errors.companyNumber.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Coupon Code */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-right'>{t('checkout.couponCode')}</h2>
            <div className='flex gap-2'>
              <Input
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                placeholder={t('checkout.enterCouponCode')}
                className='text-right'
              />
              <Button type='button' variant='outline'>
                {t('checkout.apply')}
              </Button>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <input
                type='checkbox'
                id='privacyPolicy'
                {...register('privacyPolicy')}
                className='h-4 w-4 rounded border-gray-300'
              />
              <Label htmlFor='privacyPolicy' className='text-sm'>
                {t('checkout.privacyPolicyAgreement')}{' '}
                <a href='/privacy' className='text-primary hover:underline'>
                  {t('common.privacy')}
                </a>
              </Label>
            </div>
            {errors.privacyPolicy && (
              <p className='text-red-500 text-sm'>{errors.privacyPolicy.message}</p>
            )}
          </div>

          {/* Payment Methods */}
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold text-right'>
              {t('checkout.payWithCreditCard' as TranslationKeys)}
            </h2>
            <div className='space-y-4'>
              <Button type='submit' className='w-full'>
                {t('checkout.payWithCreditCard')}
              </Button>
              <Button type='submit' variant='outline' className='w-full'>
                {t('checkout.payWithBit')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
