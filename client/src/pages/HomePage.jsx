import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ConceptShowcase from '../components/home/ConceptShowcase';
import FeatureSection from '../components/home/FeatureSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <ConceptShowcase />
      <FeatureSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
