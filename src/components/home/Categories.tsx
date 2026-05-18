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
    <section className="py-24 bg-white relative overflow-hidden" id="categories">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8f9fa] rounded-l-[100px] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#f59e0b]/10 text-[#f59e0b] px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
               <TrendingUp size={14} /> Trending Collections
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">
                Browse <br /> <span className="text-[#f59e0b]">Categories</span>
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button className="category-prev bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:bg-gray-900 hover:text-white transition-all border border-gray-100 group active:scale-95">
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button className="category-next bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl hover:bg-gray-900 hover:text-white transition-all border border-gray-100 group active:scale-95">
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
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
          spaceBetween={30}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
            1400: { slidesPerView: 6 },
          }}
          className="!pb-20 !pt-2"
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
                  className="group bg-white p-10 rounded-[50px] border border-gray-100 hover:border-transparent text-center transition-all cursor-pointer hover:shadow-[0_20px_50px_rgba(245,158,11,0.1)] relative overflow-hidden active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#fff7ed] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto bg-[#f8f9fa] group-hover:bg-white group-hover:scale-110 shadow-sm group-hover:shadow-xl rounded-[30px] flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-6">
                        <Icon size={44} className="text-gray-400 group-hover:text-[#f59e0b] transition-all duration-500" />
                    </div>
                    <h3 className="font-black text-gray-900 group-hover:text-[#f59e0b] transition-colors mb-2 uppercase tracking-tighter text-lg">{category.name}</h3>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest bg-gray-50 group-hover:bg-[#f59e0b]/10 group-hover:text-[#f59e0b] inline-block px-4 py-1 rounded-full transition-all">{category.count} Products</p>
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
