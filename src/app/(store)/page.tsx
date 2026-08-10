import HeroSlider from '@/components/home/HeroSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import HowItWorks from '@/components/home/HowItWorks';
import TrendingProducts from '@/components/home/TrendingProducts';
import FlashSales from '@/components/home/FlashSales';
import InspirationSection from '@/components/home/InspirationSection';
import StyleSection from '@/components/home/StyleSection';
import RoomCollections from '@/components/home/RoomCollections';

export default function HomePage() {
  return (
    <div>
      {/* Hero — needs position:relative so the pause button can overflow downward */}
      <div className="relative">
        <HeroSlider />
      </div>

      {/* Mobile: rounded card overlaps hero. Desktop: flat, no overlap */}
      <div className="relative bg-white rounded-t-[28px] -mt-6 md:rounded-t-none md:mt-0 z-10">
        <CategoryGrid />
        {/* Desktop: HowItWorks right after CategoryGrid */}
        <div className="hidden md:block">
          <HowItWorks />
        </div>
        <TrendingProducts />
        <FlashSales />
        <InspirationSection />
        <StyleSection />
        <RoomCollections />
        {/* Mobile: HowItWorks after RoomCollections */}
        <div className="md:hidden">
          <HowItWorks />
        </div>
      </div>
    </div>
  );
}
