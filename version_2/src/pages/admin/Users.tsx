import { useState } from 'react';
import { useAdmin } from '@/src/context/AdminContext';
import { Search, Filter, Mail, Phone, Calendar, Shield, ShieldOff, Trash2, MoreHorizontal, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminUsers() {
  const { users, updateUserStatus, deleteUser } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [confirmName, setConfirmName] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (confirmName === userToDelete.name) {
      deleteUser(userToDelete.id);
      setUserToDelete(null);
      setConfirmName('');
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tight text-gray-900">User Directory</h1>
          <p className="text-gray-500 font-medium text-sm">Access control and system account oversight</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6 bg-gray-50/30">
          <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[20px] border border-gray-100 w-full lg:w-[400px] shadow-sm group focus-within:border-[#f59e0b] focus-within:ring-4 focus-within:ring-amber-50 transition-all">
            <Search size={20} className="text-gray-400 group-focus-within:text-[#f59e0b]" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-gray-300" 
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
                {['All', 'Admins', 'Customers'].map((tab) => (
                    <button key={tab} className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">
                        {tab}
                    </button>
                ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Identity</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Contact / Location</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Permission</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user, idx) => (
                <tr key={user.id} className={cn(
                  "hover:bg-[#fff7ed]/50 transition-all duration-300 group",
                  idx % 2 === 1 ? "bg-gray-50/30" : "bg-white"
                )}>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-[22px] overflow-hidden bg-white shadow-md border-2 border-white ring-1 ring-gray-100 transition-transform group-hover:scale-110 duration-500">
                        {user.avatar ? (
                          <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-amber-50 flex items-center justify-center font-black text-[#f59e0b] text-xl">
                            {user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 text-lg tracking-tight group-hover:text-[#f59e0b] transition-colors">{user.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Joined {user.joinedAt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                            <Mail size={14} className="text-gray-300" />
                            {user.email}
                        </div>
                        {user.phone && (
                            <div className="flex items-center gap-3 text-xs font-medium text-gray-400 italic">
                                <Phone size={14} className="text-gray-300" />
                                {user.phone}
                            </div>
                        )}
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm",
                        user.role === 'admin' ? "bg-amber-100 text-amber-700 bg-opacity-50" : "bg-gray-100 text-gray-500"
                    )}>
                        {user.role === 'admin' ? <Shield size={12} /> : <Calendar size={12} />}
                        {user.role}
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className={cn(
                      "inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] border transition-all",
                      user.isBlocked 
                        ? "bg-red-50 text-red-500 border-red-100" 
                        : "bg-green-50 text-green-600 border-green-100"
                    )}>
                      <div className={cn(
                        "w-2 h-2 rounded-full animate-pulse",
                        user.isBlocked ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                      )} />
                      {user.isBlocked ? 'Restricted' : 'Active'}
                    </div>
                  </td>
                  <td className="px-8 py-8 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <button 
                        onClick={() => updateUserStatus(user.id, !user.isBlocked)}
                        className={cn(
                            "p-3 rounded-2xl shadow-sm border transition-all hover:scale-110",
                            user.isBlocked 
                             ? "text-green-600 bg-white border-green-100 hover:bg-green-50" 
                             : "text-gray-400 bg-white border-gray-100 hover:text-[#f59e0b] hover:border-[#f59e0b]"
                        )}
                      >
                        {user.isBlocked ? <Shield size={20} /> : <ShieldOff size={20} />}
                      </button>
                      <button 
                        onClick={() => setUserToDelete(user)}
                        className="p-3 text-red-400 bg-white border border-gray-100 rounded-2xl shadow-sm transition-all hover:scale-110 hover:text-red-600 hover:border-red-200"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="lg:hidden p-6 space-y-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm border-2 border-white ring-1 ring-gray-50">
                        {user.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-amber-50 flex items-center justify-center font-black text-[#f59e0b]">{user.name.charAt(0)}</div>}
                    </div>
                    <div>
                        <h3 className="font-black text-gray-900 tracking-tight">{user.name}</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Joined {user.joinedAt}</p>
                    </div>
                    <div className="ml-auto">
                        <div className={cn(
                            "px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest",
                            user.role === 'admin' ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"
                        )}>
                            {user.role}
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pb-4 border-b border-gray-50">
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                        <Mail size={14} className="text-gray-300" />
                        {user.email}
                    </div>
                    {user.phone && (
                        <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
                            <Phone size={14} className="text-gray-300" />
                            {user.phone}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest border",
                      user.isBlocked ? "bg-red-50 text-red-500 border-red-100" : "bg-green-50 text-green-600 border-green-100"
                    )}>
                      <div className={cn("w-2 h-2 rounded-full", user.isBlocked ? "bg-red-500" : "bg-green-500")} />
                      {user.isBlocked ? 'Access Restricted' : 'Active Account'}
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => updateUserStatus(user.id, !user.isBlocked)}
                            className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:text-[#f59e0b] transition-colors"
                        >
                            {user.isBlocked ? <Shield size={18} /> : <ShieldOff size={18} />}
                        </button>
                        <button 
                            onClick={() => setUserToDelete(user)}
                            className="p-3 bg-red-50 text-red-400 rounded-xl hover:text-red-600 transition-colors"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </div>
        {filteredUsers.length === 0 && (
          <div className="p-20 text-center">
            <div className="inline-flex p-6 bg-gray-50 rounded-full mb-6">
              <Search size={40} className="text-gray-200" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">No Users Found</h3>
            <p className="text-gray-400 font-medium">Try broadening your search term</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {userToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-24">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUserToDelete(null)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl p-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-red-500"></div>
              
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mb-2">
                  <AlertTriangle size={40} />
                </div>
                
                <div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">TERMINATE ACCOUNT?</h3>
                  <p className="text-gray-500 font-medium mt-3 px-4">
                    This action will permanently delete <span className="font-black text-gray-900">{userToDelete.name}'s</span> account. 
                    This cannot be reversed.
                  </p>
                </div>

                <div className="w-full space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Type <span className="text-gray-900 font-black">{userToDelete.name}</span> to confirm</p>
                  <input 
                    type="text" 
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                    placeholder="User's full name"
                    className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-red-500 rounded-3xl py-5 px-8 outline-none font-black transition-all text-center"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 w-full pt-4">
                  <button 
                    onClick={() => setUserToDelete(null)}
                    className="py-5 rounded-[28px] font-black text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all bg-gray-50 group flex items-center justify-center gap-2"
                  >
                    <X size={18} /> Cancel
                  </button>
                  <button 
                    onClick={handleDelete}
                    disabled={confirmName !== userToDelete.name}
                    className="py-5 rounded-[28px] font-black text-xs uppercase tracking-widest text-white shadow-2xl shadow-red-100 transition-all bg-red-500 hover:bg-gray-900 disabled:opacity-30 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} className="group-hover:animate-bounce" /> Delete User
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
