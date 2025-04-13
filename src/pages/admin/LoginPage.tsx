import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { TranslationKeys } from '@/lib/language-types';

const LoginPage = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      handleSubmit();
    })();
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    try {
      await login(password);
    } catch {
      setError(t('adminLogin.invalidPassword' as TranslationKeys));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>{t('adminLogin.title' as TranslationKeys)}</CardTitle>
          <CardDescription>{t('adminLogin.description' as TranslationKeys)}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {error && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div>
              <Input
                type='password'
                placeholder={t('adminLogin.enterAdminPassword' as TranslationKeys)}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type='submit' className='w-full'>
              {t('common.login' as TranslationKeys)}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
