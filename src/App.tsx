import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import AdminLayout from "@/layouts/AdminLayout";
import AdminProducts from "@/pages/admin/ProductsPage";
import AdminCoupons from "@/pages/admin/Coupons";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { CartProvider } from "./contexts/CartContext";
import AdminDashboard from "./pages/admin/DashboardPage";
import CarpenterLayout from "./layouts/CarpenterLayout";
import CarpenterUnderwayOrders from "./pages/carpenter/UnderwayOrders";
import CarpenterIncomingOrders from "./pages/carpenter/IncomingOrders";
import CarpenterCompletedOrders from "./pages/carpenter/CompletedOrders";
import CarpenterCancelledOrders from "./pages/carpenter/CancelledOrders";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="coupons" element={<AdminCoupons />} />
              </Route>

              {/* Carpenter Routes */}
              <Route path="/carpenter" element={<CarpenterLayout />}>
                <Route index element={<CarpenterUnderwayOrders />} />
                <Route path="incoming" element={<CarpenterIncomingOrders />} />
                <Route
                  path="completed"
                  element={<CarpenterCompletedOrders />}
                />
                <Route
                  path="cancelled"
                  element={<CarpenterCancelledOrders />}
                />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
          <Toaster />
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
