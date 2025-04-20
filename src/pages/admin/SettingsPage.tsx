import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { TranslationKeys } from '@/lib/language-types';

const AdminSettings = () => {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
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
      <h1 className='text-2xl font-bold mb-8'>
        {t('adminDashboard.manageSettings' as TranslationKeys)}
      </h1>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>{t('adminSettings.defaultValues')}</CardTitle>
            <CardDescription>{t('adminSettings.defaultValues')}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                {t('adminSettings.taxRate')} (%)
              </label>
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
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                {t('adminSettings.shippingCost')} (₪)
              </label>
              <Input
                type='number'
                name='shippingCost'
                value={settings.shippingCost}
                onChange={handleInputChange}
                min='0'
              />
            </div>
          </CardContent>
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                {t('adminSettings.estimatedCompletionTime')} ({t('home.days')})
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
                {t('adminSettings.estimatedDelivery')} ({t('home.days')})
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
                {t('adminSettings.shippingCost')} (₪)
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

        <Card>
          <CardHeader>
            <CardTitle>{t('adminSettings.carpenterPassword')}</CardTitle>
            <CardDescription>{t('adminSettings.carpenterPassword')}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-1'>
                {t('adminSettings.enterCarpenterPassword')}
              </label>
              <Input
                type='password'
                name='carpenterPassword'
                value={settings.carpenterPassword}
                onChange={handleInputChange}
                placeholder={t('adminSettings.enterCarpenterPassword')}
              />
            </div>
          </CardContent>
        </Card>

        <div className='flex justify-end'>
          <Button type='submit'>{t('adminSettings.apply')}</Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
