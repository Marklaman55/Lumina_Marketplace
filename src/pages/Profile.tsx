import { useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { User, Mail, Phone, MapPin, Camera, Save, Lock, Bell, Shield } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'profile', name: 'Profile Details', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-10">
        <h1 className="text-4xl font-display font-black tracking-tighter mb-2">MY PROFILE</h1>
        <p className="text-gray-500">Manage your personal information and preferences</p>
      </div>

      <div className="grid lg:grid-cols-[350px_1fr] gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-gray-100/50 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#f59e0b]"></div>
            
            <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-amber-50 rounded-[40px] flex items-center justify-center text-[#f59e0b] text-4xl font-black border-4 border-white shadow-xl shadow-amber-100 relative overflow-hidden">
                   {user?.avatar ? (
                     <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                   ) : user?.name.charAt(0)}
                   
                   <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Camera size={24} />
                   </button>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
            </div>

            <h2 className="text-2xl font-black text-gray-900 mb-1">{user?.name}</h2>
            <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mb-6">{user?.role}</p>

            <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full bg-[#f59e0b] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-100 hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
                >
                    {isEditing ? <Save size={18} /> : <User size={18} />}
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-4 border border-gray-100 shadow-xl shadow-gray-100/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-3xl font-black text-sm transition-all",
                  activeTab === tab.id 
                    ? "bg-[#fff7ed] text-[#f59e0b]" 
                    : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <tab.icon size={20} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-100/50">
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                    <div className="relative group">
                       <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f59e0b] transition-colors" />
                       <input 
                         type="text" 
                         defaultValue={user?.name}
                         disabled={!isEditing}
                         className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 pl-14 pr-6 outline-none font-bold text-sm transition-all disabled:opacity-60"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                    <div className="relative group">
                       <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f59e0b] transition-colors" />
                       <input 
                         type="email" 
                         defaultValue={user?.email}
                         disabled={!isEditing}
                         className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 pl-14 pr-6 outline-none font-bold text-sm transition-all disabled:opacity-60"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Phone Number</label>
                    <div className="relative group">
                       <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f59e0b] transition-colors" />
                       <input 
                         type="tel" 
                         defaultValue="+254 712 345 678"
                         disabled={!isEditing}
                         className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 pl-14 pr-6 outline-none font-bold text-sm transition-all disabled:opacity-60"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Location</label>
                    <div className="relative group">
                       <MapPin size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f59e0b] transition-colors" />
                       <input 
                         type="text" 
                         defaultValue="Westlands, Nairobi, Kenya"
                         disabled={!isEditing}
                         className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 pl-14 pr-6 outline-none font-bold text-sm transition-all disabled:opacity-60"
                       />
                    </div>
                  </div>
               </div>

               <div className="pt-8 mt-8 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-gray-900 tracking-tight">Account Verification</h3>
                    <p className="text-sm text-gray-500 font-medium">Your account is fully verified and secure.</p>
                  </div>
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500">
                    <Shield size={24} />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               <h3 className="text-xl font-black text-gray-900 tracking-tight">Password Management</h3>
               <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-6 bg-gray-50 hover:bg-white border-2 border-transparent hover:border-[#f59e0b] rounded-[24px] transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#f59e0b]">
                           <Lock size={18} />
                        </div>
                        <div className="text-left">
                           <p className="font-bold text-gray-900 tracking-tight">Change Password</p>
                           <p className="text-xs text-gray-400">Update your account password regularly</p>
                        </div>
                     </div>
                     <motion.div whileHover={{ x: 5 }}>
                        <Save size={18} className="text-gray-300" />
                     </motion.div>
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
