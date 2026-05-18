import { useAdmin } from '@/src/context/AdminContext';
import { formatPrice } from '@/src/data/mockData';
import { Search, Filter, MoreVertical, Eye, CheckCircle2, Truck, Clock, XCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useAdmin();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-600';
      case 'shipped': return 'bg-blue-50 text-blue-600';
      case 'delivered': return 'bg-green-50 text-green-600';
      case 'cancelled': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-black tracking-tighter text-gray-900">CUSTOMER ORDERS</h1>
          <p className="text-gray-500 font-medium">Monitor and update marketplace order fulfillment</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 w-full md:w-96 group focus-within:bg-white focus-within:border-[#f59e0b] transition-all">
            <Search size={18} className="text-gray-400 group-focus-within:text-[#f59e0b]" />
            <input type="text" placeholder="Filter by Order ID or User..." className="bg-transparent border-none outline-none text-sm font-bold w-full" />
          </div>

          <div className="flex items-center gap-4">
             <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 italic">
                {['All', 'Pending', 'Shipped', 'Delivered'].map((tab) => (
                    <button key={tab} className={cn(
                        "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                        tab === 'All' ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                    )}>
                        {tab}
                    </button>
                ))}
             </div>
          </div>
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Order ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Products</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Total</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div>
                        <p className="font-black text-gray-900">{order.id}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-[10px] font-black text-gray-500 uppercase">
                            {order.userName.split(' ')[0][0]}{order.userName.split(' ')[1]?.[0]}
                        </div>
                        <p className="font-bold text-gray-900 text-sm">{order.userName}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex -space-x-3 overflow-hidden">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="inline-block h-10 w-10 rounded-xl ring-4 ring-white relative overflow-hidden bg-gray-50">
                                <img src={item.image} alt="" className="object-cover h-full w-full" />
                            </div>
                        ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-black text-gray-900">{formatPrice(order.total)}</p>
                    <p className="text-[10px] text-green-500 font-black uppercase tracking-widest mt-1">{order.paymentMethod}</p>
                  </td>
                  <td className="px-8 py-6">
                    <select 
                        defaultValue={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={cn(
                            "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-none outline-none appearance-none cursor-pointer text-center",
                            getStatusColor(order.status)
                        )}
                    >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2.5 text-gray-400 hover:text-[#f59e0b] bg-white rounded-xl border border-gray-100 shadow-sm transition-all">
                        <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Order Cards */}
        <div className="lg:hidden p-6 space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 shadow-sm">
              <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-gray-900 uppercase tracking-tighter text-lg">{order.id}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <select 
                        defaultValue={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={cn(
                            "px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest outline-none shadow-sm",
                            getStatusColor(order.status)
                        )}
                    >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
              </div>

              <div className="flex items-center justify-between py-3 border-y border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[10px] font-black text-gray-500">
                        {order.userName.split(' ')[0][0]}{order.userName.split(' ')[1]?.[0]}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 text-xs">{order.userName}</p>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Customer</p>
                    </div>
                  </div>
                  <div className="text-right">
                      <p className="font-black text-gray-900 text-sm">{formatPrice(order.total)}</p>
                      <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">{order.paymentMethod}</p>
                  </div>
              </div>

              <div className="flex items-center justify-between">
                  <div className="flex -space-x-3 overflow-hidden">
                    {order.items.slice(0, 4).map((item, idx) => (
                        <div key={idx} className="inline-block h-8 w-8 rounded-lg ring-2 ring-white relative overflow-hidden bg-gray-50">
                            <img src={item.image} alt="" className="object-cover h-full w-full" />
                        </div>
                    ))}
                    {order.items.length > 4 && (
                        <div className="h-8 w-8 rounded-lg ring-2 ring-white bg-gray-900 flex items-center justify-center text-[8px] font-black text-white">
                            +{order.items.length - 4}
                        </div>
                    )}
                  </div>
                  <button className="p-2 text-gray-400 bg-gray-50 rounded-lg hover:text-[#f59e0b] transition-colors">
                      <MoreVertical size={16} />
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
