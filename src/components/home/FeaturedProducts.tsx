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
      className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-1 md:p-1.5 transition-all duration-500 hover:bg-gray-50/80 hover:shadow-[0_10px_25px_rgba(0,0,0,0.04)] group flex flex-col h-full relative overflow-hidden"
    >
      <div className="relative aspect-square md:aspect-[4/5] bg-[#f8f9fa] rounded-lg md:rounded-xl overflow-hidden mb-1 md:mb-1.5">
        {/* Badges - Hidden on mobile for cleaner look */}
        <div className="absolute top-3 left-3 md:top-6 md:left-6 z-10 flex flex-col gap-2 hidden md:flex">
          {product.badge && (
            <span className={cn(
              "px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[9px] font-black tracking-[0.1em] uppercase shadow-lg italic",
              product.badge.includes('%') ? "bg-[#ef4444] text-white" : "bg-[#f59e0b] text-white"
            )}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Actions Overlay - Hidden on mobile */}
        <div className="absolute top-3 right-3 md:top-6 md:right-6 z-10 flex flex-col gap-2 md:gap-3 md:translate-y-[-20px] group-hover:translate-y-0 md:opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out hidden md:flex">
          <button 
            onClick={() => toggleWishlist(product.id)}
            className={cn(
              "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl shadow-xl transition-all hover:scale-110 flex items-center justify-center",
              isLiked ? "bg-[#f59e0b] text-white" : "bg-white text-gray-500 hover:text-[#f59e0b]"
            )}
          >
            <Heart size={18} className={cn(isLiked && "fill-current")} />
          </button>
          <button 
            onClick={() => onQuickView(product)}
            className="bg-white w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl shadow-xl text-gray-500 hover:text-[#f59e0b] hover:scale-110 flex items-center justify-center transition-all"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Image - Fixed height area */}
        <img 
          src={currentImage} 
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-2 md:p-4 transition-all duration-700 group-hover:scale-105"
        />

        {/* Desktop Quick View Button overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center pointer-events-none hidden md:flex">
          <button 
            onClick={() => onQuickView(product)}
            className="pointer-events-auto bg-gray-900/90 backdrop-blur-md text-white px-8 py-4 rounded-full font-black text-[10px] tracking-[0.2em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-[#f59e0b] uppercase shadow-2xl italic flex items-center gap-2"
          >
            <Eye size={14} /> QUICK VIEW
          </button>
        </div>

        {/* Mobile View Details Trigger */}
        <button 
          onClick={() => onQuickView(product)}
          className="md:hidden absolute inset-0 z-20"
        />
      </div>

      <div className="flex-1 flex flex-col pt-1">
        <h3 className={cn(
          "font-bold md:font-black text-gray-900 group-hover:text-[#f59e0b] transition-all duration-500 line-clamp-2 md:min-h-[48px] tracking-tight md:tracking-tighter leading-tight md:leading-[1.1] text-[11px] md:text-lg italic md:uppercase mb-1",
          isHovered && "md:translate-x-1"
        )}>
          {product.title}
        </h3>

        <div className="mt-auto space-y-1">
          <p className={cn(
            "text-xs md:text-2xl font-black text-gray-900 transition-all duration-500 tracking-tighter italic",
            isHovered && "text-[#f59e0b] scale-105 origin-left"
          )}>
            {formatPrice(currentPrice)}
          </p>

          <div className="flex items-center gap-0.5 md:gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={8} 
                className={cn(
                  "md:size-[10px] transition-colors duration-500",
                  i < Math.floor(product.rating) ? "fill-[#f59e0b] text-[#f59e0b]" : (isHovered ? "text-gray-300" : "text-gray-200")
                )} 
              />
            ))}
            <span className="text-[7px] md:text-9px] font-bold text-gray-400 ml-1">({product.rating})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts({ 
  onAddToCart,
  selectedCategory,
  setSelectedCategory,
  searchQuery = ''
}: { 
  onAddToCart: (product: any) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery?: string;
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

    const matchesSearch = 
      searchQuery === '' ? true :
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesCategory && matchesSearch;
  });

  return (
    <section className="py-1 md:py-2 bg-white relative overflow-hidden" id="featured-products">
      {/* Decorative text */}
      <div className="absolute top-5 -right-20 pointer-events-none opacity-[0.01] select-none hidden md:block">
          <h2 className="text-[100px] font-black italic uppercase leading-none transform rotate-90">TRENDING</h2>
      </div>

      <div className="container mx-auto px-1 md:px-2">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-1 md:gap-3 mb-3 md:mb-4">
          <div className="flex flex-col items-center xl:items-start text-center xl:text-left">
            <h2 className="text-lg md:text-2xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">
              <span className="text-[#f59e0b]">Featured</span> Treasures
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-2 items-center">
            {/* Custom Category Filter Tabs */}
            <div className="bg-gray-50 p-0.5 rounded-lg flex flex-wrap justify-center gap-0.5 border border-gray-100 overflow-x-auto max-w-full no-scrollbar">
              {uniqueCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest transition-all italic",
                    selectedCategory === cat ? "bg-[#f59e0b] text-white shadow-sm" : "text-gray-400 hover:text-gray-900"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-gray-200 hidden lg:block"></div>

            {/* Status Tabs */}
            <div className="bg-gray-900 p-0.5 rounded-lg flex gap-0.5 shadow-md">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest transition-all italic",
                    activeTab === tab 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-white/40 hover:text-white"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-0.5 md:gap-1">
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