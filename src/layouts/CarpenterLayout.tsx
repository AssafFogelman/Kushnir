import { Link, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const CarpenterLayout = () => {
  const { direction, t } = useLanguage();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/carpenter/login' state={{ from: location.pathname }} replace />;
  }

  const navItems = [
    { path: '/carpenter', label: t('carpenterOrders.underway') },
    { path: '/carpenter/incoming', label: t('carpenterOrders.incoming') },
    { path: '/carpenter/completed', label: t('carpenterOrders.completed') },
    { path: '/carpenter/cancelled', label: t('carpenterOrders.cancelled') },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8 text-right'>{t('carpenterOrders.title')}</h1>

        <nav className='mb-8'>
          <div className='flex flex-wrap gap-2'>
            {navItems.map(item => (
              <Button
                key={item.path}
                asChild
                variant={location.pathname === item.path ? 'default' : 'outline'}
                className={cn('min-w-[150px]', direction === 'rtl' ? 'text-right' : 'text-left')}
              >
                <Link to={item.path}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </nav>

        <div className='bg-white rounded-lg shadow p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CarpenterLayout;
