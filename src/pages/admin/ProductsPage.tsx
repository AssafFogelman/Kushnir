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
import { Plus, Pencil, Trash2 } from 'lucide-react';

const DEFAULT_FIRST_WEEK_PRICE_PERCENTAGE = Math.random() * 10 + 20; // between 20% and 30%

interface Product {
  inceptionDate: Date;
  id: string;
  name: string;
  initialPrice: number;
  currentPrice: number;
  discountPercentage: number;
  images: string[];
  category: string;
  dimensions?: string;
  material?: string;
  description?: string;
  shipmentFee: number;
  estimatedCompletionTime: number;
  shipmentTime?: number;
  inStock: boolean;
  isHidden: boolean;
  // defaultValues?: {
  //   completionTime: number;
  //   shippingTime: number;
  //   shippingFee: number;
  // };
}

// Mock data - replace with API call later
const mockProducts: Product[] = [
  {
    inceptionDate: new Date(),
    id: '1',
    name: 'ארון ספרים אורן',
    initialPrice: 1200,
    currentPrice: 1200,
    discountPercentage: 0,
    images: ['/images/products/bookshelf.jpg'],
    category: 'furniture',
    dimensions: '180x40x200 ס״מ',
    material: 'אורן',
    description: 'ארון ספרים מעוצב מעץ אורן איכותי',
    shipmentFee: 0,
    estimatedCompletionTime: 7,
    shipmentTime: 3,
    inStock: true,
    isHidden: false,
  },
  {
    inceptionDate: new Date(),
    id: '2',
    name: 'שולחן אוכל אלון',
    initialPrice: 2500,
    currentPrice: 2500,
    discountPercentage: 0,
    images: ['/images/products/dining-table.jpg'],
    category: 'furniture',
    dimensions: '160x90x75 ס״מ',
    material: 'אלון',
    description: 'שולחן אוכל מסורתי מעץ אלון',
    shipmentFee: 0,
    estimatedCompletionTime: 7,
    shipmentTime: 3,
    inStock: true,
    isHidden: false,
  },
];

