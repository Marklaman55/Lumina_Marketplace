import { useState, FormEvent } from 'react';
import { useAdmin } from '@/src/context/AdminContext';
import { Plus, Search, Tag, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function AdminCategories() {
  const { categories, addCategory, deleteCategory } = useAdmin();
  const [newCat, setNewCat] = useState({ name: '', icon: 'Tag' });

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!newCat.name) return;
    addCategory({ ...newCat, count: '0 Items' });
    setNewCat({ name: '', icon: 'Tag' });
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-display font-black tracking-tighter text-gray-900">DEPARTMENT MANAGEMENT</h1>
        <p className="text-gray-500 font-medium">Create and organize marketplace product categories</p>
      </div>

      <div className="grid lg:grid-cols-[400px_1fr] gap-10">
        {/* Add Category Form */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-100/50 h-fit sticky top-28">
            <h3 className="text-xl font-black text-gray-900 tracking-tight mb-6">New Category</h3>
            <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Category Name</label>
                    <div className="relative group">
                       <Tag size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f59e0b] transition-colors" />
                       <input 
                         type="text" 
                         value={newCat.name}
                         onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                         placeholder="e.g., Summer Collection"
                         className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 pl-14 pr-6 outline-none font-bold text-sm transition-all"
                       />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Select Icon Type</label>
                    <div className="grid grid-cols-4 gap-3">
                        {['Tag', 'Shirt', 'Watch', 'Smartphone', 'Headphones', 'Laptop', 'Coffee', 'Lamp'].map((icon) => (
                            <button
                                key={icon}
                                type="button"
                                onClick={() => setNewCat({ ...newCat, icon })}
                                className={cn(
                                    "p-4 rounded-2xl border-2 transition-all flex items-center justify-center",
                                    newCat.icon === icon ? "bg-[#f59e0b] border-[#f59e0b] text-white shadow-lg shadow-amber-100" : "bg-gray-50 border-transparent text-gray-400 hover:border-gray-200"
                                )}
                            >
                                <Tag size={20} />
                            </button>
                        ))}
                    </div>
                </div>

                <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-[#f59e0b] transition-all flex items-center justify-center gap-2">
                    <Plus size={18} /> Create Category
                </button>
            </form>
        </div>

        {/* Categories List */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center gap-4 bg-gray-50/30">
                <div className="flex items-center gap-3 bg-white px-6 py-2.5 rounded-2xl border border-gray-100 w-full group focus-within:border-[#f59e0b] transition-all">
                    <Search size={18} className="text-gray-400" />
                    <input type="text" placeholder="Quick search categories..." className="bg-transparent border-none outline-none text-sm font-bold w-full" />
                </div>
            </div>

            <div className="p-8 grid sm:grid-cols-2 gap-4">
                {categories.map((cat: any) => (
                    <div key={cat.id} className="p-6 bg-gray-50 hover:bg-white border-2 border-transparent hover:border-[#f59e0b] rounded-[30px] transition-all group flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 group-hover:text-[#f59e0b] group-hover:scale-110 transition-all">
                                <Tag size={24} />
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900 tracking-tight">{cat.name}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{cat.count}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-gray-400 hover:text-[#f59e0b]">
                                <Edit3 size={18} />
                            </button>
                            <button 
                                onClick={() => deleteCategory(cat.id)}
                                className="p-2 text-gray-400 hover:text-red-500"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
