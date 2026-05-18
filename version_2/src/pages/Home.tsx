import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/src/components/home/Hero';
import Features from '@/src/components/home/Features';
import Categories from '@/src/components/home/Categories';
import Deals from '@/src/components/home/Deals';
import Banners from '@/src/components/home/Banners';
import FeaturedProducts from '@/src/components/home/FeaturedProducts';
import { useShop } from '@/src/context/ShopContext';
import { useIsMobile } from '@/src/hooks/useMediaQuery';

interface HomeProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export default function Home({ selectedCategory, setSelectedCategory }: HomeProps) {
  const { addToCart } = useShop();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      navigate('/shop', { replace: true });
    }
  }, [isMobile, navigate]);

  if (isMobile) return null;

  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Categories onSelectCategory={setSelectedCategory} />
      <Deals onAddToCart={addToCart} />
      <Banners />
      <FeaturedProducts 
        onAddToCart={addToCart} 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}
