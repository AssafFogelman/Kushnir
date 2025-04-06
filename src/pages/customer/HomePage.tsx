import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import '@/styles/wood-pattern.css';
import '@/styles/sash.css';
import { mockProducts, Product } from '@/lib/mock-data';
import { useState, useEffect } from 'react';
import { Language } from '@/lib/translations/types';

const HomePage = () => {
  const { t, direction, language } = useLanguage();
  const [specialOffers, setSpecialOffers] = useState<Product[]>([]);
  const [newItems, setNewItems] = useState<Product[]>([]);
  const [limitedOffers, setLimitedOffers] = useState<Product[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Filter products based on their attributes
    setSpecialOffers(mockProducts.filter(product => product.isSpecialOffer));

    setNewItems(mockProducts.filter(product => product.isNew));

    // Filter limited offers and check if they're still valid
    const validLimitedOffers = mockProducts.filter(
      product => product.limitedOffer && new Date(product.limitedOffer.expiryDate) > currentTime
    );
    setLimitedOffers(validLimitedOffers);
  }, [currentTime]);

  const formatTimeLeft = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - currentTime.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  // Format time units based on language
  const formatTimeUnit = (value: number, unit: string) => {
    if (language === 'he') {
      return `${value} ${t(`home.${unit}`)}`;
    } else {
      return `${value}${t(`home.${unit}`)}`;
    }
  };

  return (
    <div className='space-y-20'>
      {/* Hero Section */}
      <section className='relative h-[50vh] flex items-center justify-center wood-pattern'>
        <div className='absolute inset-0 bg-black/50' />
        <div className='relative container mx-auto px-4 text-center text-white'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>{t('home.heroTitle')}</h1>
          <p className='text-xl md:text-2xl mb-8'>{t('home.heroSubtitle')}</p>
          <Button size='lg' asChild>
            <Link to='/shop'>{t('home.viewAll')}</Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Special Offers Category */}
          {specialOffers.length > 0 && (
            <div className='bg-background rounded-lg shadow-lg overflow-hidden'>
              <div className='bg-red-500 text-white p-4 text-center'>
                <h2 className='text-xl font-bold'>{t('home.specialOffers')}</h2>
              </div>
              <div className='p-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {specialOffers.map(product => (
                    <div key={product.id} className='bg-white rounded-md shadow-sm overflow-hidden'>
                      <div className='aspect-[4/3] overflow-hidden'>
                        <img
                          src={product.image}
                          alt={product.name[language as Language]}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='p-3'>
                        <h3 className='text-lg font-semibold mb-1'>
                          {product.name[language as Language]}
                        </h3>
                        <p className='text-lg font-bold text-primary'>{product.price} ₪</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* New Items Category */}
          {newItems.length > 0 && (
            <div className='bg-background rounded-lg shadow-lg overflow-hidden'>
              <div className='bg-green-500 text-white p-4 text-center'>
                <h2 className='text-xl font-bold'>{t('home.newItems')}</h2>
              </div>
              <div className='p-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {newItems.map(product => (
                    <div key={product.id} className='bg-white rounded-md shadow-sm overflow-hidden'>
                      <div className='aspect-[4/3] overflow-hidden'>
                        <img
                          src={product.image}
                          alt={product.name[language as Language]}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='p-3'>
                        <h3 className='text-lg font-semibold mb-1'>
                          {product.name[language as Language]}
                        </h3>
                        <p className='text-lg font-bold text-primary'>{product.price} ₪</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Limited Offers Category */}
          {limitedOffers.length > 0 && (
            <div className='bg-background rounded-lg shadow-lg overflow-hidden'>
              <div className='bg-yellow-500 text-white p-4 text-center'>
                <h2 className='text-xl font-bold'>{t('home.limitedOffers')}</h2>
              </div>
              <div className='p-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {limitedOffers.map(product => {
                    const timeLeft = formatTimeLeft(product.limitedOffer!.expiryDate);
                    return (
                      <div
                        key={product.id}
                        className='bg-white rounded-md shadow-sm overflow-hidden'
                      >
                        <div className='aspect-[4/3] overflow-hidden'>
                          <img
                            src={product.image}
                            alt={product.name[language as Language]}
                            className='w-full h-full object-cover'
                          />
                        </div>
                        <div className='p-3'>
                          <h3 className='text-lg font-semibold mb-1'>
                            {product.name[language as Language]}
                          </h3>
                          <p className='text-lg font-bold text-primary'>{product.price} ₪</p>
                          <div className='mt-2 text-sm text-muted-foreground bg-yellow-50 p-2 rounded'>
                            <p className='font-medium'>{t('home.timeLeft')}:</p>
                            <p>
                              {formatTimeUnit(timeLeft.days, 'days')}{' '}
                              {formatTimeUnit(timeLeft.hours, 'hours')}{' '}
                              {formatTimeUnit(timeLeft.minutes, 'minutes')}{' '}
                              {formatTimeUnit(timeLeft.seconds, 'seconds')}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Us Section */}
      <section className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className={`space-y-4 ${direction === 'rtl' ? 'md:order-2' : ''}`}>
            <h2 className='text-3xl font-bold'>{t('home.aboutUs')}</h2>
            <p className='text-lg text-muted-foreground'>{t('home.aboutUsText')}</p>
          </div>
          <div className={`${direction === 'rtl' ? 'md:order-1' : ''}`}>
            <img
              src='/images/workshop.jpg'
              alt='Workshop'
              className='rounded-lg shadow-lg w-full h-auto'
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='bg-muted py-20'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12'>{t('home.whyChooseUs')}</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center p-6 bg-background rounded-lg shadow-sm'>
              <h3 className='text-xl font-semibold mb-2'>{t('home.quality')}</h3>
              <p className='text-muted-foreground'>{t('home.qualityText')}</p>
            </div>
            <div className='text-center p-6 bg-background rounded-lg shadow-sm'>
              <h3 className='text-xl font-semibold mb-2'>{t('home.craftsmanship')}</h3>
              <p className='text-muted-foreground'>{t('home.craftsmanshipText')}</p>
            </div>
            <div className='text-center p-6 bg-background rounded-lg shadow-sm'>
              <h3 className='text-xl font-semibold mb-2'>{t('home.customization')}</h3>
              <p className='text-muted-foreground'>{t('home.customizationText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='container mx-auto px-4 text-center'>
        <div className='max-w-2xl mx-auto space-y-4'>
          <h2 className='text-3xl font-bold'>{t('home.ctaTitle')}</h2>
          <p className='text-xl text-muted-foreground'>{t('home.ctaSubtitle')}</p>
          <Button size='lg' asChild>
            <Link to='/contact'>{t('home.ctaButton')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
