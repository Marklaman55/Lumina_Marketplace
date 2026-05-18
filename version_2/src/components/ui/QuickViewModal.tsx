import { X, Star, ShoppingBag, Check, Heart, Share2, ShieldCheck, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { formatPrice, ProductVariant } from '@/src/data/mockData';

interface QuickViewModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: any, variant?: any) => void;
}

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }: QuickViewModalProps) {
  const [added, setAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  const images = product?.images?.length ? product.images : [product?.image];

  useEffect(() => {
    if (product) {
      setCurrentImgIndex(0);
      setSelectedVariant(product.variants?.[0] || null);
    }
  }, [product]);

  if (!product) return null;

  const currentPrice = selectedVariant?.price || product.price;
  const currentImage = selectedVariant?.image || images[currentImgIndex];

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const nextImg = () => setCurrentImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative bg-white w-full max-w-lg md:max-w-6xl md:rounded-[60px] rounded-t-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh]"
          >
            {/* Close Button - More discreet on mobile */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center hover:bg-[#ef4444] hover:text-white transition-all group active:scale-95"
            >
              <X size={20} className="md:size-24 group-hover:rotate-90 transition-transform" />
            </button>

            {/* Product Image Section - Dominate at top */}
            <div className="w-full md:w-1/2 bg-[#f8f9fa] relative group min-h-[350px] md:min-h-[600px] overflow-hidden flex items-center justify-center p-6 md:p-12">
               <div className="absolute top-4 left-4 md:top-10 md:left-10 z-10 flex flex-col gap-2 md:gap-3">
                    {product.badge && (
                      <span className="bg-[#f59e0b] text-white px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[8px] md:text-[10px] font-black tracking-widest uppercase italic shadow-xl">
                          {product.badge}
                      </span>
                    )}
                    <span className="bg-gray-900 text-white px-4 md:px-5 py-1.5 md:py-2 rounded-full text-[8px] md:text-[10px] font-black tracking-widest uppercase italic shadow-xl">
                        AUTHENTIC KE
                    </span>
               </div>

               {/* Image Navigation */}
               {images.length > 1 && (
                 <>
                   <button onClick={prevImg} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center transition-all hover:bg-[#f59e0b] hover:text-white">
                      <ChevronLeft size={20} />
                   </button>
                   <button onClick={nextImg} className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center transition-all hover:bg-[#f59e0b] hover:text-white">
                      <ChevronRight size={20} />
                   </button>
                 </>
               )}
               
               <motion.img
                  key={currentImgIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={currentImage}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-6 md:bottom-10 inset-x-0 flex justify-center gap-1.5">
                  {images.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentImgIndex(i)}
                      className={cn(
                        "w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all",
                        i === currentImgIndex ? "bg-[#f59e0b] w-6 md:w-8" : "bg-gray-300"
                      )}
                    />
                  ))}
                </div>
            </div>

            {/* Product Information Container */}
            <div className="w-full md:w-1/2 bg-white p-6 md:p-16 overflow-y-auto no-scrollbar pb-32 md:pb-16">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-end gap-3 md:gap-6">
                      <span className="text-2xl md:text-5xl font-black text-gray-900 tracking-tighter italic">{formatPrice(currentPrice)}</span>
                      {product.oldPrice && (
                        <span className="text-sm md:text-2xl text-gray-300 line-through font-black italic mb-0.5 md:mb-1">{formatPrice(product.oldPrice)}</span>
                      )}
                    </div>
                    {product.badge && product.badge.includes('%') && (
                      <span className="bg-red-50 text-red-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase italic">
                        SAVE {product.badge.replace('-', '')}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl md:text-5xl font-black text-gray-900 leading-tight md:leading-[1.1] uppercase tracking-tight md:tracking-tighter italic mb-4 md:mb-8">
                    {product.title}
                  </h2>

                  <div className="relative">
                    <p className="text-gray-500 font-medium text-xs md:text-base leading-relaxed italic line-clamp-2 md:line-clamp-none">
                      {product.description || "Indulge in the finest quality with this exclusive Lumina selection."}
                    </p>
                  </div>
                </div>

                {/* Promotions Row (If badge exists and is not just a % discount) */}
                {product.badge && !product.badge.includes('%') && (
                  <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                    <div className="flex items-center gap-3">
                      <Zap size={16} className="text-[#f59e0b]" />
                      <span className="text-[10px] font-black text-amber-900 uppercase tracking-widest italic">{product.badge} PROMOTION</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#f59e0b] uppercase tracking-widest italic flex items-center gap-1">
                      Details <ChevronRight size={12} />
                    </span>
                  </div>
                )}

                {/* Shipping Row (Optional location placeholder if we want to show it, though mockData doesn't have it explicitly, we can use static text for Lumina theme) */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={16} className="text-emerald-500" />
                      <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest italic">Shipping To</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic flex items-center gap-1">
                      Nairobi, KE <ChevronRight size={12} />
                    </span>
                </div>

                {/* Variants Section */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-4 md:space-y-6">
                    <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest italic">Options Available</h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {product.variants.map((variant: ProductVariant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={cn(
                            "px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 transition-all font-black text-[10px] md:text-xs uppercase tracking-widest italic",
                            selectedVariant?.id === variant.id 
                              ? "border-[#f59e0b] bg-[#f59e0b] text-white shadow-xl shadow-amber-100" 
                              : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200"
                          )}
                        >
                          {Object.values(variant.attributes).join(' / ')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fixed Bottom Action Bar for Mobile / Floating for Desktop */}
                <div className="fixed md:absolute bottom-0 left-0 right-0 p-4 md:p-10 bg-white/80 backdrop-blur-2xl border-t border-gray-100 flex gap-3 z-[60]">
                    <button
                      onClick={handleAddToCart}
                      disabled={added}
                      className={cn(
                        "flex-[1.2] py-4 md:py-8 rounded-2xl md:rounded-[30px] font-black text-[10px] md:text-xs tracking-widest md:tracking-[0.4em] flex items-center justify-center gap-3 md:gap-4 shadow-2xl transition-all active:scale-95 italic uppercase",
                        added ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      )}
                    >
                      {added ? <Check size={18} /> : <ShoppingBag size={18} />}
                      {added ? "ADDED" : "CART"}
                    </button>
                    <button
                      onClick={() => {
                        handleAddToCart();
                        // In a real app we'd navigate to checkout 
                        // For now we just close the modal to see the cart update
                        onClose();
                      }}
                      className="flex-[2] py-4 md:py-8 rounded-2xl md:rounded-[30px] bg-gray-900 text-white hover:bg-[#f59e0b] font-black text-[10px] md:text-xs tracking-widest md:tracking-[0.4em] shadow-2xl transition-all active:scale-95 italic uppercase"
                    >
                      ORDER NOW
                    </button>
                    <button 
                        onClick={() => setIsLiked(!isLiked)}
                        className={cn(
                            "w-14 md:w-20 rounded-2xl md:rounded-[30px] border-2 border-gray-100 flex items-center justify-center transition-all hover:border-[#f59e0b] group active:scale-95",
                            isLiked ? "bg-[#f59e0b]/5 border-[#f59e0b] text-[#f59e0b]" : "text-gray-300"
                        )}
                    >
                      <Heart size={20} className={cn("group-hover:scale-110 transition-transform", isLiked && "fill-[#f59e0b]")} />
                    </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
