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
        <h1 className='text-2xl font-bold'>{t('reports')}</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder={t('selectTimeRange')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='week'>{t('lastWeek')}</SelectItem>
            <SelectItem value='month'>{t('lastMonth')}</SelectItem>
            <SelectItem value='year'>{t('lastYear')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>{t('totalSales')}</CardTitle>
            <CardDescription>{t('totalSalesDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>₪{salesData[0]?.totalSales.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('numberOfOrders')}</CardTitle>
            <CardDescription>{t('numberOfOrdersDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{salesData[0]?.numberOfOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('averageOrderValue')}</CardTitle>
            <CardDescription>{t('averageOrderValueDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              ₪{salesData[0]?.averageOrderValue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('totalCustomers')}</CardTitle>
            <CardDescription>{t('totalCustomersDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{customerStats.totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('customerStatistics')}</CardTitle>
          <CardDescription>{t('customerStatisticsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div>
              <p className='text-sm text-gray-500'>{t('newCustomers')}</p>
              <p className='text-xl font-bold'>{customerStats.newCustomers}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>{t('returningCustomers')}</p>
              <p className='text-xl font-bold'>{customerStats.returningCustomers}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>{t('averageOrderFrequency')}</p>
              <p className='text-xl font-bold'>{customerStats.averageOrderFrequency}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('popularItems')}</CardTitle>
          <CardDescription>{t('popularItemsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('itemName')}</TableHead>
                <TableHead>{t('totalSold')}</TableHead>
                <TableHead>{t('revenue')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {popularItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.totalSold}</TableCell>
                  <TableCell>₪{item.revenue.toLocaleString()}</TableCell>
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
