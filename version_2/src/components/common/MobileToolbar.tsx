import { Home, Search, Heart, ShoppingBag, User, LayoutGrid } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useShop } from '@/src/context/ShopContext';
import { cn } from '@/src/lib/utils';

export default function MobileToolbar() {
  const { cart, wishlist } = useShop();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 bg-white/80 backdrop-blur-2xl border border-gray-100 flex justify-around items-center py-4 px-6 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[60]">
      <NavLink to="/shop" className={({ isActive }) => cn(
        "flex flex-col items-center gap-1 transition-all duration-300",
        isActive ? "text-[#f59e0b] scale-110" : "text-gray-400"
      )}>
        <LayoutGrid size={22} className="stroke-[2.5]" />
        <span className="text-[8px] font-black uppercase tracking-widest">Shop</span>
      </NavLink>

      <NavLink to="/orders" className={({ isActive }) => cn(
        "flex flex-col items-center gap-1 transition-all duration-300",
        isActive ? "text-[#f59e0b] scale-110" : "text-gray-400"
      )}>
        <ShoppingBag size={22} className="stroke-[2.5]" />
        <span className="text-[8px] font-black uppercase tracking-widest">Orders</span>
      </NavLink>

      <NavLink to="/wishlist" className={({ isActive }) => cn(
        "relative flex flex-col items-center gap-1 transition-all duration-300",
        isActive ? "text-[#f59e0b] scale-110" : "text-gray-400"
      )}>
        {({ isActive }) => (
          <>
            <Heart size={22} className={cn("stroke-[2.5]", isActive && "fill-[#f59e0b]")} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f59e0b] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full border border-white font-black">
                {wishlist.length}
              </span>
            )}
            <span className="text-[8px] font-black uppercase tracking-widest">Saved</span>
          </>
        )}
      </NavLink>

      <NavLink to="/cart" className={({ isActive }) => cn(
        "relative flex flex-col items-center gap-1 transition-all duration-300",
        isActive ? "text-[#f59e0b] scale-110" : "text-gray-400"
      )}>
        <ShoppingBag size={22} className="stroke-[2.5]" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full border border-white font-black">
            {cartCount}
          </span>
        )}
        <span className="text-[8px] font-black uppercase tracking-widest">Cart</span>
      </NavLink>

      <NavLink to="/auth" className={({ isActive }) => cn(
        "flex flex-col items-center gap-1 transition-all duration-300",
        isActive ? "text-[#f59e0b] scale-110" : "text-gray-400"
      )}>
        <User size={22} className="stroke-[2.5]" />
        <span className="text-[8px] font-black uppercase tracking-widest">User</span>
      </NavLink>
    </div>
  );
}
