import { useState, FormEvent, useRef } from 'react';
import { useAdmin } from '@/src/context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Tag, 
  DollarSign, 
  Image as ImageIcon, 
  AlignLeft, 
  Plus, 
  ArrowLeft,
  CheckCircle2,
  X,
  PlusCircle,
  HelpCircle,
  LayoutGrid,
  Layers,
  Settings2,
  Trash2,
  UploadCloud,
  ChevronRight,
  Info
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import MultiImageUpload from '@/src/components/admin/MultiImageUpload';
import { ProductVariant } from '@/src/data/mockData';

export default function AdminAddProduct() {
  const { addProduct } = useAdmin();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    oldPrice: '',
    category: 'Electronics',
    description: '',
    badge: ''
  });

  const [images, setImages] = useState<string[]>([]);
  const [specs, setSpecs] = useState<string[]>(['']);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [showVariantForm, setShowVariantForm] = useState(false);

  const [newVariant, setNewVariant] = useState<Partial<ProductVariant>>({
    sku: '',
    price: 0,
    stock: 0,
    image: '',
    attributes: {}
  });

  const handleAddSpec = () => setSpecs([...specs, '']);
  const handleRemoveSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
  const handleSpecChange = (index: number, val: string) => {
    const newSpecs = [...specs];
    newSpecs[index] = val;
    setSpecs(newSpecs);
  };

  const handleAddVariant = () => {
    if (newVariant.sku && newVariant.price) {
      setVariants([...variants, { ...newVariant, id: Date.now().toString() } as ProductVariant]);
      setNewVariant({ sku: '', price: 0, stock: 0, image: '', attributes: {} });
      setShowVariantForm(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addProduct({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      image: images[0] || '',
      images: images,
      specs: specs.filter(s => s !== ''),
      variants: variants,
      rating: 5.0,
      reviews: 0,
      hoverImage: images[1] || images[0] || '',
      isNew: true,
      onSale: !!formData.oldPrice
    });
    navigate('/admin/products');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
            <button 
                onClick={() => navigate('/admin/products')}
                className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold transition-colors mb-2 text-sm"
            >
                <ArrowLeft size={16} /> Back to Products
            </button>
            <h1 className="text-4xl font-display font-black tracking-tight text-gray-900">List New Product</h1>
            <p className="text-gray-500 font-medium">Deploy a new offering to the Lumina ecosystem</p>
        </div>
        
        <div className="flex items-center gap-4">
            <button 
                onClick={() => navigate('/admin/products')}
                className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-100 transition-all"
            >
                Cancel Draft
            </button>
            <button 
                form="add-product-form"
                type="submit"
                className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-gray-200 hover:bg-[#f59e0b] hover:shadow-amber-100 transition-all flex items-center gap-3"
            >
                <UploadCloud size={18} /> Publish Listing
            </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
            {/* Core Info */}
            <section className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-2xl shadow-gray-200/40">
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-amber-50 rounded- [28px] flex items-center justify-center text-[#f59e0b] border border-amber-100/50">
                            <LayoutGrid size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Core Details</h2>
                            <p className="text-sm text-gray-400 font-medium">Primary identification and cataloging</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} id="add-product-form" className="space-y-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Product Master Title</label>
                        <div className="relative group">
                            <Tag size={20} className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#f59e0b] transition-colors" />
                            <input 
                                type="text" 
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g., Lumina Pro+ Wireless Audio"
                                className="w-full bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] focus:ring-8 focus:ring-amber-50 rounded-[32px] py-6 pl-16 pr-8 outline-none font-black text-lg transition-all placeholder:text-gray-200"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                         <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Standard Price (KES)</label>
                            <div className="relative group">
                                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 font-black text-lg group-focus-within:text-[#f59e0b]">KES</span>
                                <input 
                                    type="number" 
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0"
                                    className="w-full bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[28px] py-6 pl-20 pr-8 outline-none font-black text-lg transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Sale Price (Optional)</label>
                            <div className="relative group opacity-50 focus-within:opacity-100 transition-opacity">
                                <span className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 font-black text-lg group-focus-within:text-[#f59e0b]">KES</span>
                                <input 
                                    type="number" 
                                    value={formData.oldPrice}
                                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                                    placeholder="0"
                                    className="w-full bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[28px] py-6 pl-20 pr-8 outline-none font-black text-lg transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Story & Description</label>
                        <div className="relative group">
                            <AlignLeft size={20} className="absolute left-8 top-8 text-gray-300 group-focus-within:text-[#f59e0b] transition-colors" />
                            <textarea 
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Narrate the craftsmanship behind this item..."
                                rows={6}
                                className="w-full bg-gray-50/50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[32px] py-8 pl-16 pr-8 outline-none font-bold text-base transition-all resize-none placeholder:text-gray-200"
                            ></textarea>
                        </div>
                    </div>
                </form>
            </section>

            {/* Multiple Variants */}
            <section className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-2xl shadow-gray-200/40">
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-purple-50 rounded-[28px] flex items-center justify-center text-purple-500 border border-purple-100/50">
                            <Layers size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Product Variants</h2>
                            <p className="text-sm text-gray-400 font-medium">Manage sizes, colors, and specific versions</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowVariantForm(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 transition-all shadow-xl shadow-purple-100"
                    >
                        <PlusCircle size={16} /> Add Variant
                    </button>
                </div>

                <div className="space-y-4">
                    {variants.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {variants.map((v) => (
                                <div key={v.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100 text-gray-400 font-bold">
                                            {v.image ? <img src={v.image} className="w-full h-full object-cover rounded-xl" /> : <Package size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900">{v.sku}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{formatPrice(v.price)} • {v.stock} in Stock</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setVariants(variants.filter(varnt => varnt.id !== v.id))}
                                        className="p-3 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center bg-gray-50/50 rounded-[40px] border-2 border-dashed border-gray-100">
                            <Settings2 size={40} className="mx-auto text-gray-200 mb-4" />
                            <p className="text-gray-400 font-bold">No variants defined. Add sizes or colors to enhance choice.</p>
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {showVariantForm && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mt-10 p-8 bg-purple-50/30 rounded-[40px] border-2 border-purple-100/50 space-y-8 relative"
                        >
                            <button onClick={() => setShowVariantForm(false)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900">
                                <X size={20} />
                            </button>
                            <h4 className="text-lg font-black text-gray-900 tracking-tight">Configure New Variant</h4>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Variant SKU</label>
                                    <input 
                                        type="text" 
                                        value={newVariant.sku}
                                        onChange={(e) => setNewVariant({ ...newVariant, sku: e.target.value })}
                                        placeholder="audio-pro-blue"
                                        className="w-full bg-white border border-purple-100 rounded-2xl py-4 px-6 outline-none font-bold text-sm"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Variant Image URL (Optional)</label>
                                    <input 
                                        type="url" 
                                        value={newVariant.image}
                                        onChange={(e) => setNewVariant({ ...newVariant, image: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full bg-white border border-purple-100 rounded-2xl py-4 px-6 outline-none font-bold text-sm"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Specific Price</label>
                                    <input 
                                        type="number" 
                                        value={newVariant.price}
                                        onChange={(e) => setNewVariant({ ...newVariant, price: Number(e.target.value) })}
                                        placeholder="34500"
                                        className="w-full bg-white border border-purple-100 rounded-2xl py-4 px-6 outline-none font-bold text-sm"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Stock Level</label>
                                    <input 
                                        type="number" 
                                        value={newVariant.stock}
                                        onChange={(e) => setNewVariant({ ...newVariant, stock: Number(e.target.value) })}
                                        placeholder="50"
                                        className="w-full bg-white border border-purple-100 rounded-2xl py-4 px-6 outline-none font-bold text-sm"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleAddVariant}
                                className="w-full bg-purple-500 text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center gap-3 shadow-xl shadow-purple-50"
                            >
                                <CheckCircle2 size={18} /> Confirm Variant
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </div>

        <div className="lg:col-span-4 space-y-12">
            {/* Multi-Image Upload */}
            <section className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-2xl shadow-gray-200/40">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-black text-gray-900 tracking-tight">Gallery</h3>
                        <p className="text-xs text-gray-400 font-medium italic">Supports multiple device uploads</p>
                    </div>
                </div>

                <MultiImageUpload images={images} onImagesChange={setImages} />
            </section>

            {/* Organization */}
            <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-2xl shadow-gray-200/40 space-y-10">
               <div>
                   <h3 className="text-lg font-black text-gray-900 tracking-tight">Organization</h3>
                   <p className="text-xs text-gray-400 font-medium italic">Categorization & Tagging</p>
               </div>
               
               <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Market Classification</label>
                        <div className="relative">
                            <ChevronRight size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-200 pointer-events-none" />
                            <select 
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-5 px-8 outline-none font-black text-sm transition-all appearance-none cursor-pointer"
                            >
                                <option>Electronics</option>
                                <option>Fashion</option>
                                <option>Accessories</option>
                                <option>Furniture</option>
                                <option>Beauty</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between ml-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tech Specs</label>
                            <button 
                                type="button" 
                                onClick={handleAddSpec}
                                className="text-[9px] font-black text-[#f59e0b] uppercase tracking-[0.2em] hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-all"
                            >
                                + New
                            </button>
                        </div>
                        <div className="space-y-3">
                            {specs.map((spec, i) => (
                                <div key={i} className="flex gap-2">
                                    <input 
                                        type="text" 
                                        value={spec}
                                        onChange={(e) => handleSpecChange(i, e.target.value)}
                                        placeholder="e.g., Battery Life or Connectivity"
                                        className="flex-grow bg-gray-50/50 border border-gray-100 focus:bg-white focus:border-[#f59e0b] rounded-2xl py-4 px-6 outline-none font-bold text-xs transition-all"
                                    />
                                    {specs.length > 1 && (
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveSpec(i)}
                                            className="p-3 text-red-300 hover:text-red-500 transition-all hover:bg-red-50 rounded-xl"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
               </div>
            </div>
        </div>
      </div>

    </div>
  );
}

const formatPrice = (price: number) => {
  return "KES " + price.toLocaleString();
};
