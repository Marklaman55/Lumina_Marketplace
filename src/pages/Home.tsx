import Hero from '@/src/components/home/Hero';
import Features from '@/src/components/home/Features';
import Categories from '@/src/components/home/Categories';
import Deals from '@/src/components/home/Deals';
import Banners from '@/src/components/home/Banners';
import FeaturedProducts from '@/src/components/home/FeaturedProducts';
import { useShop } from '@/src/context/ShopContext';
import SEO from '@/src/components/seo/SEO';

interface HomeProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export default function Home({ selectedCategory, setSelectedCategory }: HomeProps) {
  const { addToCart } = useShop();

  return (
    <div className="flex flex-col">
      <SEO 
        title="Lumina Marketplace - Premium Online Shopping"
        description="Discover the latest fashion, electronics, home goods, and more at Lumina Marketplace. Enjoy secure shopping, fast delivery, and excellent customer service."
        image="https://example.com/og-image.jpg" // Replace with actual OG image URL
        url="https://lumina-marketplace.vercel.app" // Replace with actual URL
        siteName="Lumina Marketplace"
        twitterHandle="@lumina_market"
      />
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
