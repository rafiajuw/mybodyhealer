import Hero from '@/app/components/Hero';
import ProductCarousel from '@/app/components/ProductCarousel';
import Features from '@/app/components/Features';
import Introduction from '@/app/components/Introduction';
import Categories from '@/app/components/Categories';
import GlobalImpact from '@/app/components/GlobalImpact';
import Products from '@/app/components/Products';
import Testimonials from '@/app/components/Testimonials';
import Newsletter from '@/app/components/Newsletter';

export default function Home() {
  return (
    <main className="flex flex-col gap-16">
      <Hero />
      <Introduction />
      <ProductCarousel />
      
      <Features />
      
      <Categories />
      <GlobalImpact />
      <Products />
      
      <Testimonials />
      <Newsletter />
    </main>
  );
}
