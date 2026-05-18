import { Settings, Store, User, Bell, Shield, MapPin, Globe, Palette } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('store');

  const settingsTabs = [
    { id: 'store', name: 'Store Profile', icon: Store },
    { id: 'profile', name: 'My Account', icon: User },
    { id: 'notifications', name: 'System Notifications', icon: Bell },
    { id: 'security', name: 'Permissions', icon: Shield },
    { id: 'design', name: 'UI / Design', icon: Palette },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-black tracking-tighter text-gray-900">SYSTEM SETTINGS</h1>
          <p className="text-gray-500 font-medium">Configure your marketplace preferences and system parameters</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-10">
        <div className="bg-white p-4 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-100/50 h-fit">
            <div className="space-y-2">
                {settingsTabs.map((tab) => (
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

        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-100/50">
            {activeTab === 'store' && (
                <div className="space-y-10 animate-in fade-in duration-500">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Marketplace Name</label>
                            <input 
                                type="text" 
                                defaultValue="Lumina Marketplace"
                                className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 px-8 outline-none font-bold text-sm transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Support Email</label>
                            <input 
                                type="email" 
                                defaultValue="support@lumina.com"
                                className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 px-8 outline-none font-bold text-sm transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Store Currency</label>
                            <select className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 px-8 outline-none font-bold text-sm transition-all appearance-none cursor-pointer">
                                <option>Kenyan Shilling (KES)</option>
                                <option>US Dollar (USD)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Timezone</label>
                            <select className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 px-8 outline-none font-bold text-sm transition-all appearance-none cursor-pointer">
                                <option>Africa/Nairobi (GMT+3)</option>
                                <option>UTC</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-gray-50">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight mb-6">Business Location</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                             <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Address</label>
                                <input 
                                    type="text" 
                                    defaultValue="Westlands Business Park, Nairobi"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 px-8 outline-none font-bold text-sm transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Postal Code</label>
                                <input 
                                    type="text" 
                                    defaultValue="00100"
                                    className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-[#f59e0b] rounded-[24px] py-4 px-8 outline-none font-bold text-sm transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6">
                        <button className="px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">Discard</button>
                        <button className="px-12 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-gray-200 hover:bg-[#f59e0b] transition-all">Save Changes</button>
                    </div>
                </div>
            )}

            {activeTab === 'notifications' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">Notification Preferences</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Order Alerts', desc: 'Notify when a customer places a new order', active: true },
                            { name: 'Stock Warning', desc: 'Notify when products are low in stock', active: true },
                            { name: 'User Management', desc: 'Notify about new seller applications', active: false },
                            { name: 'System Logs', desc: 'Weekly analytics and performance reports', active: true },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-gray-200 transition-all group">
                                <div>
                                    <h4 className="font-bold text-gray-900 tracking-tight">{item.name}</h4>
                                    <p className="text-xs text-gray-400">{item.desc}</p>
                                </div>
                                <div className={cn(
                                    "w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300",
                                    item.active ? "bg-[#f59e0b]" : "bg-gray-300"
                                )}>
                                    <div className={cn(
                                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                                        item.active ? "left-7" : "left-1"
                                    )} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
