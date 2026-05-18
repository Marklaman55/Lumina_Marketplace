import { useAdmin } from '@/src/context/AdminContext';
import { formatPrice } from '@/src/data/mockData';
import { Search, CreditCard, Download, ExternalLink, Filter, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function AdminPayments() {
  const { payments } = useAdmin();

  const stats = [
    { label: 'Total Revenue', value: 'KES 2,450,000', icon: DollarSign, trend: '+12.5%', isUp: true, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'M-Pesa Collections', value: 'KES 1,890,000', icon: TrendingUp, trend: '+8.2%', isUp: true, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Card Payments', value: 'KES 560,000', icon: CreditCard, trend: '-2.4%', isUp: false, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-black tracking-tighter text-gray-900">PAYMENT RECORDS</h1>
          <p className="text-gray-500 font-medium">Verify and audit all marketplace transactions</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-black text-sm tracking-widest shadow-xl shadow-gray-200 hover:bg-[#f59e0b] transition-all uppercase">
          <Download size={18} /> Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group">
                <div className={cn("inline-flex p-4 rounded-2xl mb-6", stat.bg, stat.color)}>
                    <stat.icon size={24} className="group-hover:rotate-12 transition-transform" />
                </div>
                <p className="text-xs font-black text-gray-400 border border-transparent uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <div className="flex items-end gap-3">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter">{stat.value}</h3>
                    <span className={cn(
                        "text-[10px] font-black px-2 py-0.5 rounded-lg mb-1",
                        stat.isUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                        {stat.trend}
                    </span>
                </div>
            </div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 w-full md:w-96 group focus-within:bg-white focus-within:border-[#f59e0b] transition-all">
            <Search size={18} className="text-gray-400 group-focus-within:text-[#f59e0b]" />
            <input type="text" placeholder="Search Transaction ID or Order ID..." className="bg-transparent border-none outline-none text-sm font-bold w-full" />
          </div>

          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-bold text-gray-500 hover:bg-white transition-all">
                <Filter size={18} /> Filter Status
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Transaction ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Method</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Date/Time</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div>
                        <p className="font-black text-gray-900">{payment.transactionId}</p>
                        <p className="text-[10px] text-[#f59e0b] font-black uppercase tracking-widest mt-0.5">Order: {payment.orderId}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-black text-gray-900">{formatPrice(payment.amount)}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center text-white text-[8px] font-black",
                            payment.method === 'M-Pesa' ? "bg-green-600" : "bg-blue-600"
                        )}>
                            {payment.method === 'M-Pesa' ? 'MP' : 'CC'}
                        </div>
                        <span className="text-sm font-bold text-gray-600">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                      payment.status === 'completed' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                    )}>
                      {payment.status}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-gray-600">{new Date(payment.createdAt).toLocaleDateString()}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(payment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2.5 text-gray-400 hover:text-[#f59e0b] bg-white rounded-xl border border-gray-100 shadow-sm transition-all group-hover:scale-110">
                        <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
