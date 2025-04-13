import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Menu, X } from 'lucide-react';
import { mockProducts } from '@/mocks/mock-data';
import { TranslationKeys } from '@/lib/language-types';

interface CategoryDropdownProps {
  mobile?: boolean;
  onSelect?: () => void;
}

const CategoryDropdown = ({ mobile = false, onSelect }: CategoryDropdownProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get all unique categories from products
  const allCategories = Array.from(
    new Set(mockProducts.flatMap(product => product.categories))
  ).sort();

  const categories = [
    { value: 'all', label: t('products.allCategories' as TranslationKeys) },
    ...allCategories.map(category => ({
      value: category,
      label: t(`common.${category}` as TranslationKeys) || category,
    })),
  ];

  const selectedCategory = searchParams.get('category') || 'all';

  const handleCategorySelect = (category: string) => {
    setIsOpen(false);
    setSearchParams(prev => {
      if (category !== 'all') {
        prev.set('search', category);
      } else {
        prev.delete('search');
      }
      return prev;
    });
    navigate(`/shop?${searchParams.toString()}`);
    onSelect?.();
  };

  if (mobile) {
    return (
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => handleCategorySelect(category.value)}
              className={`w-full text-left px-4 py-2 text-sm rounded-md ${
                selectedCategory === category.value
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors'
        aria-expanded={isOpen}
        aria-haspopup='true'
      >
        {isOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
        <span>{t('products.categories' as TranslationKeys)}</span>
      </button>

      <div
        className={`absolute top-full left-0 mt-2 w-48 rounded-md bg-popover shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className='py-1'>
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => handleCategorySelect(category.value)}
              className={`w-full text-left px-4 py-2 text-sm ${
                selectedCategory === category.value
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
