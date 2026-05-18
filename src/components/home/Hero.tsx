import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { heroSlides } from '@/src/data/mockData';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="hero-swiper h-[600px] md:h-[800px]"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative w-full h-full flex items-center"
              style={{ backgroundColor: slide.bgColor }}
            >
              <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 z-10">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="max-w-xl text-center lg:text-left"
                >
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block text-[#f59e0b] font-black text-sm md:text-base tracking-[0.4em] uppercase mb-6 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-[#f59e0b]/20"
                  >
                    {slide.subtitle}
                  </motion.span>
                  <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-gray-900 leading-[0.9] mb-8 uppercase tracking-tighter italic">
                    {slide.title}
                  </h1>
                  <p className="text-gray-500 text-lg md:text-xl font-medium mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                    <Link to="/#featured-products" className="group bg-gray-900 text-white px-10 py-5 rounded-full font-black text-sm tracking-[0.2em] flex items-center gap-4 hover:bg-[#f59e0b] transition-all shadow-2xl shadow-gray-200 active:scale-95">
                      EXPLORE NOW
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-lg">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">+12k HAPPY CUSTOMERS</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, type: 'spring' }}
                  className="hidden lg:block relative"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-[100px] animate-pulse"></div>
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="relative w-full h-auto object-contain max-h-[600px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
