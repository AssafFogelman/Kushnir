import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AdminSettings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    storeName: 'Kushnir',
    currency: 'ILS',
    language: 'he',
    taxRate: 18,
    shippingCost: 0,
    freeShippingThreshold: 1000,
    carpenterPassword: '',
    defaultValues: {
      completionTime: 7,
      shippingTime: 3,
      shippingFee: 0,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]:
        name === 'taxRate' || name === 'shippingCost' || name === 'freeShippingThreshold'
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update
    console.log('Settings updated:', settings);
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-8'>{t('adminDashboard.manageSettings')}</h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>{t('adminDashboard.manageSettings')}</CardTitle>
            <CardDescription>{t('common.companyDescription')}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>{t('common.companyName')}</label>
              <Input name='storeName' value={settings.storeName} onChange={handleInputChange} />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>{t('products.shekel')}</label>
              <Select
                value={settings.currency}
                onValueChange={value => setSettings(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('products.shekel')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ILS'>{t('products.shekel')} (ILS)</SelectItem>
                  <SelectItem value='USD'>$ (USD)</SelectItem>
                  <SelectItem value='EUR'>€ (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>{t('common.language')}</label>
              <Select
                value={settings.language}
                onValueChange={value => setSettings(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('common.language')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='he'>עברית</SelectItem>
                  <SelectItem value='en'>English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('checkout.invoiceDetails')}</CardTitle>
            <CardDescription>{t('checkout.invoiceDetails')}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>{t('products.discount')} (%)</label>
              <Input
                type='number'
                name='taxRate'
                value={settings.taxRate}
                onChange={handleInputChange}
                min='0'
                max='100'
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('checkout.shippingMethod')}</CardTitle>
            <CardDescription>{t('checkout.delivery')}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                {t('cart.shipping')} ({settings.currency})
              </label>
              <Input
                type='number'
                name='shippingCost'
                value={settings.shippingCost}
                onChange={handleInputChange}
                min='0'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>
                {t('cart.freeShipping')} ({settings.currency})
              </label>
              <Input
                type='number'
                name='freeShippingThreshold'
                value={settings.freeShippingThreshold}
                onChange={handleInputChange}
                min='0'
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('adminLogin.title')}</CardTitle>
            <CardDescription>{t('adminLogin.description')}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                {t('adminLogin.enterAdminPassword')}
              </label>
              <Input
                type='password'
                name='carpenterPassword'
                value={settings.carpenterPassword}
                onChange={handleInputChange}
                placeholder={t('adminLogin.enterAdminPassword')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('products.estimatedDelivery')}</CardTitle>
            <CardDescription>{t('products.estimatedDelivery')}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                {t('products.estimatedDelivery')} ({t('home.days')})
              </label>
              <Input
                type='number'
                name='defaultValues.completionTime'
                value={settings.defaultValues.completionTime}
                onChange={e =>
                  setSettings({
                    ...settings,
                    defaultValues: {
                      ...settings.defaultValues,
                      completionTime: parseInt(e.target.value),
                    },
                  })
                }
                min='1'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>
                {t('products.estimatedDelivery')} ({t('home.days')})
              </label>
              <Input
                type='number'
                name='defaultValues.shippingTime'
                value={settings.defaultValues.shippingTime}
                onChange={e =>
                  setSettings({
                    ...settings,
                    defaultValues: {
                      ...settings.defaultValues,
                      shippingTime: parseInt(e.target.value),
                    },
                  })
                }
                min='1'
              />
            </div>
            <div>
              <label className='block text-sm font-medium mb-1'>
                {t('cart.shipping')} ({settings.currency})
              </label>
              <Input
                type='number'
                name='defaultValues.shippingFee'
                value={settings.defaultValues.shippingFee}
                onChange={e =>
                  setSettings({
                    ...settings,
                    defaultValues: {
                      ...settings.defaultValues,
                      shippingFee: parseFloat(e.target.value),
                    },
                  })
                }
                min='0'
              />
            </div>
          </CardContent>
        </Card>

        <div className='flex justify-end'>
          <Button type='submit'>{t('checkout.apply')}</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
