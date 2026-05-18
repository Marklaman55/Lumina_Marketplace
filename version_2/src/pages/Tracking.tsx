import { useSearchParams, Link } from 'react-router-dom';
import { orders as mockOrders, formatPrice } from '@/src/data/mockData';
import { CheckCircle2, Circle, Truck, Package, MapPin, Phone, ArrowLeft, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Tracking() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  
  // Simulation: find order
  const order = mockOrders.find(o => o.id === orderId) || mockOrders[0];

  const steps = [
    { label: 'Order Confirmed', icon: CheckCircle2, completed: true, date: 'Nov 18, 2023 - 10:20 AM' },
    { label: 'Processing', icon: Clock, completed: true, date: 'Nov 18, 2023 - 2:45 PM' },
    { label: 'Shipped', icon: Truck, completed: order.status !== 'pending', date: order.status !== 'pending' ? 'Nov 19, 2023 - 09:15 AM' : 'Expected soon' },
    { label: 'Out for Delivery', icon: MapPin, completed: order.status === 'delivered', date: order.status === 'delivered' ? 'Nov 20, 2023 - 11:30 AM' : 'In transit' },
    { label: 'Delivered', icon: CheckCircle2, completed: order.status === 'delivered', date: order.status === 'delivered' ? 'Nov 20, 2023 - 1:45 PM' : 'Expected Nov 21' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link 
        to="/orders" 
        className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Orders
      </Link>

      <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-100 overflow-hidden border border-gray-50">
        {/* Header */}
        <div className="bg-gray-900 p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <p className="text-[#f59e0b] font-black uppercase tracking-[0.2em] text-xs mb-2">Track your package</p>
                <h1 className="text-3xl font-display font-black tracking-tighter">Order #{order.id}</h1>
            </div>
            <div className="flex flex-col items-end">
                <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">Expected Delivery</p>
                <p className="text-xl font-black">Nov 21, 2023</p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
            {/* Timeline */}
            <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                
                <div className="space-y-12 relative">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex gap-8 group">
                            <div className={cn(
                                "relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                step.completed ? "bg-[#f59e0b] text-white shadow-lg shadow-amber-100" : "bg-gray-50 text-gray-300"
                            )}>
                                <step.icon size={22} className={cn(step.completed && "animate-pulse")} />
                            </div>
                            <div>
                                <h3 className={cn(
                                    "font-black tracking-tight",
                                    step.completed ? "text-gray-900" : "text-gray-300"
                                )}>{step.label}</h3>
                                <p className="text-sm text-gray-400 font-medium">{step.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-16 pt-12 border-t border-gray-50">
                <div className="bg-gray-50 p-8 rounded-[35px] border border-gray-100">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#f59e0b] mb-4">Delivery Address</h4>
                    <p className="font-bold text-gray-900 leading-relaxed">
                        John Doe<br />
                        Westlands Plaza, Office 402<br />
                        Waiyaki Way, Nairobi<br />
                        Kenya, 00100
                    </p>
                    <div className="flex items-center gap-3 mt-4 text-sm font-bold text-gray-500">
                        <Phone size={16} /> +254 712 345 678
                    </div>
                </div>

                <div className="bg-[#fff7ed] p-8 rounded-[35px] border border-amber-50">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#f59e0b] mb-4">Package Summary</h4>
                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <img src={item.image} alt="" className="w-10 h-10 object-cover rounded-lg" />
                                    <span className="text-sm font-black text-gray-900 line-clamp-1">{item.title}</span>
                                </div>
                                <span className="text-xs font-black text-gray-400">x{item.quantity}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-between items-center pt-4 border-t border-amber-100">
                        <span className="text-xs font-black text-[#f59e0b] uppercase tracking-widest">Total Paid</span>
                        <span className="text-lg font-black text-gray-900">{formatPrice(order.total)}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
