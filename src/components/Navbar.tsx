import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  HeartHandshake,
  Users,
  Phone,
  MessageCircle,
  ChevronLeft,
} from 'lucide-react';
import { CHARITY_INFO, NAV_ITEMS, buildWhatsAppUrl } from '../utils/charityData';

interface NavbarProps {
  onDonateClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDonateClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll spy and subtle header elevation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 8);

      const sectionOrder: { id: string; elementId: string }[] = [
        { id: 'contact', elementId: 'contact' },
        { id: 'news', elementId: 'news' },
        { id: 'gallery', elementId: 'gallery' },
        { id: 'activities', elementId: 'impact' },
        { id: 'programs', elementId: 'programs' },
        { id: 'about', elementId: 'about' },
      ];

      const triggerPoint = scrollY + 140;
      for (const sec of sectionOrder) {
        const el = document.getElementById(sec.elementId);
        if (el && triggerPoint >= el.offsetTop) {
          setActiveSection(sec.id);
          return;
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard Escape and responsive resize listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  // Prevent background scrolling while mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavSelect = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  const scrollToContribute = () => {
    setMobileMenuOpen(false);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappHref = buildWhatsAppUrl(CHARITY_INFO.whatsappNumberIntl);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white border-b border-[#DCE7E5] transition-shadow duration-200 ${
          isScrolled ? 'shadow-xs' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 md:h-[72px] flex flex-row items-center justify-between gap-2 lg:gap-4">
          {/* Right Side (RTL): Emblem Logo + Organization Name + Short Descriptor */}
          <a
            href="#top"
            onClick={() => handleNavSelect('home')}
            aria-label={`${CHARITY_INFO.name} - الصفحة الرئيسية`}
            className="group flex flex-row items-center gap-2.5 shrink-0 py-1 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#159EAA]"
          >
            <picture className="shrink-0">
              <source srcSet={CHARITY_INFO.logoMarkWebp} type="image/webp" />
              <img
                src={CHARITY_INFO.logoMarkSrc}
                alt="شعار جمعية ذات أثر للأعمال الخيرية"
                width={42}
                height={42}
                className="w-9 h-9 md:w-10 md:h-10 object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </picture>

            <div className="flex flex-col justify-center leading-tight">
              <span className="text-sm md:text-[15px] font-bold text-blue-900 tracking-tight whitespace-nowrap">
                {CHARITY_INFO.shortTitle}
              </span>
              <span className="text-xs font-medium text-teal-600 mt-0.5 whitespace-nowrap">
                {CHARITY_INFO.shortDescriptor}
              </span>
            </div>
          </a>

          {/* Center (Desktop 1024px+): Standard Inline Menu — shrink-0 prevents collapsing/overlapping over CTA */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex flex-row items-center gap-0.5 xl:gap-1.5 shrink-0"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavSelect(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative inline-flex flex-row items-center px-2.5 xl:px-3 py-1.5 rounded-lg text-[13px] xl:text-sm font-medium whitespace-nowrap transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#159EAA] ${
                    isActive
                      ? 'text-blue-900 bg-[#F5F9F7]'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-[#F5F9F7]/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 inset-x-2 h-0.5 bg-[#159EAA] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Left Side (RTL): Desktop CTAs & Mobile Hamburger Menu Toggle */}
          <div className="flex flex-row items-center gap-2 shrink-0">
            {/* Secondary CTA on wide desktop (1280px+) */}
            <button
              type="button"
              onClick={scrollToContribute}
              className="hidden xl:flex flex-row items-center justify-center gap-1.5 px-4 py-2 text-[13px] xl:text-sm font-medium rounded-full whitespace-nowrap text-blue-900 bg-white hover:bg-[#F5F9F7] border border-[#DCE7E5] transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#159EAA]"
            >
              <Users className="w-4 h-4 text-[#159EAA] shrink-0" aria-hidden="true" />
              <span>ساهم معنا</span>
            </button>

            {/* Primary CTA ("تبرع الآن") */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onDonateClick();
              }}
              className="hidden md:flex flex-row items-center justify-center gap-1.5 px-4 xl:px-5 py-2 text-[13px] xl:text-sm font-medium rounded-full whitespace-nowrap text-white bg-blue-900 hover:bg-[#159EAA] transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#159EAA]"
            >
              <HeartHandshake className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>تبرع الآن</span>
            </button>

            {/* Mobile & Tablet Accessible Hamburger Menu Button (< 1024px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={
                mobileMenuOpen ? 'إغلاق القائمة الرئيسية' : 'فتح القائمة الرئيسية'
              }
              className={`lg:hidden flex flex-row items-center justify-center gap-1.5 px-3.5 py-2 rounded-full border text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#159EAA] ${
                mobileMenuOpen
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-blue-900 border-[#DCE7E5] hover:bg-[#F5F9F7]'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 shrink-0" aria-hidden="true" />
              ) : (
                <Menu className="w-4 h-4 shrink-0" aria-hidden="true" />
              )}
              <span className="text-[13px] font-medium whitespace-nowrap">
                {mobileMenuOpen ? 'إغلاق' : 'القائمة'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Slide-Down Dropdown / Drawer (< 1024px) */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation-drawer"
            aria-label="القائمة الرئيسية للهاتف والأجهزة اللوحية"
            className="lg:hidden bg-white border-t border-[#DCE7E5] shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              {/* Navigation Links — text-sm font-medium */}
              <div className="flex flex-col gap-1.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => handleNavSelect(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full py-2.5 px-4 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex flex-row items-center justify-between ${
                        isActive
                          ? 'bg-[#F5F9F7] text-blue-900 border border-[#159EAA]/40'
                          : 'text-gray-700 hover:bg-[#F5F9F7] hover:text-blue-900'
                      }`}
                    >
                      <div className="flex-1 min-w-0 flex flex-row items-center gap-2.5">
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="w-1.5 h-4 rounded-full bg-[#159EAA] shrink-0"
                          />
                        )}
                        <span>{item.label}</span>
                      </div>
                      <ChevronLeft
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-[#159EAA]' : 'text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>

              {/* Drawer Primary & Secondary Actions */}
              <div className="pt-3 border-t border-[#DCE7E5] flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onDonateClick();
                  }}
                  className="w-full flex flex-row items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap text-white bg-blue-900 hover:bg-[#159EAA] transition-colors cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>تبرع الآن</span>
                </button>

                <button
                  type="button"
                  onClick={scrollToContribute}
                  className="w-full flex flex-row items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap text-blue-900 bg-[#F5F9F7] hover:bg-[#DCE7E5]/70 border border-[#DCE7E5] transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-[#159EAA] shrink-0" aria-hidden="true" />
                  <span>ساهم معنا (تطوع / تواصل)</span>
                </button>
              </div>

              {/* Official Contact Strip inside Mobile Drawer */}
              <div className="pt-3 border-t border-[#DCE7E5] flex flex-col gap-2 text-sm leading-relaxed text-gray-700">
                <span className="whitespace-normal">{CHARITY_INFO.registrationText}</span>
                <div className="flex flex-row flex-wrap items-center gap-4">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-row items-center gap-1.5 text-sm font-medium whitespace-nowrap text-[#159EAA] hover:text-blue-900"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>واتساب</span>
                  </a>
                  <a
                    href={`tel:${CHARITY_INFO.officialPhone}`}
                    className="inline-flex flex-row items-center gap-1.5 text-sm font-medium whitespace-nowrap font-mono-num text-blue-900"
                    dir="ltr"
                  >
                    <Phone className="w-4 h-4 text-[#159EAA] shrink-0" aria-hidden="true" />
                    <span>{CHARITY_INFO.officialPhone}</span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-[#103B70]/25"
        />
      )}
    </>
  );
};
