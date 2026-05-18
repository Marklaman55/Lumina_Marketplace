import FeaturedProducts from '@/src/components/home/FeaturedProducts';
import Categories from '@/src/components/home/Categories';
import { useShop } from '@/src/context/ShopContext';
import { useState } from 'react';

export default function Shop() {
  const { addToCart } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="flex flex-col gap-12 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-display font-black tracking-tighter mb-4 text-gray-900 capitalize">
            {selectedCategory === 'All' ? 'Our Marketplace' : selectedCategory}
          </h1>
          <p className="text-gray-500 font-medium text-lg leading-relaxed">
            Discover a curated selection of premium Kenyan goods. From artisanal crafts to modern electronics, we bring the best to your doorstep.
          </p>
        </div>
      </div>
      
      <Categories onSelectCategory={setSelectedCategory} />
      
      <div id="featured-products">
        <FeaturedProducts 
          onAddToCart={addToCart} 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
}
