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
import { mockProducts, Product } from '@/mocks/mock-data';

const ShopPage = () => {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('nameAsc');

  // Get all unique categories from products
  const allCategories = Array.from(
    new Set(mockProducts.flatMap(product => product.categories))
  ).sort();

  const categories = [
    { value: 'all', label: t('products.allCategories') },
    ...allCategories.map(category => ({
      value: category,
      label: t(`common.${category}`) || category,
    })),
  ];

  const sortOptions = [
    { value: 'nameAsc', label: t('products.nameAsc') },
    { value: 'nameDesc', label: t('products.nameDesc') },
    { value: 'priceLowToHigh', label: t('products.priceLowToHigh') },
    { value: 'priceHighToLow', label: t('products.priceHighToLow') },
  ];

  useEffect(() => {
    let filteredProducts = [...mockProducts];
    const searchQuery = searchParams.get('search') || '';

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.categories.includes(selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product =>
          product.name[language].toLowerCase().includes(query) ||
          product.categories.some(category => category.toLowerCase().includes(query)) ||
          product.material?.[language]?.toLowerCase().includes(query) ||
          product.description?.[language]?.toLowerCase().includes(query)
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
  }, [selectedCategory, searchParams, sortBy, language]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name[language],
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
        <div className='flex gap-4 w-full md:w-auto'>
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
        <div className='text-center py-8'>
          <p className='text-lg text-gray-500'>{t('products.noProducts')}</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {products.map(product => (
            <div key={product.id} className='h-full'>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
