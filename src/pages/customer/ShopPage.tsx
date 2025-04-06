import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useCart } from '@/hooks/useCart';
import ProductCard from '@/components/ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { mockProducts, Product } from '@/lib/mock-data';

const ShopPage = () => {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('nameAsc');

  const categories = [
    { value: 'all', label: t('products.allCategories') },
    { value: 'boards', label: t('common.boards') },
    { value: 'beams', label: t('common.beams') },
    { value: 'furniture', label: t('common.furniture') },
  ];

  const sortOptions = [
    { value: 'nameAsc', label: t('products.nameAsc') },
    { value: 'nameDesc', label: t('products.nameDesc') },
    { value: 'priceLowToHigh', label: t('products.priceLowToHigh') },
    { value: 'priceHighToLow', label: t('products.priceHighToLow') },
  ];

  useEffect(() => {
    let filteredProducts = [...mockProducts];

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product =>
        product.name[language].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'nameAsc':
          return a.name[language].localeCompare(b.name[language]);
        case 'nameDesc':
          return b.name[language].localeCompare(a.name[language]);
        case 'priceLowToHigh':
          return a.price - b.price;
        case 'priceHighToLow':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setProducts(filteredProducts);
  }, [selectedCategory, searchQuery, sortBy, language]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name[language],
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
        <div className='w-full md:w-64'>
          <Input
            type='text'
            placeholder={t('products.search')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='flex gap-4 w-full md:w-auto'>
          <Select
            value={selectedCategory}
            onValueChange={(value: string) => {
              setSelectedCategory(value);
              setSearchParams({ category: value });
            }}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder={t('products.filterBy')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder={t('products.sortBy')} />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className='text-center py-12'>
          <p className='text-lg text-muted-foreground'>{t('products.noProducts')}</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
