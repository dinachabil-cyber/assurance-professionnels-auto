import HeroSection from '../components/HeroSection';

import ActivitySection from '../components/ActivitySection';
import GuaranteeSection from '../components/GuaranteeSection';
import WhyChooseUs from '../components/CTAsection';
import FAQSection from '../components/FAQSection';
import InsuranceInfo from '../components/InsuranceInfo';

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <InsuranceInfo />
      <ActivitySection />
      <GuaranteeSection />
      <WhyChooseUs />
       {/* <FAQSection /> */}
    </div>
  );
}