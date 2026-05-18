import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products as initialProducts, Product, orders as initialOrders, users as initialUsers, payments as initialPayments, categories as initialCategories, Order, User, Payment } from '@/src/data/mockData';

interface AdminContextType {
  inventory: Product[];
  orders: Order[];
  users: User[];
  payments: Payment[];
  categories: any[];
  addProduct: (product: any) => void;
  removeProduct: (id: number) => void;
  updateProduct: (id: number, data: any) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateUserStatus: (userId: string, isBlocked: boolean) => void;
  deleteUser: (userId: string) => void;
  addCategory: (category: any) => void;
  deleteCategory: (id: number) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lumina_inventory');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('lumina_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('lumina_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [payments] = useState<Payment[]>(initialPayments);

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('lumina_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  useEffect(() => {
    localStorage.setItem('lumina_inventory', JSON.stringify(inventory));
    localStorage.setItem('lumina_orders', JSON.stringify(orders));
    localStorage.setItem('lumina_users', JSON.stringify(users));
    localStorage.setItem('lumina_categories', JSON.stringify(categories));
  }, [inventory, orders, users, categories]);

  const addProduct = (product: any) => {
    setInventory(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const removeProduct = (id: number) => {
    setInventory(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = (id: number, data: any) => {
    setInventory(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const updateUserStatus = (userId: string, isBlocked: boolean) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isBlocked } : u));
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const addCategory = (category: any) => {
    setCategories(prev => [...prev, { ...category, id: Date.now() }]);
  };

  const deleteCategory = (id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <AdminContext.Provider value={{ 
      inventory, orders, users, payments, categories,
      addProduct, removeProduct, updateProduct, 
      updateOrderStatus, updateUserStatus, deleteUser,
      addCategory, deleteCategory
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}
