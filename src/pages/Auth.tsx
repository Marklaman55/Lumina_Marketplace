import { useState, FormEvent } from 'react';
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'admin'
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let authenticatedUser;
      if (isLogin) {
        authenticatedUser = await login(formData.email, formData.password);
      } else {
        authenticatedUser = await register(formData);
      }
      
      setIsLoading(false);
      
      // Role-based redirection
      if (authenticatedUser?.role === 'admin') {
        navigate('/admin/orders');
      } else {
        navigate('/shop');
      }
    } catch (error: any) {
      setIsLoading(false);
      alert(error.message || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 py-20 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50 rounded-full -ml-48 -mb-48 blur-3xl opacity-60"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-xl rounded-[60px] shadow-2xl p-10 md:p-16 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 text-3xl font-black mb-4">
            <span className="bg-[#f59e0b] text-white p-2 rounded-2xl">LM</span>
            <span className="text-gray-900 uppercase italic">Lumina</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            {isLogin ? 'Welcome Back' : 'Join Our Marketplace'}
          </h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">
            The Premium Kenyan Shopping Experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
               <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
               <div className="relative">
                 <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                 <input 
                   type="text" 
                   required 
                   placeholder="E.g. John Doe"
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   className="w-full bg-gray-50 border-2 border-transparent focus:border-[#f59e0b] rounded-3xl py-5 pl-16 pr-8 text-sm font-bold outline-none transition-all"
                 />
               </div>
            </div>
          )}

          <div className="space-y-2">
             <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
             <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="email" 
                  required 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#f59e0b] rounded-3xl py-5 pl-16 pr-8 text-sm font-bold outline-none transition-all"
                />
              </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
               <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
               <div className="relative">
                 <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                 <input 
                   type="tel" 
                   required 
                   placeholder="0712 345 678"
                   value={formData.phone}
                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
                   className="w-full bg-gray-50 border-2 border-transparent focus:border-[#f59e0b] rounded-3xl py-5 pl-16 pr-8 text-sm font-bold outline-none transition-all"
                 />
               </div>
            </div>
          )}

          <div className="space-y-2">
             <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Password</label>
             <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-[#f59e0b] rounded-3xl py-5 pl-16 pr-16 text-sm font-bold outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f59e0b]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
          </div>

          {!isLogin && (
            <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Select Role</label>
                <div className="flex bg-gray-50 p-1.5 rounded-3xl border-2 border-transparent focus-within:border-[#f59e0b] transition-all">
                    {(['user', 'admin'] as const).map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setFormData({ ...formData, role: r })}
                            className={cn(
                                "flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                formData.role === r ? "bg-white text-gray-900 shadow-sm" : "text-gray-400"
                            )}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>
          )}



          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-900 text-white rounded-[25px] py-6 font-black text-lg hover:bg-[#f59e0b] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <> <Loader2 className="animate-spin" /> {isLogin ? 'Authenticating...' : 'Creating Account...'} </>
            ) : (
              <> {isLogin ? 'LOG IN' : 'CREATE ACCOUNT'} <ArrowRight size={22} /> </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center text-gray-400 font-bold">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#f59e0b] ml-2 hover:underline tracking-tight"
            >
                {isLogin ? 'Register Here' : 'Login Instead'}
            </button>
          </p>
        </div>

        {/* Social Link simulation */}
        <div className="mt-12 flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 w-full">
                <div className="flex-1 h-[1px] bg-gray-100"></div>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Quick Auth</span>
                <div className="flex-1 h-[1px] bg-gray-100"></div>
            </div>
            <div className="flex items-center justify-center gap-6">
                <button className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-white hover:shadow-xl transition-all"><img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" /></button>
                <button className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-white hover:shadow-xl transition-all text-blue-600"><img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-6 h-6" /></button>
            </div>
        </div>
      </motion.div>
    </div>
  );
}