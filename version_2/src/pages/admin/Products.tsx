import { useAdmin } from '@/src/context/AdminContext';
import { formatPrice } from '@/src/data/mockData';
import { Plus, Search, Filter, Edit3, Trash2, Eye, ExternalLink, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function AdminProducts() {
  const { inventory, removeProduct } = useAdmin();

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to permanently delete this product from your inventory? This action cannot be undone.')) {
      removeProduct(id);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 font-medium text-sm">Control and monitor your catalog listings</p>
        </div>
        <Link 
            to="/admin/add-product"
            className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm tracking-wide shadow-xl shadow-gray-100 hover:bg-[#f59e0b] transition-all"
        >
          <Plus size={18} /> New Entry
        </Link>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 w-full md:w-96 group focus-within:bg-white focus-within:border-[#f59e0b] transition-all">
            <Search size={18} className="text-gray-400 group-focus-within:text-[#f59e0b]" />
            <input type="text" placeholder="Filter inventory..." className="bg-transparent border-none outline-none text-sm font-medium w-full" />
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-bold text-gray-500 hover:bg-white hover:border-gray-200 transition-all">
              <Filter size={18} /> All Categories
            </button>
          </div>
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Listing</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Category</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Pricing</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inventory.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1">{product.title}</p>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-bold text-gray-500 uppercase tracking-wider">{product.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-gray-900">{formatPrice(product.price)}</p>
                    {product.oldPrice && <p className="text-[10px] text-gray-400 line-through font-bold">{formatPrice(product.oldPrice)}</p>}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                       <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Available</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        to={`/admin/edit-product/${product.id}`}
                        className="p-2 text-gray-400 hover:text-[#f59e0b] transition-all"
                      >
                        <Edit3 size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Product Cards */}
        <div className="lg:hidden divide-y divide-gray-50">
          {inventory.map((product) => (
            <div key={product.id} className="p-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-gray-100 rounded-md text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 inline-block">
                        {product.category}
                    </span>
                    <div className="flex gap-2">
                         <Link to={`/admin/edit-product/${product.id}`} className="p-2 bg-gray-50 text-gray-400 rounded-xl">
                            <Edit3 size={16} />
                         </Link>
                         <button onClick={() => handleDelete(product.id)} className="p-2 bg-red-50 text-red-400 rounded-xl">
                            <Trash2 size={16} />
                         </button>
                    </div>
                  </div>
                  <h3 className="font-black text-gray-900 text-sm line-clamp-1">{product.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="font-black text-gray-900 text-sm">{formatPrice(product.price)}</p>
                    {product.oldPrice && <p className="text-[10px] text-gray-300 line-through font-bold">{formatPrice(product.oldPrice)}</p>}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">In Stock</span>
                 </div>
                 <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">SKU: {product.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
