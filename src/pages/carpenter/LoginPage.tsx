import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CarpenterLoginPage = () => {
  const { t } = useLanguage();
  const { loginCarpenter } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginCarpenter(password);
      const from = (location.state as { from?: string })?.from || '/carpenter';
      navigate(from);
    } catch {
      setError(t('adminLogin.invalidPassword'));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-center'>{t('carpenterOrders.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Input
                type='password'
                placeholder={t('adminSettings.enterCarpenterPassword')}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='w-full'
              />
              {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
            </div>
            <Button type='submit' className='w-full'>
              {t('common.login')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarpenterLoginPage;