const AdminProducts = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product>({
    inceptionDate: new Date(),
    id: '',
    name: '',
    initialPrice: 0,
    currentPrice: 0,
    discountPercentage: 0,
    images: [''],
    category: 'furniture',
    dimensions: '',
    material: '',
    description: '',
    shipmentFee: 0,
    estimatedCompletionTime: 7,
    shipmentTime: 3,
    inStock: true,
    isHidden: false,
  });

  const [yourCostNoVAT, setYourCostNoVAT] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const [firstWeekPriceRaisePercentage, setFirstWeekPriceRaisePercentage] = useState(
    DEFAULT_FIRST_WEEK_PRICE_PERCENTAGE
  ); //1-100
  const [taxRate, setTaxRate] = useState(18);
  const [customerPrice, setCustomerPrice] = useState(0);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => (p.id === editingProduct.id ? { ...p, ...formData } : p)));
    } else {
      setProducts([
        ...products,
        {
          ...formData,
          id: Date.now().toString(),
        } as Product,
      ]);
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData({
      inceptionDate: new Date(),
      id: '',
      name: '',
      initialPrice: 0,
      currentPrice: 0,
      discountPercentage: 0,
      images: [''],
      category: 'furniture',
      dimensions: '',
      material: '',
      description: '',
      shipmentFee: 0,
      estimatedCompletionTime: 7,
      shipmentTime: 3,
      inStock: true,
      isHidden: false,
    });
  };

  const FIELDS = {
    PROFIT_PERCENTAGE: 'PROFIT_PERCENTAGE',
    CUSTOMER_PRICE: 'CUSTOMER_PRICE',
    INITIAL_PRICE_RAISE_PERCENTAGE: 'INITIAL_PRICE_RAISE_PERCENTAGE',
    DISCOUNT_PERCENTAGE: 'DISCOUNT_PERCENTAGE',
    INITIAL_PRICE: 'INITIAL_PRICE',
  } as const;

  const fillOtherFields = (field: keyof typeof FIELDS, value: number) => {
    if (taxRate < 0) return;
    if (yourCostNoVAT < 0) return;
    
    const costWithTax = (taxRate/100 +1) * yourCostNoVAT;

    switch (field) {
      case FIELDS.PROFIT_PERCENTAGE:
        setFormData({
          ...formData,
          currentPrice: costWithTax * (1 + value / 100),
        });  
        if (formData.discountPercentage > 0) {
          setFormData({...formData, initialPrice: ?});
          setFirstWeekPriceRaisePercentage(?);          
        }
        if (firstWeekPriceRaisePercentage > 0) {
          setFormData({...formData, initialPrice: ?});
          setFormData({...formData, discountPercentage: ?});
        }
        if (formData.initialPrice > 0) {
          setFirstWeekPriceRaisePercentage(?);          
          setFormData({...formData, discountPercentage: ?});
        }
        break;
      case FIELDS.INITIAL_PRICE:
        setProfitPercentage(100 * (value / costWithTax - 1));
        if (formData.discountPercentage > 0) {
          setFormData({...formData, initialPrice: ?});
          setFirstWeekPriceRaisePercentage(?);          
        }
        if (firstWeekPriceRaisePercentage > 0) {
          setFormData({...formData, initialPrice: ?});
          setFormData({...formData, discountPercentage: ?});
        }
        if (formData.initialPrice > 0) {
          setFirstWeekPriceRaisePercentage(?);          
          setFormData({...formData, discountPercentage: ?});
        }
        break;
      case FIELDS.INITIAL_PRICE_RAISE_PERCENTAGE:
        setFormData({...formData, discountPercentage: ?});
        if(profitPercentage > 0) {
          setFormData({...formData, initialPrice: ?});
        } //we don't need to check if there is a current price because when you enter it, the profit percentage will also be determined.
        //and we can't know the initial price if we don't have either the current price or the profit percentage.
        break;
      case FIELDS.DISCOUNT_PERCENTAGE:
      setFirstWeekPriceRaisePercentage(?);
      if(profitPercentage > 0) {
        setFormData({...formData, initialPrice: ?});
      }//we don't need to check if there is a current price because when you enter it, the profit percentage will also be determined.
        //and we can't know the initial price if we don't have either the current price or the profit percentage.
      break;
        
    }
  };
  const setInitialPrice = () => {
    const initialPrice =
      yourCostNoVAT *
      (1 + profitPercentage / 100) *
      (1 + taxRate / 100) *
      (1 + firstWeekPriceRaisePercentage / 100);
    return initialPrice;
  };
  const calculateDiscountRate = (firstWeekPricePercentage: number) => {
    if (firstWeekPricePercentage === -1) {
      return 0;
    }
    const discountRate = 1 - 10000 / (1 + firstWeekPricePercentage);
    return discountRate;
  };

  const calculateFirstPriceRisePercentage = (discountRate: number) => {
    if (discountRate === 1) {
      return 0;
    }
    const firstPriceRisePercentage = 10000 / (1 - discountRate);
    return firstPriceRisePercentage;
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>{t('adminProducts.allProducts')}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className='w-4 h-4 mr-2' />
              {t('adminProducts.addProduct')}
            </Button>
          </DialogTrigger>
          <DialogContent dir='auto' className='text-start'>
            <DialogHeader>
              <DialogTitle className='text-start'>
                {editingProduct ? t('adminProducts.editProduct') : t('adminProducts.addProduct')}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className='grid grid-cols-2 gap-4 [&>*]:rtl:text-right [&>*]:ltr:text-left'
            >
              <div>
                <label className='block text-sm font-medium mb-1'>{t('adminProducts.name')}</label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.yourCostNoVAT')}
                </label>
                <Input
                  type='number'
                  value={yourCostNoVAT}
                  onChange={e => setYourCostNoVAT(parseFloat(e.target.value))}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.profitPercentage')}
                </label>
                <Input
                  type='number'
                  value={profitPercentage}
                  onChange={e => setProfitPercentage(parseFloat(e.target.value))}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.firstWeekPriceRaisePercentage')}
                </label>
                <Input
                  type='number'
                  value={firstWeekPriceRaisePercentage}
                  onChange={e => {
                    const value = parseFloat(e.target.value);
                    if (value <= 0) {
                      setFirstWeekPriceRaisePercentage(0);
                      return;
                    }
                    setFirstWeekPriceRaisePercentage(value);
                    setDiscountRate(calculateDiscountRate(value));
                  }}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.taxRate')}
                </label>
                <Input type='number' value={taxRate} required disabled />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.firstWeekPrice')}
                </label>
                <Input
                  type='number'
                  value={formData.initialPrice}
                  onChange={e => {
                    const value = parseFloat(e.target.value);
                    if (value <= 0) {
                      setFormData({
                        ...formData,
                        initialPrice: 0,
                      });
                      return;
                    }
                    setFormData({
                      ...formData,
                      initialPrice: value,
                    });
                    if (yourCostNoVAT > 0 && profitPercentage > 0 && taxRate > 0) {
                      if (firstWeekPriceRaisePercentage > 0) {
                        setDiscountRate(calculateDiscountRate(firstWeekPriceRaisePercentage));
                        setCustomerPrice(value / (firstWeekPriceRaisePercentage / 100 + 1));
                        return;
                      }
                      if (discountRate > 0) {
                        setFirstWeekPriceRaisePercentage(
                          calculateFirstPriceRisePercentage(discountRate)
                        );
                        setCustomerPrice(value * (1 - discountRate / 100));
                        return;
                      }
                      if (customerPrice > 0) {
                        setFirstWeekPriceRaisePercentage(100 * (value / customerPrice - 1));
                        setDiscountRate(100 * (1 - customerPrice / value));
                      }
                    }
                  }}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.customerPrice')}
                </label>
                <Input
                  type='number'
                  value={customerPrice}
                  onChange={e => {
                    const value = parseFloat(e.target.value);
                    if (value <= 0) {
                      setCustomerPrice(0);
                      return;
                    }
                    setCustomerPrice(value);
                    if (yourCostNoVAT > 0 && profitPercentage > 0 && taxRate > 0) {
                      if (firstWeekPriceRaisePercentage > 0) {
                        setDiscountRate(calculateDiscountRate(firstWeekPriceRaisePercentage));
                        setFormData({
                          ...formData,
                          initialPrice: value * (firstWeekPriceRaisePercentage / 100 + 1),
                        });
                        return;
                      }
                      if (discountRate > 0) {
                        setFirstWeekPriceRaisePercentage(
                          calculateFirstPriceRisePercentage(discountRate)
                        );
                        setFormData({
                          ...formData,
                          initialPrice: value / (1 - discountRate / 100),
                        });
                        return;
                      }
                      if (formData.initialPrice && formData.initialPrice > 0) {
                        setFirstWeekPriceRaisePercentage(100 * (formData.initialPrice / value - 1));
                        setDiscountRate(100 * (1 - value / formData.initialPrice));
                      }
                    }
                  }}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.images')}
                </label>
                <Input
                  value={formData.images?.[0] || ''}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      images: [e.target.value],
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.categories')}
                </label>
                <Input
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.dimensions')}
                </label>
                <Input
                  value={formData.dimensions}
                  onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.material')}
                </label>
                <Input
                  value={formData.material}
                  onChange={e => setFormData({ ...formData, material: e.target.value })}
                />
              </div>
              <div className='col-span-2'>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.description')}
                </label>
                <Input
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.shipping')}
                </label>
                <Input
                  type='number'
                  value={formData.shipmentFee}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      shipmentFee: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.estimatedDelivery')}
                </label>
                <Input
                  type='number'
                  value={formData.estimatedCompletionTime}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      estimatedCompletionTime: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.estimatedDelivery')}
                </label>
                <Input
                  type='number'
                  value={formData.shipmentTime}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      shipmentTime: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className='flex items-center gap-8'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    {t('adminProducts.inStock')}
                  </label>
                  <Input
                    type='checkbox'
                    checked={formData.inStock}
                    onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    {t('adminProducts.isHidden')}
                  </label>
                  <Input
                    type='checkbox'
                    checked={formData.isHidden}
                    onChange={e => setFormData({ ...formData, isHidden: e.target.checked })}
                  />
                </div>
              </div>
              <Button type='submit' className='col-span-2 mt-4'>
                {editingProduct ? t('adminProducts.update') : t('adminProducts.add')}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-right'>{t('adminProducts.name')}</TableHead>
            <TableHead className='text-right'>{t('adminProducts.currentPrice')}</TableHead>
            <TableHead className='text-right'>{t('adminProducts.initialPrice')}</TableHead>
            <TableHead className='text-right'>{t('adminProducts.discountPercentage')}</TableHead>
            <TableHead className='text-right'>{t('adminProducts.category')}</TableHead>
            <TableHead className='text-right'>{t('adminProducts.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {product.initialPrice} {t('shekel')}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <Button variant='outline' size='icon' onClick={() => handleEdit(product)}>
                    <Pencil className='w-4 h-4' />
                  </Button>
                  <Button variant='outline' size='icon' onClick={() => handleDelete(product.id)}>
                    <Trash2 className='w-4 h-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminProducts;
