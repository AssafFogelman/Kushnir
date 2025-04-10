import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import '@/styles/wood-pattern.css';
import '@/styles/sash.css';
import { mockProducts, Product } from '@/mocks/mock-data';
import { useState, useEffect } from 'react';
import { Language } from '@/i18n/locales/types';

const MAX_LINES_IN_SECTION = 2;
const INITIAL_LINES_IN_SECTION = 1;

const HomePage = () => {
  const { t, direction, language } = useLanguage();
  const [specialOffers, setSpecialOffers] = useState<Product[]>([]);
  const [newItems, setNewItems] = useState<Product[]>([]);
  const [limitedOffers, setLimitedOffers] = useState<Product[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visibleLines, setVisibleLines] = useState({
    specialOffers: INITIAL_LINES_IN_SECTION,
    newItems: INITIAL_LINES_IN_SECTION,
    limitedOffers: INITIAL_LINES_IN_SECTION,
  });

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

  const showMoreItems = (category: 'specialOffers' | 'newItems' | 'limitedOffers') => {
    setVisibleLines(prev => ({
      ...prev,
      [category]: prev[category] + 1,
    }));
  };

  const CategorySection = ({
    title,
    items,
    category,
    type,
  }: {
    title: string;
    items: Product[];
    category: 'specialOffers' | 'newItems' | 'limitedOffers';
    type: string;
  }) => {
    const visibleCount = visibleLines[category] * 2; // 2 items per line
    const hasMoreItems = items.length > visibleCount;

    return (
      <div className='bg-background rounded-lg shadow-lg overflow-hidden'>
        <div className={`bg-${type}-500 text-white p-4 text-center`}>
          <h2 className='text-xl font-bold'>{title}</h2>
        </div>
        <div className='p-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {items.slice(0, visibleCount).map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className='block'>
                <div className='bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition-shadow'>
                  <div className='aspect-[4/3] overflow-hidden'>
                    <img
                      src={product.images[0]}
                      alt={product.name[language as Language]}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='p-3'>
                    <h3 className='text-lg font-semibold mb-1 h-[3.5em] line-clamp-2'>
                      {product.name[language as Language]}
                    </h3>
                    <p className='text-lg font-bold text-primary'>{product.price} ₪</p>
                    {product.limitedOffer && (
                      <div className='mt-2 text-sm text-muted-foreground bg-yellow-50 p-2 rounded'>
                        <p className='font-medium'>{t('home.timeLeft')}:</p>
                        <p>
                          {(() => {
                            const timeLeft = formatTimeLeft(product.limitedOffer.expiryDate);
                            return (
                              <>
                                {formatTimeUnit(timeLeft.days, 'days')}{' '}
                                {formatTimeUnit(timeLeft.hours, 'hours')}{' '}
                                {formatTimeUnit(timeLeft.minutes, 'minutes')}{' '}
                                {formatTimeUnit(timeLeft.seconds, 'seconds')}
                              </>
                            );
                          })()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {hasMoreItems && visibleLines[category] < MAX_LINES_IN_SECTION && (
            <div className='mt-4 flex justify-center'>
              <Button variant='outline' onClick={() => showMoreItems(category)} className='mr-2'>
                {t('home.seeMore')}
              </Button>
            </div>
          )}
          {hasMoreItems && visibleLines[category] >= MAX_LINES_IN_SECTION && (
            <div className='mt-4 flex justify-center'>
              <Button asChild>
                <Link to={`/shop?category=${category}`}>{t('home.viewCategory')}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='space-y-20 mb-[30px]'>
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
          {specialOffers.length > 0 && (
            <CategorySection
              title={t('home.specialOffers')}
              items={specialOffers}
              category='specialOffers'
              type='red'
            />
          )}

          {newItems.length > 0 && (
            <CategorySection
              title={t('home.newItems')}
              items={newItems}
              category='newItems'
              type='green'
            />
          )}

          {limitedOffers.length > 0 && (
            <CategorySection
              title={t('home.limitedOffers')}
              items={limitedOffers}
              category='limitedOffers'
              type='yellow'
            />
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
