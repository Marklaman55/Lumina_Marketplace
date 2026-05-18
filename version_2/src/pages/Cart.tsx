import { useState, useEffect } from 'react';
import { useShop } from '@/src/context/ShopContext';
import { formatPrice } from '@/src/data/mockData';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 350;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-[#fff7ed] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={48} className="text-[#f59e0b]" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our premium collections to get started.</p>
        <Link to="/" className="inline-flex items-center gap-3 bg-[#f59e0b] text-white px-10 py-4 rounded-full font-black shadow-xl shadow-amber-100 hover:bg-gray-900 transition-all">
          <ArrowLeft size={20} />
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Your Shopping Cart</h1>
        <div className="h-1.5 w-24 bg-[#f59e0b] mt-3 rounded-full mx-auto lg:mx-0"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.variant?.sku || 'no-var'}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white border border-gray-100 rounded-[30px] p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-24 h-24 bg-[#f8f9fa] rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                
                <div className="flex-1 w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-center sm:text-left">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                    {item.variant && (
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                        {Object.entries(item.variant.attributes).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                      </p>
                    )}
                    <p className="text-[#f59e0b] font-black text-lg mt-1">{formatPrice(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-4 bg-[#f8f9fa] p-1 rounded-xl">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?.sku)}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-gray-500 hover:text-[#f59e0b] transition-colors shadow-sm"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-black">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?.sku)}
                      className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-gray-500 hover:text-[#f59e0b] transition-colors shadow-sm"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-center sm:text-right min-w-[120px]">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Subtotal</p>
                    <p className="text-xl font-black text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id, item.variant?.sku)}
                    className="p-3 text-red-400 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-[40px] p-8 shadow-xl sticky top-24">
            <h2 className="text-2xl font-black text-gray-900 mb-8 border-b pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Delivery Fee</span>
                <span className="font-bold text-emerald-500">{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
              </div>
              <div className="pt-4 border-t border-dashed border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-black text-[#f59e0b]">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-[#f59e0b] transition-all shadow-xl active:scale-95 mb-4"
            >
              PROCEED TO CHECKOUT
            </button>

            <div className="flex items-center gap-2 justify-center text-[#10b981] font-bold text-sm bg-[#ecfdf5] py-2 rounded-xl">
              <CheckCircle2 size={16} />
              Secure M-Pesa Checkout Available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
