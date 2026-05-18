import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { 
  Watch, 
  Cloud, 
  Smartphone, 
  Headphones, 
  Shirt, 
  ShoppingBag, 
  Lamp,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { categories } from '@/src/data/mockData';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const iconMap: Record<string, any> = {
  Watch,
  Cloud,
  Smartphone,
  Headphones,
  Shirt,
  ShoppingBag,
  Lamp
};

export default function Categories({ onSelectCategory }: { onSelectCategory: (category: string) => void }) {
  return (
    <section className="py-0.5 md:py-1 bg-white relative overflow-hidden" id="categories">
      {/* Background decoration - reduced opacity/presence */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-[#f8f9fa] rounded-l-[100px] z-0 opacity-50"></div>
      
      <div className="container mx-auto px-2 md:px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-1 md:mb-1.5 gap-1">
          <div className="text-center md:text-left">
            <h2 className="text-[10px] md:text-lg font-black text-gray-400 uppercase tracking-widest italic leading-none">
                <span className="text-[#f59e0b]">Shop</span> Categories
            </h2>
          </div>
          
          <div className="flex gap-1 hidden md:flex">
            <button className="category-prev bg-white w-6 h-6 rounded-md flex items-center justify-center shadow-sm hover:bg-gray-900 hover:text-white transition-all border border-gray-100 group active:scale-95">
              <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button className="category-next bg-white w-6 h-6 rounded-md flex items-center justify-center shadow-sm hover:bg-gray-900 hover:text-white transition-all border border-gray-100 group active:scale-95">
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.category-prev',
            nextEl: '.category-next',
          }}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 5 },
            480: { slidesPerView: 4, spaceBetween: 8 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
            1400: { slidesPerView: 8 },
          }}
          className="!pb-4 !pt-1"
        >
          {categories.map((category, i) => {
            const Icon = iconMap[category.icon] || ShoppingBag;
            return (
              <SwiperSlide key={category.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    onSelectCategory(category.name);
                    document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group bg-white p-4 md:p-6 rounded-2xl md:rounded-[32px] border border-gray-100 hover:border-transparent text-center transition-all cursor-pointer hover:shadow-[0_20px_50px_rgba(245,158,11,0.1)] relative overflow-hidden active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#fff7ed] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-[#f8f9fa] group-hover:bg-white group-hover:scale-110 shadow-sm group-hover:shadow-xl rounded-[20px] flex items-center justify-center mb-4 transition-all duration-500 group-hover:rotate-6">
                        <Icon size={28} className="text-gray-400 group-hover:text-[#f59e0b] transition-all duration-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#f59e0b] transition-colors mb-1 uppercase tracking-tighter text-sm md:text-base">{category.name}</h3>
                    <p className="text-gray-400 text-[8px] md:text-[9px] font-black uppercase tracking-widest bg-gray-50 group-hover:bg-[#f59e0b]/10 group-hover:text-[#f59e0b] inline-block px-3 py-1 rounded-full transition-all">{category.count} Items</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
