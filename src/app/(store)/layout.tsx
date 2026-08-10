import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import PrivacyConsent from '@/components/ui/PrivacyConsent';
import ChatButton from '@/components/ui/ChatButton';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* pb-[60px] on mobile so content clears the fixed bottom nav */}
      <main className="flex-1 pb-[60px] md:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
      <PrivacyConsent />
      <ChatButton />
    </>
  );
}
