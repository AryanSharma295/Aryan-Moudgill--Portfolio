import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import ClientsSection from '../components/ClientsSection';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <div className="bg-black w-full min-h-screen">
      <Hero />
      <AboutSection />
      <ClientsSection />
      <Testimonials />
    </div>
  );
}
