import FeaturedProducts from '@/src/components/home/FeaturedProducts';
import Categories from '@/src/components/home/Categories';
import { useShop } from '@/src/context/ShopContext';
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useIsMobile } from '@/src/hooks/useMediaQuery';

export default function Shop() {
  const { addToCart } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-0.5 md:gap-2 py-1 md:py-2 bg-[#fafafa] min-h-screen">
      {/* Mobile-Friendly Hero/Search Area */}
      <div className="container mx-auto px-2 md:px-4">
        {!isMobile ? (
          <div className="max-w-2xl mb-1">
            <h1 className="text-2xl font-black tracking-tighter mb-0.5 text-gray-900 capitalize">
              {selectedCategory === 'All' ? 'Marketplace' : selectedCategory}
            </h1>
            <p className="text-gray-400 font-medium text-[10px] md:text-xs leading-none">
              Curated premium Kenyan goods.
            </p>
          </div>
        ) : (
          <div className="mb-0.5">
            <h1 className="text-md font-black tracking-tighter text-gray-900 mb-0.5 italic uppercase text-center md:text-left">Lumina <span className="text-[#f59e0b]">Shop</span></h1>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex gap-1 mb-0.5">
          <div className="relative flex-1 group">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f59e0b] transition-colors" />
            <input 
              type="text" 
              placeholder="Quick search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-lg py-2 pl-8 pr-3 outline-none focus:border-[#f59e0b] shadow-sm font-bold text-[10px] transition-all"
            />
          </div>
          <button className="bg-white border border-gray-100 p-2 rounded-lg text-gray-500 hover:text-[#f59e0b] transition-all shadow-sm">
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>
      
      <div className="px-1 md:px-0">
        <Categories onSelectCategory={setSelectedCategory} />
      </div>
      
      <div id="featured-products" className="md:mt-0">
        <FeaturedProducts 
          onAddToCart={addToCart} 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
