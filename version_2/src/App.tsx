import { useState, ReactNode, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import { useIsMobile } from './hooks/useMediaQuery';

// Layouts
import UserLayout from './components/common/Layout';
import AdminLayout from './components/admin/AdminLayout';

// User Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Tracking from './pages/Tracking';
import PaymentDetails from './pages/PaymentDetails';
import Auth from './pages/Auth';

// Admin Pages
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminPayments from './pages/admin/Payments';
import AdminCategories from './pages/admin/Categories';
import AdminAddProduct from './pages/admin/AddProduct';
import AdminEditProduct from './pages/admin/EditProduct';
import AdminSettings from './pages/admin/Settings';

function ProtectedRoute({ children, adminOnly = false }: { children: ReactNode, adminOnly?: boolean }) {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/auth" state={{ from: location }} />;
  if (adminOnly && !isAdmin) return <Navigate to="/shop" />;
  if (!adminOnly && isAdmin && location.pathname.startsWith('/shop')) return <Navigate to="/admin/orders" />;
  
  return <>{children}</>;
}

function RoleRedirect({ selectedCategory, setSelectedCategory }: { selectedCategory: string, setSelectedCategory: (cat: string) => void }) {
  const { user, isAdmin } = useAuth();
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <Navigate to="/shop" replace />;
  }

  if (!user) return <Home selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
  return isAdmin ? <Navigate to="/admin/orders" /> : <Navigate to="/shop" />;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <AuthProvider>
      <AdminProvider>
        <ShopProvider>
          <BrowserRouter>
            <Routes>
              {/* Public/User Routes */}
              <Route path="/" element={<UserLayout onCategorySelect={setSelectedCategory} />}>
                <Route index element={<RoleRedirect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} />
                <Route path="shop" element={<Shop />} />
                <Route path="cart" element={<Cart />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="tracking" element={<ProtectedRoute><Tracking /></ProtectedRoute>} />
                <Route path="payment-details" element={<ProtectedRoute><PaymentDetails /></ProtectedRoute>} />
                <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/admin/orders" />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="add-product" element={<AdminAddProduct />} />
                <Route path="edit-product/:id" element={<AdminEditProduct />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </BrowserRouter>
        </ShopProvider>
      </AdminProvider>
    </AuthProvider>
  );
}
