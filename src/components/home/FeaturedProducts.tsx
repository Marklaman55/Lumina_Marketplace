import { useState, MouseEvent } from 'react';
import { Star, ShoppingCart, Heart, Eye, Check, ShoppingBag, SlidersHorizontal, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { categories, formatPrice } from '@/src/data/mockData';
import { cn } from '@/src/lib/utils';
import QuickViewModal from '@/src/components/ui/QuickViewModal';
import { useShop } from '@/src/context/ShopContext';

export function ProductCard({ 
  product, 
  onAddToCart, 
  onQuickView 
}: { 
  product: any; 
  onAddToCart: (product: any, variant?: any) => void;
  onQuickView: (product: any) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const { wishlist, toggleWishlist } = useShop();

  const isLiked = wishlist.includes(product.id);

  const handleAddToCart = (e: MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const currentPrice = selectedVariant?.price || product.price;
  const currentImage = selectedVariant?.image || (isHovered && product.hoverImage ? product.hoverImage : product.image);

  return (
    <motion.div 
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-[50px] border border-gray-100 p-6 transition-all hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] group flex flex-col h-full relative overflow-hidden"
    >
      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -40, scale: 1.2 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#f59e0b] text-white w-16 h-16 rounded-full flex items-center justify-center font-black text-xl shadow-2xl pointer-events-none italic"
          >
            +1
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative aspect-[4/5] bg-[#f8f9fa] rounded-[40px] overflow-hidden mb-8">
        {/* Badges */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
          {product.badge && (
            <span className={cn(
              "px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-xl italic",
              product.badge.includes('%') ? "bg-[#ef4444] text-white" : "bg-[#f59e0b] text-white"
            )}>
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="bg-gray-900 text-white px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-xl italic border border-white/20">
              NEW DROP
            </span>
          )}
        </div>

        {/* Actions Overlay */}
        <div className="absolute top-6 right-6 z-10 flex flex-col gap-3 translate-x-20 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <button 
            onClick={() => toggleWishlist(product.id)}
            className={cn(
                "w-14 h-14 rounded-2xl shadow-2xl transition-all hover:scale-110 flex items-center justify-center",
                isLiked ? "bg-[#f59e0b] text-white" : "bg-white text-gray-500 hover:text-[#f59e0b]"
            )}
          >
            <Heart size={22} className={cn(isLiked && "fill-current")} />
          </button>
          <button 
            onClick={() => onQuickView(product)}
            className="bg-white w-14 h-14 rounded-2xl shadow-2xl text-gray-500 hover:text-[#f59e0b] hover:scale-110 flex items-center justify-center transition-all"
          >
            <Eye size={22} />
          </button>
        </div>

        {/* Image */}
        <img 
          src={currentImage} 
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-8 transition-all duration-1000 group-hover:scale-110"
        />

        {/* Variant Picker Overlay on Image (Small dots) */}
        {product.variants && product.variants.length > 1 && (
            <div className="absolute bottom-6 md:bottom-10 inset-x-0 flex justify-center gap-2 z-20 md:opacity-0 group-hover:opacity-100 transition-opacity">
                {product.variants.slice(0, 4).map((v: any) => (
                    <button
                        key={v.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedVariant(v); }}
                        className={cn(
                            "w-3 h-3 md:w-3 md:h-3 rounded-full border-2 transition-all",
                            selectedVariant?.id === v.id ? "bg-[#f59e0b] border-white scale-125 shadow-lg" : "bg-white border-gray-200 hover:border-[#f59e0b]"
                        )}
                        title={Object.values(v.attributes).join(' ')}
                    />
                ))}
            </div>
        )}

        {/* Quick View Middle Button */}
        <div className="absolute inset-x-0 bottom-1/2 translate-y-1/2 flex items-center justify-center pointer-events-none">
          <button 
            onClick={() => onQuickView(product)}
            className="pointer-events-auto bg-white/90 backdrop-blur-xl text-gray-900 px-10 py-5 rounded-full font-black text-xs tracking-[0.2em] opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-gray-900 hover:text-white uppercase shadow-2xl border border-gray-100 italic"
          >
            VIEW DETAILS
          </button>
        </div>

        {/* Add to Cart Footer Overlay */}
        <div className="absolute bottom-6 inset-x-6 translate-y-24 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button 
            onClick={handleAddToCart}
            disabled={added}
            className={cn(
              "w-full py-6 rounded-3xl font-black text-xs tracking-[0.2em] flex items-center justify-center gap-4 transition-all shadow-2xl active:scale-95 italic uppercase",
              added ? "bg-emerald-500 text-white" : "bg-gray-900 text-white hover:bg-[#f59e0b]"
            )}
          >
            {added ? <><Check size={20} /> IN BASKET</> : <><ShoppingBag size={20} /> ADD TO BASKET</>}
          </button>
        </div>
      </div>

      <div className="flex-1 px-2 space-y-4">
        <div className="flex justify-between items-center bg-[#f8f9fa] px-4 py-2 rounded-2xl">
            <p className="text-[10px] font-black text-[#f59e0b] uppercase tracking-[0.2em] italic">{product.category}</p>
            <div className="flex items-center gap-1.5">
                <Star size={12} className="fill-[#f59e0b] text-[#f59e0b]" />
                <span className="text-[10px] font-black text-gray-900">{product.rating}</span>
            </div>
        </div>
        
        <h3 className={cn(
          "font-black text-gray-900 group-hover:text-[#f59e0b] transition-all line-clamp-2 min-h-[48px] uppercase tracking-tighter leading-[1.1] italic text-lg",
          isHovered && "scale-[1.02] origin-left"
        )}>
          {product.title}
        </h3>
        
        <div className="flex items-end justify-between pt-4 border-t border-gray-50">
            <div className="space-y-1">
                {product.oldPrice && (
                    <p className="text-xs text-gray-300 line-through font-black italic">{formatPrice(product.oldPrice)}</p>
                )}
                <p className={cn(
                    "text-3xl font-black text-gray-900 transition-all tracking-tighter italic",
                    isHovered && "text-[#f59e0b]"
                )}>
                    {formatPrice(currentPrice)}
                </p>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    READY TO SHIP
                </span>
                <p className="text-[10px] font-bold text-gray-400">Sold by Lumina</p>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts({ 
  onAddToCart,
  selectedCategory,
  setSelectedCategory
}: { 
  onAddToCart: (product: any) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) {
  const [activeTab, setActiveTab] = useState('Featured');
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const { inventory } = useShop();

  const tabs = ['Featured', 'New Arrivals', 'Daily Sales'];
  const uniqueCategories = ['All', ...new Set(categories.map(c => c.name))];

  const filteredProducts = inventory.filter(p => {
    const matchesTab = 
      activeTab === 'Featured' ? true :
      activeTab === 'New Arrivals' ? p.isNew :
      activeTab === 'Daily Sales' ? p.onSale : true;
    
    const matchesCategory = 
      selectedCategory === 'All' ? true :
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesTab && matchesCategory;
  });

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden" id="featured-products">
      {/* Decorative text */}
      <div className="absolute top-20 -right-20 pointer-events-none opacity-[0.02] select-none hidden md:block">
          <h2 className="text-[200px] font-black italic uppercase leading-none transform rotate-90">TRENDING</h2>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="flex flex-col items-center xl:items-start text-center xl:text-left">
            <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase italic mb-6 shadow-2xl">
               <Sparkles size={16} /> Exclusive Selection
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase italic leading-[0.9]">
                Featured <br /> <span className="text-[#f59e0b]">Collections</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Custom Category Filter Tabs */}
            <div className="bg-gray-50 p-2 rounded-[30px] flex flex-wrap justify-center gap-1 border border-gray-100 overflow-x-auto max-w-full no-scrollbar">
                {uniqueCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                        "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic",
                        selectedCategory === cat ? "bg-[#f59e0b] text-white shadow-xl" : "text-gray-400 hover:text-gray-900"
                    )}
                  >
                    {cat}
                  </button>
                ))}
            </div>

            <div className="h-10 w-px bg-gray-200 hidden lg:block"></div>

            {/* Status Tabs */}
            <div className="bg-gray-900 p-2 rounded-[30px] flex gap-1 shadow-2xl">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic",
                    activeTab === tab 
                      ? "bg-white text-gray-900 shadow-xl" 
                      : "text-white/40 hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center rounded-[60px] bg-gray-50 border-2 border-dashed border-gray-200">
            <ShoppingBag size={60} className="mx-auto text-gray-200 mb-6" />
            <p className="text-gray-400 font-black text-2xl uppercase tracking-tighter italic">No matching treasures found</p>
            <button 
                onClick={() => {setSelectedCategory('All'); setActiveTab('Featured');}}
                className="mt-8 text-[#f59e0b] font-black uppercase tracking-widest border-b-2 border-[#f59e0b] pb-1 hover:text-gray-900 hover:border-gray-900 transition-all"
            >
                Clear all filters
            </button>
          </div>
        )}

        <div className="mt-24 text-center">
          <button className="group relative px-20 py-8 bg-gray-900 text-white rounded-[40px] font-black text-xs tracking-[0.4em] uppercase italic overflow-hidden transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] active:scale-95">
            <span className="relative z-10 flex items-center justify-center gap-4">
                View Full Collection <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-[#f59e0b] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>
      </div>

      <QuickViewModal 
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
}
