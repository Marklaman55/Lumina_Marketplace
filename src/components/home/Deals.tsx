import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Eye, Check, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { deals, formatPrice } from '@/src/data/mockData';
import { cn } from '@/src/lib/utils';
import QuickViewModal from '@/src/components/ui/QuickViewModal';

export default function Deals({ onAddToCart }: { onAddToCart: (product: any) => void }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const handleAddToCart = (product: any) => {
    onAddToCart(product);
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

  useEffect(() => {
    const targetDate = new Date(deals.main.endsAt).getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#f8f9fa] overflow-hidden" id="deals">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center lg:text-left">
           <div className="inline-flex items-center gap-2 bg-[#f59e0b] text-white px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-4 shadow-xl shadow-amber-100">
              <Clock size={16} /> Flash Sale Ending Soon
           </div>
           <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase italic">Deal of the Week</h2>
           <div className="h-1.5 w-32 bg-[#f59e0b] mt-4 rounded-full mx-auto lg:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Deal Card */}
          <div className="lg:col-span-12 xl:col-span-8">
            <div className="bg-white rounded-[40px] md:rounded-[60px] p-6 md:p-16 border border-gray-100 shadow-2xl flex flex-col md:flex-row items-center gap-10 md:gap-16 relative overflow-hidden group">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
              
              <div className="w-full md:w-1/2 relative z-10">
                <div className="aspect-square bg-[#f8f9fa] rounded-[30px] md:rounded-[40px] overflow-hidden p-6 md:p-8 cursor-pointer group" onClick={() => setQuickViewProduct(deals.main)}>
                    <img 
                    src={deals.main.image} 
                    alt={deals.main.title}
                    className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    />
                </div>
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[#f59e0b] text-white p-6 md:p-8 rounded-[25px] md:rounded-[35px] shadow-2xl rotate-12 group-hover:rotate-0 transition-all duration-500">
                    <p className="text-2xl md:text-3xl font-black italic">-{Math.round((1 - deals.main.price / deals.main.oldPrice) * 100)}%</p>
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-80">Flash Discount</p>
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-6 md:space-y-8 z-10">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={cn("fill-[#f59e0b] text-[#f59e0b]")} />
                  ))}
                  <span className="text-sm text-gray-400 font-bold ml-2">(4.9 Star Rating)</span>
                </div>

                <h3 className="text-4xl font-black text-gray-900 leading-tight uppercase tracking-tight">{deals.main.title}</h3>
                
                <div className="flex items-center gap-6">
                  <span className="text-5xl font-black text-[#f59e0b]">{formatPrice(deals.main.price)}</span>
                  <span className="text-2xl text-gray-300 line-through font-bold">{formatPrice(deals.main.oldPrice)}</span>
                </div>

                {/* Countdown */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hrs', value: timeLeft.hours },
                    { label: 'Min', value: timeLeft.minutes },
                    { label: 'Sec', value: timeLeft.seconds },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#f8f9fa] p-4 rounded-3xl text-center border border-gray-100 border-b-4 border-b-[#f59e0b]">
                      <div className="text-2xl font-black text-gray-900 tracking-tighter">{item.value.toString().padStart(2, '0')}</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* Stock Progress */}
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-gray-400">Items Sold: <b className="text-gray-900">{deals.main.sold}</b></span>
                    <span className="text-gray-400">Available: <b className="text-[#f59e0b]">{deals.main.available}</b></span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(deals.main.sold / (deals.main.sold + deals.main.available)) * 100}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-[#f59e0b] to-amber-300" 
                    />
                  </div>
                </div>

                <button 
                  onClick={() => handleAddToCart(deals.main)}
                  disabled={addedIds.includes(deals.main.id)}
                  className={cn(
                    "w-full py-6 rounded-[30px] font-black tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl active:scale-95 text-lg",
                    addedIds.includes(deals.main.id) ? "bg-emerald-500 text-white" : "bg-gray-900 text-white hover:bg-[#f59e0b]"
                  )}
                >
                  {addedIds.includes(deals.main.id) ? <><Check size={24} /> ADDED!</> : <><TrendingUp size={24} /> GRAB THIS DEAL NOW</>}
                </button>
              </div>
            </div>
          </div>

          {/* Side Products */}
          <div className="lg:col-span-12 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
            {deals.sideProducts.slice(0, 3).map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-[40px] border border-gray-100 hover:shadow-2xl transition-all group flex items-center gap-6"
              >
                <div 
                    className="w-32 h-32 bg-[#f8f9fa] rounded-[30px] overflow-hidden p-4 cursor-pointer flex-shrink-0"
                    onClick={() => setQuickViewProduct(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-gray-900 group-hover:text-[#f59e0b] transition-all truncate uppercase text-sm tracking-tight mb-2">
                    {product.title}
                  </h4>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={cn("fill-[#f59e0b] text-[#f59e0b]")} />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl font-black text-gray-900">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-xs text-gray-300 line-through font-bold">{formatPrice(product.oldPrice)}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={addedIds.includes(product.id)}
                    className={cn(
                      "w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95",
                      addedIds.includes(product.id) ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-[#f59e0b] hover:text-white"
                    )}
                  >
                    {addedIds.includes(product.id) ? <><Check size={14} /> Added</> : <><ShoppingCart size={14} /> Buy Now</>}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
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
