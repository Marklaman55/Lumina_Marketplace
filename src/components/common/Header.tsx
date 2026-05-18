import { useState } from 'react';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  ChevronDown, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  LayoutGrid,
  LogOut,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useShop } from '@/src/context/ShopContext';
import { useAuth } from '@/src/context/AuthContext';
import { formatPrice } from '@/src/data/mockData';

export default function Header({ cartCount, onCategorySelect }: { cartCount: number, onCategorySelect: (category: string) => void }) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { wishlist, cart } = useShop();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Deals', href: '/#deals' },
  ];

  const handleCategoryClick = (cat: string) => {
    onCategorySelect(cat);
    setIsCategoryOpen(false);
    navigate('/');
    setTimeout(() => {
        document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="w-full sticky top-0 z-[60] bg-white">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-white/5 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-[10px] sm:text-xs font-black text-white/60 uppercase tracking-widest">
          <div className="flex items-center space-x-6">
             <div className="flex items-center gap-2">
                <span className="text-[#f59e0b] px-1.5 py-0.5 border border-[#f59e0b] rounded text-[8px] animate-pulse">LIVE</span>
                <span>Marketplace updates every minute</span>
             </div>
          </div>
          <div className="flex items-center space-x-6">
             <Link to="/auth" className="hover:text-[#f59e0b] transition-colors">Become a Seller</Link>
             <span className="text-white/10">|</span>
             <Link to="/wishlist" className="hover:text-[#f59e0b] transition-colors flex items-center gap-1">
                <Heart size={14} className="text-red-400" />
                Wishlist ({wishlist.length})
             </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-4 md:py-6 border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter cursor-pointer">
            <span className="bg-[#f59e0b] text-white p-2 rounded-xl shadow-lg shadow-amber-100">LM</span>
            <span className="text-gray-900 italic hidden sm:inline">LUMINA</span>
          </Link>

          {/* Search Bar - Desktop Only */}
          <div className="hidden lg:flex flex-1 w-full max-w-xl mx-8">
            <div className="relative w-full group">
              <input 
                type="text" 
                placeholder="Find Kenyan treasures..." 
                className="w-full bg-[#f8f9fa] border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-2xl py-3 px-6 pr-12 transition-all outline-none font-bold text-sm"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f59e0b] transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* User Account */}
            <div className="relative group">
               <button 
                  onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : navigate('/auth')}
                  className="flex items-center gap-3 cursor-pointer group"
               >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#fff7ed] rounded-2xl flex items-center justify-center group-hover:bg-[#f59e0b] transition-all duration-300">
                    <User size={22} className="text-gray-700 group-hover:text-white transition-colors" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{user ? 'Greetings' : 'Sign In'}</p>
                    <p className="font-black text-gray-900 text-sm">{user ? user.name.split(' ')[0] : 'Account'}</p>
                  </div>
               </button>

               <AnimatePresence>
                  {isUserMenuOpen && user && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl p-4 border border-gray-100"
                    >
                        <div className="pb-4 mb-4 border-b border-gray-50 flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#f59e0b] rounded-full flex items-center justify-center text-white font-black">{user.name[0]}</div>
                            <div>
                                <p className="font-black text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            </div>
                        </div>
                        <nav className="space-y-1">
                            {isAdmin && (
                                <Link to="/admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#fff7ed] hover:text-[#f59e0b] transition-all font-bold text-sm">
                                    <LayoutDashboard size={18} /> Admin Panel
                                </Link>
                            )}
                            <Link to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#fff7ed] hover:text-[#f59e0b] transition-all font-bold text-sm">
                                <Settings size={18} /> Settings
                            </Link>
                            <button 
                                onClick={logout}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-500 transition-all font-bold text-sm"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </nav>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
            
            {/* Wishlist Link */}
            <Link to="/wishlist" className="relative group hidden sm:block">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-red-50 transition-all duration-300">
                <Heart size={22} className="text-gray-700 group-hover:text-red-500 transition-colors" />
              </div>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                   {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link to="/cart" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#fff7ed] rounded-2xl flex items-center justify-center group-hover:bg-[#f59e0b] transition-all duration-300">
                    <ShoppingBag size={22} className="text-gray-700 group-hover:text-white transition-colors" />
                </div>
                {cartCount > 0 && (
                  <motion.span 
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 bg-[#f59e0b] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Cart</p>
                <p className="font-black text-gray-900 text-sm">{formatPrice(cartTotal)}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation - Desktop Only */}
      <div className="bg-white border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4 flex items-center">
          {/* Categories Button */}
          <div className="relative mr-12 py-3">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="bg-[#f59e0b] text-white flex items-center gap-4 px-10 py-3.5 font-black text-sm tracking-[0.15em] rounded-2xl shadow-xl shadow-amber-50 group hover:bg-gray-900 transition-all"
            >
              <LayoutGrid size={20} className="group-hover:rotate-12 transition-transform" />
              ALL DEPARTMENTS
              <ChevronDown size={18} className={cn("transition-transform duration-500", isCategoryOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 5 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute top-full left-0 w-72 bg-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] z-[60] border border-gray-100 rounded-[35px] p-6 overflow-hidden mt-2"
                >
                  <ul className="space-y-1">
                    {['Fashion', 'Electronics', 'Home & Living', 'Smart Gadgets', 'Beauty & Health'].map((cat) => (
                      <li 
                        key={cat} 
                        onClick={() => handleCategoryClick(cat)}
                        className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[#fff7ed] cursor-pointer transition-all"
                      >
                        <span className="font-bold text-gray-700 group-hover:text-[#f59e0b] transition-colors">{cat}</span>
                        <ChevronDown size={14} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all text-[#f59e0b]" />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Main Menu */}
          <nav className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                //@ts-ignore
                to={link.href} 
                className="font-black text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-[#f59e0b] py-6 transition-all relative group"
              >
                {link.name}
                <span className="absolute bottom-4 left-0 w-0 h-1 bg-[#f59e0b] rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden lg:block">
            <div className="flex items-center gap-3 bg-[#f8f9fa] px-6 py-2.5 rounded-full border border-gray-100">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em]">Free Delivery from</span>
               <span className="text-sm font-black text-[#f59e0b]">KES 5,000</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
