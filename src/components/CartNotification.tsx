import { useShop } from '@/src/context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function CartNotification() {
  const { notification } = useShop();

  return (
    <AnimatePresence>
      {notification && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-full max-w-sm px-4"
        >
          <div className={cn(
            "bg-white rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border flex items-center gap-4 transition-all",
            notification.type === 'success' ? "border-green-100" : "border-red-100"
          )}>
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
              notification.type === 'success' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            )}>
              {notification.type === 'success' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
            </div>
            
            <div className="flex-grow">
              <p className="text-sm font-black text-gray-900 leading-tight">
                {notification.type === 'success' ? 'ACTION SUCCESS' : 'ACTION FAILED'}
              </p>
              <p className="text-xs text-gray-500 font-bold mt-0.5">{notification.message}</p>
            </div>

            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
