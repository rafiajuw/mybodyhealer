import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import ProductCarousel from '@/app/components/ProductCarousel';
import Features from '@/app/components/Features';
import Introduction from '@/app/components/Introduction';
import Categories from '@/app/components/Categories';
import GlobalImpact from '@/app/components/GlobalImpact';
import Products from '@/app/components/Products';
import Mission from '@/app/components/Mission';
import Testimonials from '@/app/components/Testimonials';
import Newsletter from '@/app/components/Newsletter';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <Hero />
        <ProductCarousel />
        <Features />
        <Introduction />
        <Categories />
        <GlobalImpact />
        <Products />
        <Mission />
        <Testimonials />
        <Newsletter />
      </div>
      <Footer />
    </main>
  );
}