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
        <h1 className='text-2xl font-bold'>{t('coupons')}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='w-4 h-4 mr-2' />
              {t('addCoupon')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('addCoupon')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>{t('couponCode')}</label>
                <Input
                  value={formData.code}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>{t('discount')} (%)</label>
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
                <label className='block text-sm font-medium mb-1'>{t('startDate')}</label>
                <Input
                  type='date'
                  value={formData.startDate}
                  onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>{t('endDate')}</label>
                <Input
                  type='date'
                  value={formData.endDate}
                  onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
              <Button type='submit' className='w-full'>
                {t('add')}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('code')}</TableHead>
            <TableHead>{t('discount')}</TableHead>
            <TableHead>{t('startDate')}</TableHead>
            <TableHead>{t('endDate')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map(coupon => (
            <TableRow key={coupon.id}>
              <TableCell>{coupon.code}</TableCell>
              <TableCell>{coupon.discount}%</TableCell>
              <TableCell>{coupon.startDate}</TableCell>
              <TableCell>{coupon.endDate}</TableCell>
              <TableCell>{coupon.isActive ? t('active') : t('inactive')}</TableCell>
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
