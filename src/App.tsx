/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { ImpactSection } from './components/ImpactSection';
import { GallerySection } from './components/GallerySection';
import { NewsSection } from './components/NewsSection';
import { DonationSection } from './components/DonationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { PROGRAMS_DATA, ProgramItem } from './utils/charityData';

export default function App() {
  const [selectedProgramTitle, setSelectedProgramTitle] = useState<string>(
    PROGRAMS_DATA[0].title
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSupportProgram = (program: ProgramItem) => {
    setSelectedProgramTitle(program.title);
    scrollToSection('donate');
  };

  return (
    <div
      id="top"
      dir="rtl"
      className="min-h-screen overflow-x-hidden w-full max-w-[100vw] flex flex-col bg-[#F5F9F7] text-[#263746]"
    >
      <Navbar onDonateClick={() => scrollToSection('donate')} />

      <main className="flex-1 min-w-0 w-full max-w-[100vw] overflow-x-hidden">
        <HeroSection onPrimaryDonateClick={() => scrollToSection('donate')} />
        <AboutSection />
        <ProgramsSection onSupportProgram={handleSupportProgram} />
        <ImpactSection />
        <GallerySection />
        <NewsSection />
        <DonationSection
          selectedProgramTitle={selectedProgramTitle}
          onSelectProgramTitle={setSelectedProgramTitle}
          onProceedToContactForm={() => scrollToSection('contact')}
        />
        <ContactSection selectedProgramTitle={selectedProgramTitle} />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

