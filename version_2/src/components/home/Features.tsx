import { Truck, ShieldCheck, Headphones, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Orders over KES 5,000",
    color: "bg-[#fff7ed]",
    iconColor: "text-[#f59e0b]"
  },
  {
    icon: ShieldCheck,
    title: "M-Pesa Secure",
    description: "100% Secure Payment",
    color: "bg-[#ecfdf5]",
    iconColor: "text-[#10b981]"
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30 Days Return Policy",
    color: "bg-[#fdf2f8]",
    iconColor: "text-[#ec4899]"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated KE Support",
    color: "bg-[#eff6ff]",
    iconColor: "text-[#3b82f6]"
  }
];

export default function Features() {
  return (
    <section className="py-12 md:py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 md:p-8 rounded-[30px] md:rounded-[40px] border border-gray-50 flex md:flex-col items-center text-left md:text-center hover:shadow-2xl hover:shadow-amber-50 transition-all duration-500 bg-[#fafafa] gap-6 md:gap-0"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl ${feature.color} flex items-center justify-center md:mb-6 transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                <feature.icon size={28} className={feature.iconColor} />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-gray-900 md:mb-2 uppercase tracking-tighter">{feature.title}</h3>
                <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
