import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface SalesData {
  date: string;
  totalSales: number;
  numberOfOrders: number;
  averageOrderValue: number;
}

interface CustomerStats {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  averageOrderFrequency: number;
}

interface PopularItem {
  id: string;
  name: string;
  totalSold: number;
  revenue: number;
}

const ReportsPage = () => {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('month');

  // Mock data - replace with API calls
  const salesData: SalesData[] = [
    {
      date: '2024-03',
      totalSales: 25000,
      numberOfOrders: 15,
      averageOrderValue: 1666.67,
    },
    // Add more mock data as needed
  ];

  const customerStats: CustomerStats = {
    totalCustomers: 100,
    newCustomers: 20,
    returningCustomers: 80,
    averageOrderFrequency: 2.5,
  };

  const popularItems: PopularItem[] = [
    {
      id: '1',
      name: 'ארון ספרים אורן',
      totalSold: 10,
      revenue: 12000,
    },
    // Add more mock data as needed
  ];

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>{t('adminDashboard.manageReports')}</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder={t('adminDashboard.thisMonth')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='week'>{t('adminDashboard.thisMonth')}</SelectItem>
            <SelectItem value='month'>{t('adminDashboard.thisMonth')}</SelectItem>
            <SelectItem value='year'>{t('adminDashboard.thisMonth')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>{t('adminDashboard.totalRevenue')}</CardTitle>
            <CardDescription>{t('adminDashboard.thisMonth')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {t('products.shekel')}
              {salesData[0]?.totalSales.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('adminDashboard.totalOrders')}</CardTitle>
            <CardDescription>{t('adminDashboard.thisMonth')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{salesData[0]?.numberOfOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('adminDashboard.totalOrders')}</CardTitle>
            <CardDescription>{t('adminDashboard.thisMonth')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {t('products.shekel')}
              {salesData[0]?.averageOrderValue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('adminDashboard.totalCustomers')}</CardTitle>
            <CardDescription>{t('adminDashboard.registeredUsers')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{customerStats.totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('adminDashboard.totalCustomers')}</CardTitle>
          <CardDescription>{t('adminDashboard.registeredUsers')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <p className='text-sm text-gray-500'>{t('adminDashboard.registeredUsers')}</p>
              <p className='text-xl font-bold'>{customerStats.newCustomers}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>{t('adminDashboard.registeredUsers')}</p>
              <p className='text-xl font-bold'>{customerStats.returningCustomers}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>{t('adminDashboard.totalOrders')}</p>
              <p className='text-xl font-bold'>{customerStats.averageOrderFrequency}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('products.bestSellers')}</CardTitle>
          <CardDescription>{t('adminDashboard.thisMonth')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('products.name')}</TableHead>
                <TableHead>{t('products.quantity')}</TableHead>
                <TableHead>{t('adminDashboard.totalRevenue')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {popularItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.totalSold}</TableCell>
                  <TableCell>
                    {t('products.shekel')}
                    {item.revenue.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
