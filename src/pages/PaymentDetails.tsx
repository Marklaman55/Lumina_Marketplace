import { payments as mockPayments, formatPrice } from '@/src/data/mockData';
import { CreditCard, ArrowUpRight, Search, Filter, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function PaymentDetails() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tighter mb-2">PAYMENT HISTORY</h1>
          <p className="text-gray-500">View and track your M-Pesa & Card transactions</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-gray-400">
                <Search size={18} />
                <input type="text" placeholder="Transaction ID..." className="bg-transparent outline-none text-sm font-bold w-40" />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100 rounded-xl transition-all">
                <Filter size={20} />
            </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-xl shadow-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Transaction</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Method</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#f59e0b]">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="font-black text-gray-900">{payment.transactionId}</p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Order {payment.orderId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-black text-gray-900">{formatPrice(payment.amount)}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        payment.method === 'M-Pesa' ? "bg-green-500" : "bg-blue-500"
                      )} />
                      <span className="text-sm font-bold text-gray-600">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                      payment.status === 'completed' ? "bg-green-50 text-green-600" : 
                      payment.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"
                    )}>
                      {payment.status === 'completed' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      {payment.status}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                      <Calendar size={14} />
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-300 hover:text-[#f59e0b] group-hover:bg-white rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-amber-100">
                      <ArrowUpRight size={20} />
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
