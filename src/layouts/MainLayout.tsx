import { Outlet, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import Footer from '@/components/Footer';
import { useLanguage } from '@/hooks/useLanguage';
import SkipLink from '@/components/SkipLink';
import { ARIA_LABELS, ROLE } from '@/lib/accessibility';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import kushnirLogo from '@/assets/kushnir-logo.png';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryDropdown from '@/components/CategoryDropdown';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

const MainLayout = () => {
  const { t, direction } = useLanguage();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Update search query when URL changes
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam !== null) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/shop');
    }
    setIsSearchOpen(false);
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <SkipLink />
      <header
        className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
        role='banner'
      >
        <div className='container flex h-14 items-center'>
          <NavigationMenu className='w-full [&>div]:!max-w-none [&>div]:!w-full'>
            <NavigationMenuList
              className={`flex ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'} w-full justify-between items-center`}
            >
              <NavigationMenuItem>
                <NavigationMenuLink href='/' className='text-sm font-medium'>
                  <img src={kushnirLogo} alt='Kushnir Logo' className='h-8 w-auto' />
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className='flex-1 max-w-md mx-4'>
                <div className='flex items-center gap-2 w-full'>
                  {/* Category Dropdown - Mobile */}
                  <div className='md:hidden'>
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                      <SheetTrigger asChild>
                        <Button variant='ghost' size='icon'>
                          <Menu className='h-5 w-5' />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side={direction === 'rtl' ? 'right' : 'left'}>
                        <SheetTitle>{t('products.categories')}</SheetTitle>
                        <SheetDescription>{t('products.selectCategory')}</SheetDescription>
                        <CategoryDropdown mobile onSelect={() => setIsMenuOpen(false)} />
                      </SheetContent>
                    </Sheet>
                  </div>

                  {/* Category Dropdown - Desktop */}
                  <div className='hidden md:block'>
                    <CategoryDropdown />
                  </div>

                  {/* Search - Mobile */}
                  <div className='md:hidden'>
                    <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                      <SheetTrigger asChild>
                        <Button variant='ghost' size='icon'>
                          <Search className='h-5 w-5' />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side='top' className='pt-20'>
                        <SheetTitle>{t('products.search')}</SheetTitle>
                        <SheetDescription>{t('products.searchDescription')}</SheetDescription>
                        <form onSubmit={handleSearch} className='relative w-full mt-4'>
                          <Input
                            type='text'
                            placeholder={t('products.search')}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className='w-full pl-4 pr-10'
                            aria-label={ARIA_LABELS.forms.search}
                          />
                          <button
                            type='submit'
                            className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                            aria-label={ARIA_LABELS.forms.search}
                          >
                            <Search className='h-4 w-4' />
                          </button>
                        </form>
                      </SheetContent>
                    </Sheet>
                  </div>

                  {/* Search - Desktop */}
                  <div className='hidden md:block flex-1'>
                    <form onSubmit={handleSearch} className='relative'>
                      <Input
                        type='text'
                        placeholder={t('products.search')}
                        value={searchQuery}
                        onChange={e => {
                          setSearchQuery(e.target.value);
                          if (e.target.value.trim()) {
                            navigate(`/shop?search=${encodeURIComponent(e.target.value.trim())}`);
                          } else {
                            navigate('/shop');
                          }
                        }}
                        className='w-full pl-4 pr-10'
                        aria-label={ARIA_LABELS.forms.search}
                      />
                      <button
                        type='submit'
                        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                        aria-label={ARIA_LABELS.forms.search}
                      >
                        <Search className='h-4 w-4' />
                      </button>
                    </form>
                  </div>
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href='/cart' className='text-sm font-medium relative'>
                  <ShoppingCart className='h-5 w-5' />
                  {totalItems > 0 && (
                    <span
                      className={`absolute -top-2 ${direction === 'rtl' ? '-left-2' : '-right-2'} bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center`}
                    >
                      {totalItems}
                    </span>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <main
        id='main-content'
        className='flex-1'
        role={ROLE.MAIN}
        aria-label={ARIA_LABELS.navigation.main}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
