import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
      className='text-sm'
    >
      {language === 'he' ? 'English' : 'עברית'}
    </Button>
  );
};

export default LanguageSwitcher;
