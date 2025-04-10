import { Outlet, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, Settings, LogOut, Tag, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const { t } = useLanguage();
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    {
      href: '/admin',
      icon: LayoutDashboard,
      label: t('dashboard'),
    },
    {
      href: '/admin/products',
      icon: Package,
      label: t('products'),
    },
    {
      href: '/admin/coupons',
      icon: Tag,
      label: t('coupons'),
    },
    {
      href: '/admin/reports',
      icon: BarChart,
      label: t('reports'),
    },
    {
      href: '/admin/settings',
      icon: Settings,
      label: t('settings'),
    },
  ];

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='flex'>
        {/* Sidebar */}
        <div className='w-64 bg-white border-r'>
          <div className='p-4'>
            <h1 className='text-xl font-bold'>Kushnir Admin</h1>
          </div>
          <nav className='mt-4'>
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2',
                    location.pathname === item.href
                      ? 'bg-gray-100 text-primary'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <Icon className='w-5 h-5' />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className='mt-auto p-4'>
            <Button variant='outline' className='w-full' onClick={logout}>
              <LogOut className='w-5 h-5 mr-2' />
              {t('logout')}
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className='flex-1 p-8'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
