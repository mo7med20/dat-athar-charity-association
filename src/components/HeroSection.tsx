import React, { useState } from 'react';
import { HeartHandshake, ArrowLeft, ShieldCheck, BookOpen, Users } from 'lucide-react';
import { CHARITY_INFO } from '../utils/charityData';

interface HeroSectionProps {
  onPrimaryDonateClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPrimaryDonateClick }) => {
  const [heroImgSrc, setHeroImgSrc] = useState<string>(CHARITY_INFO.heroImage);

  const handleHeroImgError = () => {
    if (heroImgSrc !== CHARITY_INFO.heroImageFallback) {
      setHeroImgSrc(CHARITY_INFO.heroImageFallback);
    }
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-main-title"
      className="relative bg-white border-b border-[#DCE7E5] px-4 py-8 md:px-6 md:py-12 lg:py-16"
    >
      {/* Hero Container: EXACTLY flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 w-full max-w-7xl mx-auto */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 w-full max-w-7xl mx-auto">
        {/* Text Block: flex-1 */}
        <div className="flex-1 min-w-0 w-full space-y-4">
          {/* Official Registration Metadata */}
          <div className="w-full flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] md:text-sm font-medium text-teal-600">
            <ShieldCheck className="w-4 h-4 shrink-0 text-teal-600" aria-hidden="true" />
            <span className="whitespace-normal">{CHARITY_INFO.registrationText}</span>
            <span aria-hidden="true" className="text-gray-400">
              ·
            </span>
            <span className="text-gray-700 whitespace-normal">{CHARITY_INFO.shortLocation}</span>
          </div>

          {/* Main Hero Title (H1): Balanced medium-large scale */}
          <h1
            id="hero-main-title"
            className="w-full text-[26px] sm:text-3xl lg:text-[34px] font-bold leading-snug text-blue-900 whitespace-normal"
          >
            {CHARITY_INFO.heroHeadline}
          </h1>

          {/* Single Descriptive Paragraph */}
          <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
            مؤسسة خيرية وتنموية مشهرة رسمياً بقرية الأقواز (مركز الصف - محافظة الجيزة) برئاسة{' '}
            <strong className="font-bold text-blue-900">{CHARITY_INFO.chairperson}</strong>. نجمع بين بناء النشء علمياً وأخلاقياً في «دار رياض الصالحين» لتحفيظ القرآن الكريم وتأسيس الأطفال، وبين مبادرات التكافل الاجتماعي والإطعام ومعارض الملابس لدعم الأسر الأولى بالرعاية.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="w-full pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={onPrimaryDonateClick}
              className="w-full sm:w-auto flex flex-row items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap text-white bg-blue-900 hover:bg-[#159EAA] shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#159EAA]"
            >
              <HeartHandshake className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>تبرع الآن</span>
            </button>

            <a
              href="#about"
              className="w-full sm:w-auto flex flex-row items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap text-blue-900 bg-[#F5F9F7] hover:bg-[#DCE7E5]/60 border border-[#DCE7E5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#159EAA]"
            >
              <span>تعرف علينا</span>
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* Key Verified Highlights */}
          <div className="w-full pt-3 border-t border-[#DCE7E5] grid grid-cols-1 gap-2.5">
            <div className="w-full flex flex-row items-center gap-3 bg-[#F5F9F7] px-4 py-2.5 rounded-xl border border-[#DCE7E5]">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#DCE7E5] flex items-center justify-center text-[#159EAA] shrink-0">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="w-full text-xs md:text-[13px] leading-relaxed text-gray-600 whitespace-normal">العمل التربوي</p>
                <h3 className="w-full text-[15px] md:text-base font-bold text-blue-900 whitespace-normal">دار رياض الصالحين لتحفيظ القرآن وتأسيس الأطفال</h3>
              </div>
            </div>

            <div className="w-full flex flex-row items-center gap-3 bg-[#F5F9F7] px-4 py-2.5 rounded-xl border border-[#DCE7E5]">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#DCE7E5] flex items-center justify-center text-[#159EAA] shrink-0">
                <Users className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="w-full text-xs md:text-[13px] leading-relaxed text-gray-600 whitespace-normal">التكافل الاجتماعي</p>
                <h3 className="w-full text-[15px] md:text-base font-bold text-blue-900 whitespace-normal">إطعام الأسر الأولى بالرعاية ومعارض الملابس</h3>
              </div>
            </div>

            <div className="w-full flex flex-row items-center gap-3 bg-[#F5F9F7] px-4 py-2.5 rounded-xl border border-[#DCE7E5]">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#DCE7E5] flex items-center justify-center text-[#159EAA] shrink-0">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="w-full text-xs md:text-[13px] leading-relaxed text-gray-600 whitespace-normal">الترخيص الرسمي</p>
                <h3 className="w-full text-[15px] md:text-base font-bold text-blue-900 whitespace-normal">
                  مشهرة بقرار قيد رقم <span className="font-mono-num">8014</span> لسنة <span className="font-mono-num">2026</span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Image Container: w-full lg:w-1/2 flex justify-center */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <figure className="w-full max-w-sm lg:max-w-md flex flex-col items-center space-y-2.5">
            <img
              src={heroImgSrc}
              alt="الحاجة فاطمة صابر رئيس مجلس إدارة جمعية ذات أثر للأعمال الخيرية أمام اللوحة الرسمية للجمعية بقرية الأقواز"
              width={1080}
              height={799}
              referrerPolicy="no-referrer"
              onError={handleHeroImgError}
              className="w-full max-w-sm lg:max-w-md h-60 sm:h-68 lg:h-76 object-cover object-center rounded-3xl shadow-xl border-4 border-white"
            />
            <figcaption className="w-full px-4 py-2.5 bg-[#F5F9F7] rounded-2xl border border-[#DCE7E5] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[13px] md:text-sm leading-relaxed text-gray-700">
              <div className="flex-1 min-w-0 whitespace-normal">
                <span className="font-bold text-blue-900">{CHARITY_INFO.chairperson}</span>
                <span className="mx-1.5 text-gray-400" aria-hidden="true">
                  ·
                </span>
                <span>رئيس مجلس الإدارة</span>
              </div>
              <span className="text-xs md:text-[13px] font-medium whitespace-nowrap text-teal-600">
                الأقواز - الصف - الجيزة
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
