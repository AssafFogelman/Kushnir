import { useState, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import { noRoundNumber } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useDropzone } from 'react-dropzone';
import { Product, productCategory } from '@/types/product';

const getDefaultProductData = (): Product => ({
  inceptionDate: new Date(),
  id: '',
  name: {
    he: '',
    en: '',
  },
  initialPrice: 0,
  price: 0,
  discountPercentage: 0,
  images: [''],
  categories: [],
  dimensions: {
    width: 0,
    height: 0,
    depth: 0,
  },
  material: {
    he: '',
    en: '',
  },
  description: {
    he: '',
    en: '',
  },
  shipmentFee: 0,
  estimatedCompletionTime: 7,
  shipmentTime: 3,
  inStock: true,
  isHidden: false,
  saleMethod: 'REGULAR',
});

// Mock data - replace with API call later
const mockProducts: Product[] = [
  {
    inceptionDate: new Date(),
    id: '1',
    name: {
      he: 'ארון ספרים אורן',
      en: 'Bookshelf made of oak',
    },
    initialPrice: 1200,
    price: 1200,
    discountPercentage: 0,
    images: ['/images/products/bookshelf.jpg'],
    categories: [
      {
        he: 'ספריות',
        en: 'Bookshelves',
      },
    ],
    saleMethod: 'REGULAR',
    dimensions: {
      width: 180,
      height: 40,
      depth: 200,
    },
    material: {
      he: 'אורן',
      en: 'Oak',
    },
    description: {
      he: 'ארון ספרים מעוצב מעץ אורן איכותי',
      en: 'Oak bookshelf made of oak',
    },
    shipmentFee: 0,
    estimatedCompletionTime: 7,
    shipmentTime: 3,
    inStock: true,
    isHidden: false,
  },
  {
    inceptionDate: new Date(),
    id: '2',
    name: {
      he: 'שולחן אוכל אלון',
      en: 'Dining table made of oak',
    },
    initialPrice: 2500,
    price: 2500,
    discountPercentage: 0,
    images: ['/images/products/dining-table.jpg'],
    categories: [
      {
        he: 'שולחנות אוכל',
        en: 'Dining tables',
      },
    ],
    dimensions: {
      width: 160,
      height: 90,
      depth: 75,
    },
    material: {
      he: 'אלון',
      en: 'Oak',
    },
    description: {
      he: 'שולחן אוכל מסורתי מעץ אלון',
      en: 'Dining table made of oak',
    },
    shipmentFee: 0,
    estimatedCompletionTime: 7,
    shipmentTime: 3,
    inStock: true,
    isHidden: false,
    saleMethod: 'REGULAR',
  },
];

const defaultCategories: productCategory[] = [
  { he: 'ספריות', en: 'Bookshelves' },
  { he: 'שולחנות אוכל', en: 'Dining tables' },
  { he: 'שולחנות', en: 'Tables' },
  { he: 'לגן', en: 'Garden' },
  { he: 'מזכוכית', en: 'Glass' },
  { he: 'כיסאות', en: 'Chairs' },
  { he: 'מיטות', en: 'Beds' },
  { he: 'גינון', en: 'Landscaping' },
  { he: 'ריהוט', en: 'furniture' },
];

