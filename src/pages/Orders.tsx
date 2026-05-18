import { useShop } from '@/src/context/ShopContext';
import { useAuth } from '@/src/context/AuthContext';
import { orders as mockOrders, formatPrice } from '@/src/data/mockData';
import { ShoppingBag, ChevronRight, Package, Clock, CheckCircle2, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function Orders() {
  const { user } = useAuth();
  // In a real app, we'd filter by user.id and fetch from state
  const userOrders = mockOrders.filter(o => o.userId === user?.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={20} className="text-amber-500" />;
      case 'shipped': return <Truck size={20} className="text-blue-500" />;
      case 'delivered': return <CheckCircle2 size={20} className="text-green-500" />;
      default: return <Package size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-display font-black tracking-tighter mb-2">MY ORDERS</h1>
        <p className="text-gray-500">Track and manage your recent purchases</p>
      </div>

      {userOrders.length === 0 ? (
        <div className="bg-white rounded-[40px] p-12 text-center border-2 border-dashed border-gray-100 italic">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-300" />
          </div>
          <p className="text-gray-400 font-bold mb-6">No orders found yet</p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-3 bg-[#f59e0b] text-white px-10 py-4 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-amber-100 hover:bg-gray-900 transition-all uppercase"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {userOrders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-[35px] overflow-hidden hover:shadow-xl hover:shadow-gray-100 transition-all group">
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#fff7ed] rounded-2xl flex items-center justify-center text-[#f59e0b] font-black shrink-0">
                    {order.items.length > 1 ? `+${order.items.length}` : '01'}
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="font-black text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8">
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="font-black text-gray-900">{formatPrice(order.total)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-gray-50 px-5 py-2.5 rounded-2xl">
                    {getStatusIcon(order.status)}
                    <span className={cn(
                      "text-xs font-black uppercase tracking-widest",
                      order.status === 'delivered' ? "text-green-600" : 
                      order.status === 'pending' ? "text-amber-600" : "text-blue-600"
                    )}>
                      {order.status}
                    </span>
                  </div>

                  <Link 
                    to={`/tracking?id=${order.id}`}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#f59e0b] hover:gap-4 transition-all"
                  >
                    Track Order <ChevronRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="aspect-square bg-gray-50 rounded-2xl overflow-hidden group-hover:scale-95 transition-transform duration-500">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
