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
            className="relative bg-white w-full max-w-6xl rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 z-50 w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center hover:bg-[#ef4444] hover:text-white transition-all group active:scale-95"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform" />
            </button>

            {/* Left: Professional Photography Area */}
            <div className="w-full lg:w-1/2 bg-[#f8f9fa] relative group lg:min-h-[600px] overflow-hidden flex items-center justify-center p-6 md:p-12">
               <div className="absolute top-10 left-10 z-10 flex flex-col gap-3">
                    <span className="bg-[#f59e0b] text-white px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase italic shadow-xl">
                        {product.badge || 'FLASH SALE'}
                    </span>
                    <span className="bg-gray-900 text-white px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase italic shadow-xl">
                        AUTHENTIC KE
                    </span>
               </div>

               {/* Image Navigation */}
               {images.length > 1 && (
                 <>
                   <button onClick={prevImg} className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f59e0b] hover:text-white">
                      <ChevronLeft size={24} />
                   </button>
                   <button onClick={nextImg} className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#f59e0b] hover:text-white">
                      <ChevronRight size={24} />
                   </button>
                 </>
               )}
               
               <motion.img
                  key={currentImgIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  src={currentImage}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute bottom-10 inset-x-0 flex justify-center gap-2">
                  {images.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setCurrentImgIndex(i)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        i === currentImgIndex ? "bg-[#f59e0b] w-8" : "bg-gray-300"
                      )}
                    />
                  ))}
                </div>
            </div>

            {/* Right: Premium Information Area */}
            <div className="w-full lg:w-1/2 bg-white p-8 md:p-16 overflow-y-auto no-scrollbar">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[#f59e0b] font-black uppercase tracking-[0.3em] text-[10px] bg-amber-50 px-4 py-1.5 rounded-full italic border border-amber-100">
                        {product.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <Star size={14} className="fill-[#f59e0b] text-[#f59e0b]" />
                        <span className="text-xs font-black text-gray-900">{product.rating}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest ml-2 italic">({product.reviews} VERIFIED REVIEWS)</span>
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] uppercase tracking-tighter italic mb-8">
                    {product.title}
                  </h2>

                  <div className="flex items-end gap-6 mb-10 pb-8 border-b border-gray-50">
                    <span className="text-5xl font-black text-gray-900 tracking-tighter italic">{formatPrice(currentPrice)}</span>
                    {product.oldPrice && (
                      <span className="text-2xl text-gray-200 line-through font-black italic mb-1">{formatPrice(product.oldPrice)}</span>
                    )}
                    <span className="bg-emerald-50 text-emerald-500 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase italic mb-1">
                        In Stock
                    </span>
                  </div>
                </div>

                {/* Variants Section */}
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                       <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest italic">Choose Variant</h3>
                       {selectedVariant && (
                         <span className="text-[10px] font-bold text-[#f59e0b] italic">{selectedVariant.sku}</span>
                       )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {product.variants.map((variant: ProductVariant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={cn(
                            "px-6 py-4 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-widest italic",
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

                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-gray-900 font-black uppercase tracking-widest text-[10px] italic">
                    <Zap size={16} className="text-[#f59e0b]" /> Essential Description
                  </div>
                  <p className="text-gray-500 leading-relaxed font-bold text-sm md:text-base border-l-4 border-gray-100 pl-6 italic">
                    {product.description || "Indulge in the finest quality with this exclusive Lumina selection."}
                  </p>
                </div>

                <div className="pt-10 space-y-6">
                  <div className="flex gap-4">
                    <button
                      onClick={handleAddToCart}
                      disabled={added}
                      className={cn(
                        "flex-[2] py-8 rounded-[30px] font-black text-xs tracking-[0.4em] flex items-center justify-center gap-4 shadow-2xl transition-all active:scale-95 italic uppercase",
                        added ? "bg-emerald-500 text-white" : "bg-gray-900 text-white hover:bg-[#f59e0b]"
                      )}
                    >
                      {added ? (
                        <>
                          <Check size={24} /> ADDED TO BASKET
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={24} /> ADD TO BASKET
                        </>
                      )}
                    </button>
                    <button 
                        onClick={() => setIsLiked(!isLiked)}
                        className={cn(
                            "flex-1 rounded-[30px] border-2 border-gray-100 flex items-center justify-center transition-all hover:border-[#f59e0b] group active:scale-95",
                            isLiked ? "bg-[#f59e0b]/5 border-[#f59e0b] text-[#f59e0b]" : "text-gray-300"
                        )}
                    >
                      <Heart size={28} className={cn("group-hover:scale-110 transition-transform", isLiked && "fill-[#f59e0b]")} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
