import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { shouldShowScrollToTop } from '../utils/charityData';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const evaluateVisibility = () => {
      const heroEl = document.getElementById('hero');
      const heroBottomOffset = heroEl
        ? heroEl.offsetTop + heroEl.offsetHeight
        : 500;
      setIsVisible(shouldShowScrollToTop(window.scrollY, heroBottomOffset));
    };

    window.addEventListener('scroll', evaluateVisibility, { passive: true });
    window.addEventListener('resize', evaluateVisibility, { passive: true });
    evaluateVisibility();

    return () => {
      window.removeEventListener('scroll', evaluateVisibility);
      window.removeEventListener('resize', evaluateVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="العودة إلى أعلى الصفحة"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-blue-900 hover:bg-[#159EAA] text-white border-2 border-[#29B9AA] shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#159EAA] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 shrink-0" aria-hidden="true" />
    </button>
  );
};
