import { useState, FormEvent } from 'react';
import { useShop } from '@/src/context/ShopContext';
import { formatPrice } from '@/src/data/mockData';
import { Smartphone, ShieldCheck, CheckCircle2, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Checkout() {
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 350;
  const total = subtotal + deliveryFee;

  const handleMpesaPay = async (e: FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsProcessing(true);
    // Simulate STK Push delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Simulate payment confirmation and clearing
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-gray-400 hover:text-[#f59e0b] font-bold mb-4">
          <ArrowLeft size={20} /> BACK TO CART
        </button>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Checkout</h1>
        <div className="h-1.5 w-24 bg-[#f59e0b] mt-3 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Payment Methods */}
        <div className="space-y-10">
          <div className="bg-white border border-gray-100 rounded-[40px] p-8 shadow-xl overflow-hidden relative">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#48bb78] text-white p-3 rounded-2xl shadow-lg shadow-green-100">
                <Smartphone size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">M-Pesa Payment</h2>
                <p className="text-gray-400 font-semibold text-sm">Pay securely via Safaricom M-Pesa</p>
              </div>
            </div>

            <form onSubmit={handleMpesaPay} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-600 uppercase tracking-widest pl-2">M-Pesa Phone Number</label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold border-r pr-4 border-gray-100">
                    +254
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-[#48bb78] rounded-2xl py-5 pl-24 pr-8 text-lg font-black outline-none transition-all"
                  />
                </div>
                <p className="text-[10px] text-gray-400 italic pl-2">An STK Push request will be sent to this number.</p>
              </div>

              <button
                type="submit"
                disabled={isProcessing || isSuccess}
                className={cn(
                  "w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95",
                  isSuccess ? "bg-emerald-500 text-white" : "bg-[#48bb78] text-white hover:bg-[#38a169]"
                )}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={24} className="animate-spin" /> SENDING STK PUSH...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 size={24} /> REQUEST SENT!
                  </>
                ) : (
                  <>
                    PAY {formatPrice(total)}
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" className="h-10 object-contain grayscale" />
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-[30px] border border-dashed border-gray-200">
            <Lock className="text-gray-400" size={32} />
            <div>
              <h4 className="font-bold text-gray-900">Secure Checkout</h4>
              <p className="text-sm text-gray-500">Your transaction is encrypted and secured by premium payment gateways.</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-8">
          <div className="bg-gray-50 border border-gray-100 rounded-[40px] p-8">
            <h3 className="text-xl font-black text-gray-900 mb-6 uppercase">Order Review</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0">
                  <div className="w-16 h-16 bg-white rounded-xl overflow-hidden p-1">
                    <img src={item.image} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-sm text-gray-900 line-clamp-1">{item.title}</h5>
                    <p className="text-xs text-gray-400">Qty: {item.quantity} x {formatPrice(item.price)}</p>
                  </div>
                  <p className="font-black text-gray-900 text-sm">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 border-t-2 border-dashed border-gray-200 pt-6">
                <div className="flex justify-between items-center text-gray-500">
                    <span className="font-medium">Subtotal Cost</span>
                    <span className="font-bold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                    <span className="font-medium">Delivery Charge</span>
                    <span className="font-bold text-emerald-500">{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-black text-gray-900">Total Payable</span>
                    <span className="text-3xl font-black text-[#f59e0b]">{formatPrice(total)}</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Simulation */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[50px] p-12 text-center max-w-lg relative shadow-2xl"
            >
              <div className="w-24 h-24 bg-[#ecfdf5] text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={56} className="animate-bounce" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">STK Push Sent Successfully!</h2>
              <p className="text-gray-500 font-medium mb-8">Please check your phone and enter your M-Pesa PIN to complete the payment for <b className="text-gray-900">{formatPrice(total)}</b>.</p>
              <div className="bg-[#48bb78] h-2 w-full rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: "100%" }} 
                    animate={{ width: "0%" }} 
                    transition={{ duration: 5 }} 
                    className="h-full bg-white/30" 
                />
              </div>
              <p className="text-[10px] items-center text-gray-400 mt-4 uppercase font-bold tracking-widest">Redirecting to Homepage...</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
