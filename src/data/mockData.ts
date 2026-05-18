export const formatPrice = (price: number) => {
  return "KES " + price.toLocaleString();
};

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  image?: string;
  attributes: { [key: string]: string }; // e.g. { color: 'Blue', size: 'XL' }
  stock: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  hoverImage: string;
  category: string;
  badge: string | null;
  isNew: boolean;
  onSale: boolean;
  description: string;
  specs: string[];
  variants?: ProductVariant[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone?: string;
  address?: string;
  avatar?: string;
  joinedAt: string;
  isBlocked?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  paymentMethod: 'M-Pesa' | 'Card';
  createdAt: string;
  trackingNumber?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  transactionId: string;
  createdAt: string;
}

export const users: User[] = [
  {
    id: '1',
    name: 'Vincent Admin',
    email: 'admin@lumina.com',
    role: 'admin',
    joinedAt: '2023-01-01',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    phone: '+254 712 345 678',
    address: 'Westlands, Nairobi',
    joinedAt: '2023-05-10',
    avatar: 'https://i.pravatar.cc/150?u=john'
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-1001',
    userId: '2',
    userName: 'John Doe',
    items: [
      {
        id: 1,
        title: "Premium Wireless Headphones",
        price: 34500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600"
      }
    ],
    total: 34500,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'M-Pesa',
    createdAt: '2023-11-15T10:30:00Z',
    trackingNumber: 'LUM-882299'
  },
  {
    id: 'ORD-1002',
    userId: '2',
    userName: 'John Doe',
    items: [
      {
        id: 2,
        title: "Luxury Leather Watch",
        price: 24500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600"
      }
    ],
    total: 24500,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'M-Pesa',
    createdAt: '2023-11-18T14:20:00Z'
  }
];

export const payments: Payment[] = [
  {
    id: 'PAY-5001',
    orderId: 'ORD-1001',
    userId: '2',
    amount: 34500,
    method: 'M-Pesa',
    status: 'completed',
    transactionId: 'RKJ8299KSL',
    createdAt: '2023-11-15T10:35:00Z'
  }
];

export const categories = [
  { id: 1, name: "Watches", icon: "Watch", count: "128 Items" },
  { id: 2, name: "Towels Cloud", icon: "Cloud", count: "85 Items" },
  { id: 3, name: "Smartphones", icon: "Smartphone", count: "450 Items" },
  { id: 4, name: "Headphones", icon: "Headphones", count: "92 Items" },
  { id: 5, name: "Fashion", icon: "Shirt", count: "1.2k Items" },
  { id: 6, name: "Shoes & Accessories", icon: "ShoppingBag", count: "340 Items" },
  { id: 7, name: "Furnitures", icon: "Lamp", count: "150 Items" },
];

export const products: Product[] = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 45000,
    oldPrice: 52000,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
    images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600"
    ],
    hoverImage: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    badge: "-15%",
    isNew: false,
    onSale: true,
    description: "Experience world-leading noise cancellation with the Sony WH-1000XM5. Featuring two processors controlling eight microphones, and exceptional call quality.",
    specs: ["Active Noise Cancellation", "30-Hour Battery Life", "Speak-to-Chat Technology", "Multipoint Connection"],
    variants: [
        { id: 'v1', sku: 'sony-xm5-black', price: 45000, stock: 15, attributes: { Color: 'Black' } },
        { id: 'v2', sku: 'sony-xm5-silver', price: 47000, stock: 8, attributes: { Color: 'Silver' } }
    ]
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    price: 165000,
    oldPrice: null,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600",
    images: [
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1610792516307-ea5ace2c439f?auto=format&fit=crop&q=80&w=600"
    ],
    hoverImage: "https://images.unsplash.com/photo-1610792516307-ea5ace2c439f?auto=format&fit=crop&q=80&w=600",
    category: "Electronics",
    badge: "Limited",
    isNew: true,
    onSale: false,
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra, you can unleash whole new levels of creativity, productivity and possibility.",
    specs: ["Snapdragon 8 Gen 3", "200MP Main Camera", "S Pen Included", "Titanium Frame"],
    variants: [
        { id: 'v3', sku: 's24u-256-gray', price: 165000, stock: 10, attributes: { Storage: '256GB', Color: 'Titanium Gray' } },
        { id: 'v4', sku: 's24u-512-black', price: 185000, stock: 5, attributes: { Storage: '512GB', Color: 'Titanium Black' } }
    ]
  },
  {
    id: 3,
    title: "Eco-Friendly Bamboo Coffee Mug",
    price: 1800,
    oldPrice: null,
    rating: 4.5,
    reviews: 54,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    images: ["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600"],
    hoverImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    category: "Home & Living",
    badge: "Eco",
    isNew: true,
    onSale: false,
    description: "Sustainably sourced bamboo coffee mug with a spill-proof lid. BPA-free and biodegradable.",
    specs: ["Sustainably Sourced Bamboo", "BPA Free", "Spill-proof Lid", "400ml Capacity"],
    variants: [
        { id: 'v7', sku: 'bamboo-mug-natural', price: 1800, stock: 100, attributes: { Color: 'Natural' } },
        { id: 'v8', sku: 'bamboo-mug-dark', price: 1800, stock: 50, attributes: { Color: 'Dark Brown' } }
    ]
  }
];

export const heroSlides = [
  {
    id: 1,
    title: "FASHION SEASON SALE",
    subtitle: "HOT RIGHT NOW",
    description: "Discover our latest collection of premium fashion wear in Kenya. Up to 50% off on selected items.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200",
    bgColor: "#fce7f3", 
  },
  {
    id: 2,
    title: "MODERN ACCESSORIES",
    subtitle: "NEW ARRIVALS",
    description: "Check out our newest tech gadgets and lifestyle products designed for the contemporary Kenyan user.",
    image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1200",
    bgColor: "#fdf4ff", 
  }
];

export const deals = {
  main: {
    id: 101,
    title: "Smart Watch Series 10",
    price: 18500,
    oldPrice: 25000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800",
    sold: 45,
    available: 55,
    endsAt: new Date(Date.now() + 86400000 * 3).toISOString(), 
  },
  sideProducts: products.slice(0, 4)
};
