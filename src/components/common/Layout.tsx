import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileToolbar from './MobileToolbar';
import CartNotification from '../CartNotification';
import { useShop } from '@/src/context/ShopContext';
import { useAuth } from '@/src/context/AuthContext';

export default function Layout({ onCategorySelect }: { onCategorySelect: (cat: string) => void }) {
  const { cart } = useShop();
  const { isAdmin } = useAuth();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header cartCount={cartCount} onCategorySelect={onCategorySelect} />
      
      <main className="flex-grow pb-20 md:pb-0">
        <Outlet />
      </main>

      <Footer />
      {!isAdmin && <MobileToolbar />}
      <CartNotification />
    </div>
  );
}
