import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-grow flex flex-col lg:pl-72">
        {/* Admin Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 min-w-[300px]">
              <Search size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search orders, products..." 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-xl border border-gray-100">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 font-bold border border-amber-200">
                {user?.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 md:p-10 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
