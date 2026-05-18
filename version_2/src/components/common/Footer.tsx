import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, Send, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-10 md:pt-20 pb-24 md:pb-10">
      <div className="container mx-auto px-4">
        {/* Newsletter Section - Hidden on mobile */}
        <div className="hidden md:flex bg-[#f59e0b] rounded-[50px] p-8 md:p-16 mb-20 flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl shadow-amber-900/20">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase italic">Join the Lumina Club</h3>
            <p className="text-white/80 font-bold text-sm md:text-lg uppercase tracking-widest">Get 20% off your first Kenyan treasure</p>
          </div>
          <div className="w-full max-w-lg">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white/20 border-2 border-white/30 rounded-3xl py-6 px-8 text-white placeholder:text-white/60 focus:bg-white focus:text-gray-900 outline-none transition-all font-bold"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-[#f59e0b] p-4 rounded-2xl font-black hover:bg-gray-900 hover:text-white transition-all shadow-xl active:scale-95">
                <Send size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-b border-white/5 pb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-2 text-3xl font-black tracking-tighter text-white">
              <span className="bg-[#f59e0b] text-white p-2 rounded-xl">LM</span>
              <span className="italic">LUMINA</span>
            </Link>
            <p className="text-white/40 font-medium leading-relaxed">
              Kenya's premier premium multi-vendor marketplace. We bring the best of luxury and lifestyle products right to your doorstep.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#f59e0b] hover:text-white transition-all hover:scale-110">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10">Quick Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Shop Collections', 'Daily Deals', 'Best Selling', 'About Us'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-white/40 hover:text-[#f59e0b] hover:pl-2 transition-all font-bold text-sm block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10">Customer Care</h4>
            <ul className="space-y-4">
              {['My Account', 'Order Tracking', 'Wishlist', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-white/40 hover:text-[#f59e0b] hover:pl-2 transition-all font-bold text-sm block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-10">Contact Details</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#f59e0b]/10 p-3 rounded-xl text-[#f59e0b]">
                   <MapPin size={20} />
                </div>
                <div className="text-white/40 font-bold text-sm">
                   <p className="text-white">Nairobi HQ</p>
                   <p>Westlands Commercial Center, KE</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#f59e0b]/10 p-3 rounded-xl text-[#f59e0b]">
                   <Phone size={20} />
                </div>
                <div className="text-white/40 font-bold text-sm">
                   <p className="text-white">Call Us Anytime</p>
                   <p>+254 700 000 000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#f59e0b]/10 p-3 rounded-xl text-[#f59e0b]">
                   <Mail size={20} />
                </div>
                <div className="text-white/40 font-bold text-sm">
                   <p className="text-white">Email Support</p>
                   <p>hello@lumina.co.ke</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-white/20 font-black text-[10px] uppercase tracking-[0.4em]">
          <p>© {new Date().getFullYear()} LUMINA MARKETPLACE KENYA. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" className="h-6 grayscale opacity-30 px-1" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-3 grayscale opacity-30" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6 grayscale opacity-30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
