import { useShop } from '@/src/context/ShopContext';
import { products, formatPrice } from '@/src/data/mockData';
import { ProductCard } from '@/src/components/home/FeaturedProducts';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Wishlist() {
  const { wishlist, addToCart } = useShop();
  
  const savedProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-[#fff7ed] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart size={48} className="text-[#f59e0b]" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Found something you like? Tap the heart icon to save it here for later.</p>
        <Link to="/" className="inline-flex items-center gap-3 bg-[#f59e0b] text-white px-10 py-4 rounded-full font-black shadow-xl shadow-amber-100 hover:bg-gray-900 transition-all">
          <ArrowLeft size={20} />
          ADD SOME ITEMS
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center lg:text-left">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Saved Items ({wishlist.length})</h1>
        <div className="h-1.5 w-24 bg-[#f59e0b] mt-3 rounded-full mx-auto lg:mx-0"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {savedProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard 
                product={product} 
                onAddToCart={addToCart} 
                onQuickView={() => {}} 
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
