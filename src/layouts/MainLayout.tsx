import { Outlet } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import SkipLink from '@/components/SkipLink';
import { ARIA_LABELS, ROLE } from '@/lib/accessibility';

const MainLayout = () => {
  const { t } = useLanguage();

  return (
    <div className='min-h-screen flex flex-col'>
      <SkipLink />
      <header
        className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
        role='banner'
      >
        <div className='container flex h-14 items-center'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href='/' className='text-sm font-medium'>
                  {t('common.home')}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href='/shop' className='text-sm font-medium'>
                  {t('common.shop')}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href='/cart' className='text-sm font-medium'>
                  {t('common.cart')}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <LanguageSwitcher />
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
