import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Trash2 } from 'lucide-react';
import { TranslationKeys } from '@/lib/language-types';

interface Coupon {
  id: string;
  code: string;
  discount: number; // percentage
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const CouponsPage = () => {
  const { t } = useLanguage();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Coupon>>({
    code: '',
    discount: 0,
    startDate: '',
    endDate: '',
    isActive: true,
  });

  const handleDelete = (couponId: string) => {
    setCoupons(coupons.filter(c => c.id !== couponId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCoupons([
      ...coupons,
      {
        ...formData,
        id: Date.now().toString(),
      } as Coupon,
    ]);
    setIsDialogOpen(false);
    setFormData({
      code: '',
      discount: 0,
      startDate: '',
      endDate: '',
      isActive: true,
    });
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>{t('adminDashboard.manageCoupons')}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='w-4 h-4 mr-2' />
              {t('checkout.enterCouponCode')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('checkout.enterCouponCode')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>{t('checkout.couponCode')}</label>
                <Input
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('products.discount')} (%)
                </label>
                <Input
                  type='number'
                  value={formData.discount}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      discount: parseFloat(e.target.value),
                    })
                  }
                  min='0'
                  max='100'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('checkout.startDate' as TranslationKeys)}
                </label>
                <Input
                  type='date'
                  value={formData.startDate}
                  onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('checkout.endDate' as TranslationKeys)}
                </label>
                <Input
                  type='date'
                  value={formData.endDate}
                  onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
              <Button type='submit' className='w-full'>
                {t('checkout.apply')}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('checkout.couponCode')}</TableHead>
            <TableHead>{t('products.discount')}</TableHead>
            <TableHead>{t('checkout.startDate' as TranslationKeys)}</TableHead>
            <TableHead>{t('checkout.endDate' as TranslationKeys)}</TableHead>
            <TableHead>{t('products.inStock')}</TableHead>
            <TableHead>{t('products.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map(coupon => (
            <TableRow key={coupon.id}>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{coupon.discount}%</TableCell>
              <TableCell>{coupon.startDate}</TableCell>
              <TableCell>{coupon.endDate}</TableCell>
              <TableCell>
                {coupon.isActive ? t('products.inStock') : t('products.outOfStock')}
              </TableCell>
              <TableCell>
                <Button variant='outline' size='icon' onClick={() => handleDelete(coupon.id)}>
                  <Trash2 className='w-4 h-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CouponsPage;