const AdminProducts = () => {
  const { t, direction } = useLanguage();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [availableCategories, setAvailableCategories] =
    useState<productCategory[]>(defaultCategories);
  const [formData, setFormData] = useState<Product>(getDefaultProductData());

  const [costNoVAT, setYourCostNoVAT] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const [taxRate] = useState(18);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        setProducts(products.map(p => (p.id === editingProduct.id ? { ...p, ...formData } : p)));
      } else {
        setProducts(prev => [
          ...prev,
          {
            ...formData,
            id: (prev.length + 1).toString(),
          },
        ]);
      }

      setIsDialogOpen(false);
      setEditingProduct(null);
      setFormData(getDefaultProductData());
    } catch (error) {
      console.error('Error saving product:', error);
      // You might want to show an error message to the user here
    }
  };

  const FIELDS = {
    PROFIT_PERCENTAGE: 'PROFIT_PERCENTAGE',
    PRICE: 'PRICE',
  } as const;

  const fillOtherFields = (field: keyof typeof FIELDS, value: number) => {
    if (taxRate < 0) return;
    if (costNoVAT < 0) return;

    const costWithTax = (taxRate / 100 + 1) * costNoVAT;

    switch (field) {
      case FIELDS.PROFIT_PERCENTAGE:
        setFormData({
          ...formData,
          price: noRoundNumber(Math.round(costWithTax * (1 + value / 100))),
        });

        break;
      case FIELDS.PRICE:
        setProfitPercentage(100 * (value / costWithTax - 1));
        break;
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remainingSlots = 10 - previewImages.length;
      if (remainingSlots <= 0) {
        return;
      }

      const filesToProcess = acceptedFiles.slice(0, remainingSlots);
      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setPreviewImages(prev => [...prev, result]);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, result],
          }));
        };
        reader.readAsDataURL(file);
      });
    },
    [previewImages.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: true,
    maxFiles: 10,
  });

  const removeImage = (index: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
          <DialogContent dir='auto' className='text-start max-h-[90vh] flex flex-col'>
            <DialogHeader>
              <DialogTitle className='text-start'>
                {editingProduct ? t('adminProducts.editProduct') : t('adminProducts.addProduct')}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className='grid grid-cols-2 gap-4 [&>*]:rtl:text-right [&>*]:ltr:text-left overflow-y-auto pr-2'
            >
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.HebrewName')}
                </label>
                <Input
                  value={formData.name.he}
                  onChange={e =>
                    setFormData({ ...formData, name: { he: e.target.value, en: formData.name.en } })
                  }
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.englishName')}
                </label>
                <Input
                  value={formData.name.en}
                  onChange={e =>
                    setFormData({ ...formData, name: { he: formData.name.he, en: e.target.value } })
                  }
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.costNoVAT')}
                </label>
                <Input
                  type='number'
                  value={costNoVAT}
                  onChange={e => setYourCostNoVAT(parseInt(e.target.value))}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.taxRate') + ' (%)'}
                </label>
                <Input type='number' value={taxRate} required disabled />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.profitPercentage') + ' (%)'}
                </label>
                <div className='relative'>
                  <Input
                    type='number'
                    value={profitPercentage.toFixed(2)}
                    onChange={e => {
                      const value = parseFloat(e.target.value);
                      if (value < 0) {
                        setProfitPercentage(0);
                        return;
                      }
                      setProfitPercentage(value);
                      fillOtherFields(FIELDS.PROFIT_PERCENTAGE, value);
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>{t('adminProducts.price')}</label>
                <Input
                  type='number'
                  value={formData.price}
                  onChange={e => {
                    const value = noRoundNumber(parseInt(e.target.value));
                    if (value < 0) {
                      setFormData({
                        ...formData,
                        price: 0,
                      });
                      return;
                    }
                    setFormData({
                      ...formData,
                      price: value,
                    });
                    fillOtherFields(FIELDS.PRICE, value);
                  }}
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.initialPrice')}
                </label>
                <Input
                  type='number'
                  value={formData.initialPrice}
                  onChange={e => {
                    const value = noRoundNumber(parseInt(e.target.value));
                    if (value < 0) {
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
                  }}
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.productCategories')}
                </label>
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2'>
                    <select
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                      onChange={e => {
                        const selectedValue = e.target.value;
                        if (
                          selectedValue &&
                          !formData.categories.some(cat => cat.he === selectedValue)
                        ) {
                          const selectedCategory = availableCategories.find(
                            cat => cat.he === selectedValue
                          );
                          if (selectedCategory) {
                            setFormData({
                              ...formData,
                              categories: [...formData.categories, selectedCategory],
                            });
                          }
                        }
                        e.target.value = ''; // Reset the select
                      }}
                    >
                      <option value=''>{t('adminProducts.selectCategories')}</option>
                      {availableCategories
                        .filter(
                          cat => !formData.categories.some(selectedCat => selectedCat.he === cat.he)
                        )
                        .map(category => (
                          <option key={category.he} value={category.he}>
                            {category.he}
                          </option>
                        ))}
                    </select>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => {
                        const hebrewName = prompt(t('adminProducts.addNewCategoryHebrew'));
                        if (hebrewName) {
                          const englishName = prompt(t('adminProducts.addNewCategoryEnglish'));
                          if (englishName) {
                            const newCategoryObj = { he: hebrewName, en: englishName };
                            setAvailableCategories(prev => [...prev, newCategoryObj]);
                            setFormData({
                              ...formData,
                              categories: [...formData.categories, newCategoryObj],
                            });
                          }
                        }
                      }}
                    >
                      <Plus className='h-4 w-4' />
                      {t('adminProducts.add')}
                    </Button>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {formData.categories.map(category => (
                      <Badge
                        key={category.he}
                        variant='secondary'
                        className='flex items-center gap-1'
                      >
                        {category.he}
                        <button
                          type='button'
                          onClick={() => {
                            setFormData({
                              ...formData,
                              categories: formData.categories.filter(cat => cat.he !== category.he),
                            });
                          }}
                          className='ml-1 hover:text-destructive'
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.width') +
                    ' (' +
                    t('adminProducts.optional') +
                    ')' +
                    ' (' +
                    t('common.cm') +
                    ')'}
                </label>
                <Input
                  value={formData.dimensions?.width}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      dimensions: {
                        width: parseInt(e.target.value),
                        height: formData.dimensions?.height,
                        depth: formData.dimensions?.depth,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.height') +
                    ' (' +
                    t('adminProducts.optional') +
                    ')' +
                    ' (' +
                    t('common.cm') +
                    ')'}
                </label>
                <Input
                  value={formData.dimensions?.height}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      dimensions: {
                        width: formData.dimensions?.width,
                        height: parseInt(e.target.value),
                        depth: formData.dimensions?.depth,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.depth') +
                    ' (' +
                    t('adminProducts.optional') +
                    ')' +
                    ' (' +
                    t('common.cm') +
                    ')'}
                </label>
                <Input
                  value={formData.dimensions?.depth}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      dimensions: {
                        width: formData.dimensions?.width,
                        height: formData.dimensions?.height,
                        depth: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.material') + ' (' + t('adminProducts.optional') + ')'}
                </label>
                <Input
                  value={formData.material?.he || ''}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      material: {
                        he: e.target.value,
                        en: '', // We'll translate this automatically
                      },
                    })
                  }
                />
              </div>
              <div className='col-span-2'>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.hebrewDescription')}
                </label>
                <Textarea
                  value={formData.description?.he || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({
                      ...formData,
                      description: {
                        he: e.target.value,
                        en: '', // We'll translate this automatically
                      },
                    })
                  }
                  className='min-h-[6rem]'
                />
              </div>
              <div className='col-span-2'>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.englishDescription')}
                </label>
                <Textarea
                  value={formData.description?.en || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({
                      ...formData,
                      description: {
                        he: e.target.value,
                        en: '', // We'll translate this automatically
                      },
                    })
                  }
                  className='min-h-[6rem]'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.shipmentFee') + ' (' + t('common.shekel') + ')'}
                </label>
                <Input
                  type='number'
                  value={formData.shipmentFee}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      shipmentFee: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.estimatedCompletionTime') + ' (' + t('common.days') + ')'}
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
                  {t('adminProducts.estimatedDelivery') + ' (' + t('common.days') + ')'}
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
              <div className='col-span-2'>
                <label className='block text-sm font-medium mb-1'>
                  {t('adminProducts.images')} ({previewImages.length}/10)
                </label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors min-h-[16rem] ${
                    isDragActive
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  <input {...getInputProps()} required={previewImages.length === 0} />
                  {previewImages.length > 0 ? (
                    <div className='space-y-4'>
                      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {previewImages.map((image, index) => (
                          <div key={index} className='relative'>
                            <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className='w-full h-32 object-cover rounded-lg'
                            />
                            <button
                              type='button'
                              onClick={e => {
                                e.stopPropagation();
                                removeImage(index);
                              }}
                              className='absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90'
                            >
                              <Trash2 className='w-4 h-4' />
                            </button>
                          </div>
                        ))}
                      </div>
                      {previewImages.length < 10 && (
                        <div className='flex flex-col items-center gap-2'>
                          <Upload className='w-8 h-8 text-muted-foreground' />
                          <p className='text-sm text-muted-foreground'>
                            {isDragActive
                              ? t('adminProducts.dropImageHere')
                              : t('adminProducts.dragAndDropOrClick')}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {t('adminProducts.onlyJPG')}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='flex flex-col items-center gap-2 h-full justify-center'>
                      <Upload className='w-8 h-8 text-muted-foreground' />
                      <p className='text-sm text-muted-foreground'>
                        {isDragActive
                          ? t('adminProducts.dropImageHere')
                          : t('adminProducts.dragAndDropOrClick')}
                      </p>
                      <p className='text-xs text-muted-foreground'>{t('adminProducts.onlyJPG')}</p>
                    </div>
                  )}
                </div>
              </div>
            </form>
            <div className='mt-4 pt-4 border-t'>
              <Button type='submit' className='w-full'>
                {editingProduct ? t('adminProducts.update') : t('adminProducts.add')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
              {t('adminProducts.name')}
            </TableHead>
            <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
              {t('adminProducts.price')}
            </TableHead>
            <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
              {t('adminProducts.initialPrice')}
            </TableHead>
            <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
              {t('products.discount')}
            </TableHead>
            <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
              {t('adminProducts.category')}
            </TableHead>
            <TableHead className={direction === 'rtl' ? 'text-right' : 'text-left'}>
              {t('adminProducts.actions')}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.name.he}</TableCell>
              <TableCell>
                {product.initialPrice} {t('products.shekel')}
              </TableCell>
              <TableCell>
                {product.categories.map((cat: productCategory) => cat.he).join(', ')}
              </TableCell>
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
