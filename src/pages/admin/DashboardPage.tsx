import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Users, DollarSign, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { t } = useLanguage();

  // Mock data - replace with API calls later
  const stats = [
    {
      title: t('adminDashboard.totalProducts'),
      value: '24',
      icon: Package,
      description: t('adminDashboard.activeProducts'),
    },
    {
      title: t('adminDashboard.totalOrders'),
      value: '156',
      icon: ShoppingCart,
      description: t('adminDashboard.thisMonth'),
    },
    {
      title: t('adminDashboard.totalCustomers'),
      value: '89',
      icon: Users,
      description: t('adminDashboard.registeredUsers'),
    },
    {
      title: t('adminDashboard.totalRevenue'),
      value: '₪45,231',
      icon: DollarSign,
      description: t('adminDashboard.thisMonth'),
    },
  ];

  return (
    <div>
      <h1 className='text-2xl font-bold mb-8'>{t('adminDashboard.title')}</h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
                <Icon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <p className='text-xs text-muted-foreground'>{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Link
        to='/admin/coupons'
        className='flex items-center gap-2 mt-8 text-primary hover:underline'
      >
        <Ticket className='h-4 w-4' />
        {t('adminDashboard.manageCoupons')}
      </Link>
    </div>
  );
};

export default AdminDashboard;
