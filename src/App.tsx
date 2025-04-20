import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Suspense, lazy } from 'react';
import MainLayout from '@/layouts/MainLayout';
import ErrorBoundary from '@/components/ErrorBoundary';
import { CartProvider } from './contexts/CartContext';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/customer/HomePage'));
const ShopPage = lazy(() => import('@/pages/customer/ShopPage'));
const CartPage = lazy(() => import('@/pages/customer/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/customer/CheckoutPage'));
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));
const AdminProducts = lazy(() => import('@/pages/admin/ProductsPage'));
const AdminCoupons = lazy(() => import('@/pages/admin/CouponsPage'));
const AdminReports = lazy(() => import('@/pages/admin/ReportsPage'));
const AdminSettings = lazy(() => import('@/pages/admin/SettingsPage'));
const LoginPage = lazy(() => import('@/pages/admin/LoginPage'));
const ProductDetailsPage = lazy(() => import('./pages/customer/ProductDetailsPage'));
const AdminDashboard = lazy(() => import('./pages/admin/DashboardPage'));
const CarpenterLayout = lazy(() => import('./layouts/CarpenterLayout'));
const CarpenterUnderwayOrders = lazy(() => import('./pages/carpenter/UnderwayOrders'));
const CarpenterIncomingOrders = lazy(() => import('./pages/carpenter/IncomingOrders'));
const CarpenterCompletedOrders = lazy(() => import('./pages/carpenter/CompletedOrders'));
const CarpenterCancelledOrders = lazy(() => import('./pages/carpenter/CancelledOrders'));
const NotFoundPage = lazy(() => import('./pages/customer/NotFoundPage'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <AuthProvider>
            <CartProvider>
              <ErrorBoundary>
                <Suspense
                  fallback={
                    <div className='flex items-center justify-center min-h-screen'>
                      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
                    </div>
                  }
                >
                  <Routes>
                    {/* Public Routes */}
                    <Route element={<MainLayout />}>
                      <Route path='/' element={<HomePage />} />
                      <Route path='/shop' element={<ShopPage />} />
                      <Route path='/product/:id' element={<ProductDetailsPage />} />
                      <Route path='/cart' element={<CartPage />} />
                      <Route path='/checkout' element={<CheckoutPage />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path='/admin/login' element={<LoginPage />} />
                    <Route
                      path='/admin'
                      element={
                        <ProtectedRoute>
                          <AdminLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route path='products' element={<AdminProducts />} />
                      <Route path='coupons' element={<AdminCoupons />} />
                      <Route path='reports' element={<AdminReports />} />
                      <Route path='settings' element={<AdminSettings />} />
                    </Route>

                    {/* Carpenter Routes */}
                    <Route path='/carpenter' element={<CarpenterLayout />}>
                      <Route index element={<CarpenterUnderwayOrders />} />
                      <Route path='incoming' element={<CarpenterIncomingOrders />} />
                      <Route path='completed' element={<CarpenterCompletedOrders />} />
                      <Route path='cancelled' element={<CarpenterCancelledOrders />} />
                    </Route>

                    {/* 404 Route */}
                    <Route path='*' element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </CartProvider>
          </AuthProvider>
        </Router>
      </LanguageProvider>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
