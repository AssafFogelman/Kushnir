import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { TranslationKeys } from '@/lib/language-types';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] text-center px-4'>
      <h1 className='text-6xl font-bold mb-4'>404</h1>
      <h2 className='text-2xl font-semibold mb-6'>{t('pageNotFound.title' as TranslationKeys)}</h2>
      <p className='text-gray-600 mb-8 max-w-md'>{t('pageNotFound.message' as TranslationKeys)}</p>
      <Button onClick={() => navigate('/')} size='lg'>
        <Home className='w-4 h-4 mr-2' />
        {t('pageNotFound.homeButton' as TranslationKeys)}
      </Button>
    </div>
  );
};

export default NotFoundPage;
