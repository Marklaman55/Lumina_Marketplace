import { ArrowRight, ShoppingBag, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Banners() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 h-auto lg:h-[700px]">
          {/* Main Large Banner */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 relative group overflow-hidden rounded-[60px] bg-gray-900"
          >
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000" 
              alt="Fashion" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12 z-10 text-white space-y-4 md:space-y-6">
              <span className="inline-flex items-center gap-2 bg-[#f59e0b] px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase italic w-fit">
                <Sparkles size={14} /> New Season Arrival
              </span>
              <h2 className="text-3xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">Elevate Your Lifestyle</h2>
              <p className="text-white/60 font-medium text-sm md:text-xl max-w-lg mb-4 md:mb-8 line-clamp-2 md:line-clamp-none">
                Explore our curated collection of Kenyan contemporary fashion and premium home essentials.
              </p>
              <Link to="/#featured-products" className="group bg-white text-gray-900 px-6 md:px-10 py-3 md:py-5 rounded-full font-black text-[11px] md:text-sm tracking-widest flex items-center gap-4 hover:bg-[#f59e0b] hover:text-white transition-all w-fit shadow-2xl active:scale-95">
                SHOP COLLECTION
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column Stack */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-8 h-full">
            {/* Top Right Banner */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative group overflow-hidden rounded-[50px] bg-[#f59e0b]"
            >
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000" 
                alt="Gadgets" 
                className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center text-white">
                <div className="bg-white/20 backdrop-blur-md self-start px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
                  Tech Essentials
                </div>
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic mb-4">Smart Kenyan Living</h3>
                <p className="text-white/80 font-bold mb-6 md:mb-8 uppercase tracking-widest text-[10px] md:text-xs">Up to 40% Discount Today</p>
                <Link to="/#hero" className="text-white font-black text-xs tracking-widest uppercase border-b-2 border-white pb-2 hover:border-[#f59e0b] transition-all w-fit">
                  DISCOVER TECH
                </Link>
              </div>
              <div className="absolute top-1/2 -right-10 -translate-y-1/2 bg-white/10 w-40 h-40 rounded-full blur-3xl animate-pulse"></div>
            </motion.div>

            {/* Bottom Right Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative group overflow-hidden rounded-[50px] bg-gray-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" 
                alt="Sneakers" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000 mix-blend-multiply"
              />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="bg-[#f59e0b] self-start px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[10px] font-black text-white tracking-widest uppercase mb-4 shadow-xl shadow-amber-200">
                    <Zap size={14} className="inline mr-2" /> Flash Drop
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter italic mb-6 md:mb-8">Premium Athletic Wear</h3>
                <Link to="/#deals" className="group bg-gray-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-[#f59e0b] transition-all shadow-xl active:scale-95">
                    <ArrowRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
