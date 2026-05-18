import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products as initialProducts, Product } from '@/src/data/mockData';

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  variant?: {
    sku: string;
    attributes: Record<string, string>;
  };
}

interface Notification {
  message: string;
  type: 'success' | 'error';
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: number[];
  inventory: Product[];
  notification: Notification | null;
  addToCart: (product: any, variant?: any) => void;
  removeFromCart: (id: number, variantSku?: string) => void;
  updateQuantity: (id: number, quantity: number, variantSku?: string) => void;
  toggleWishlist: (id: number) => void;
  clearCart: () => void;
  showNotification: (message: string, type?: 'success' | 'error') => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<Product[]>(() => {
    const saved = localStorage.getItem('lumina_inventory');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lumina_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('lumina_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [notification, setNotification] = useState<Notification | null>(null);

  // Sync inventory changes from other tabs/contexts
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'lumina_inventory' && e.newValue) {
        setInventory(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumina_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product: any, variant?: any) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        (!variant || item.variant?.sku === variant.sku)
      );
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && (!variant || item.variant?.sku === variant.sku)) 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
        );
      }
      return [...prev, { 
        id: product.id,
        title: product.title,
        price: variant?.price || product.price,
        image: variant?.image || product.image,
        quantity: 1,
        variant: variant ? { sku: variant.sku, attributes: variant.attributes } : undefined
      }];
    });
    showNotification(`Added ${product.title} to your collection.`);
  };

  const removeFromCart = (id: number, variantSku?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && (!variantSku || item.variant?.sku === variantSku))));
  };

  const updateQuantity = (id: number, quantity: number, variantSku?: string) => {
    setCart(prev => prev.map(item => 
      (item.id === id && (!variantSku || item.variant?.sku === variantSku)) 
      ? { ...item, quantity: Math.max(1, quantity) } 
      : item
    ));
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const clearCart = () => setCart([]);

  return (
    <ShopContext.Provider value={{ cart, wishlist, inventory, notification, addToCart, removeFromCart, updateQuantity, toggleWishlist, clearCart, showNotification }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
}
