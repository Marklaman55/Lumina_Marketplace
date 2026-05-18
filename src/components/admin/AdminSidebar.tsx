import { NavLink } from 'react-router-dom';
import { 
  Package, 
  PlusCircle, 
  ShoppingBag, 
  Users, 
  Tags, 
  CreditCard, 
  Settings, 
  LogOut,
  X,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { cn } from '@/src/lib/utils';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Products', icon: Package, href: '/admin/products' },
    { name: 'Add Product', icon: PlusCircle, href: '/admin/add-product' },
    { name: 'Orders', icon: ShoppingBag, href: '/admin/orders' },
    { name: 'Users', icon: Users, href: '/admin/users' },
    { name: 'Categories', icon: Tags, href: '/admin/categories' },
    { name: 'Payments', icon: CreditCard, href: '/admin/payments' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[70] lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 bottom-0 w-72 bg-white border-r border-gray-100 z-[80] transition-transform duration-300 transform lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f59e0b] rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                <LayoutDashboard size={24} />
              </div>
              <span className="text-xl font-display font-black tracking-tighter">LUMINA <span className="text-[#f59e0b]">ADMIN</span></span>
            </div>
            <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-gray-900">
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow px-4 mt-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold",
                      isActive 
                        ? "bg-[#f59e0b] text-white shadow-lg shadow-amber-100" 
                        : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <item.icon size={20} className={cn(
                        "transition-transform",
                        "group-hover:scale-110"
                    )} />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-6 border-t border-gray-50">
            <button 
              onClick={() => {
                logout();
                window.location.href = '/auth';
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 font-bold transition-all"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
