import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/customer/HomePage';
import ShopPage from '@/pages/customer/ShopPage';
import CartPage from '@/pages/customer/CartPage';
import CheckoutPage from '@/pages/customer/CheckoutPage';
import AdminLayout from '@/layouts/AdminLayout';
import AdminProducts from '@/pages/admin/ProductsPage';
import AdminCoupons from '@/pages/admin/CouponsPage';
import AdminReports from '@/pages/admin/ReportsPage';
import AdminSettings from '@/pages/admin/SettingsPage';
import LoginPage from '@/pages/admin/LoginPage';
import ProductDetailsPage from './pages/customer/ProductDetailsPage';
import { CartProvider } from './contexts/CartContext';
import AdminDashboard from './pages/admin/DashboardPage';
import CarpenterLayout from './layouts/CarpenterLayout';
import CarpenterUnderwayOrders from './pages/carpenter/UnderwayOrders';
import CarpenterIncomingOrders from './pages/carpenter/IncomingOrders';
import CarpenterCompletedOrders from './pages/carpenter/CompletedOrders';
import CarpenterCancelledOrders from './pages/carpenter/CancelledOrders';
import NotFoundPage from './pages/customer/NotFoundPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <AuthProvider>
            <CartProvider>
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
            </CartProvider>
          </AuthProvider>
        </Router>
      </LanguageProvider>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
