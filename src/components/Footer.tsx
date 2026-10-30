import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Facebook,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CHARITY_INFO, NAV_ITEMS, buildWhatsAppUrl } from '../utils/charityData';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'registration' | null>(
    null
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLegalModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const whatsappUrl = buildWhatsAppUrl(CHARITY_INFO.whatsappNumberIntl);

  return (
    <footer className="bg-[#103B70] text-white px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-7xl mx-auto w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 pb-8 border-b border-white/15">
          {/* Column 1: Brand Logo, Description & Official Registration */}
          <div className="w-full space-y-3">
            <div className="inline-flex items-center gap-3 bg-white px-3.5 py-2 rounded-2xl shadow-2xs max-w-full">
              <picture>
                <source srcSet={CHARITY_INFO.logoWebp} type="image/webp" />
                <img
                  src={CHARITY_INFO.logoSrc}
                  alt={CHARITY_INFO.name}
                  width={120}
                  height={50}
                  loading="lazy"
                  className="h-9 sm:h-10 w-auto object-contain"
                />
              </picture>
            </div>

            <div className="w-full">
              <h2 className="w-full text-lg md:text-xl font-bold text-white mb-1 whitespace-normal">
                {CHARITY_INFO.name}
              </h2>
              <p className="w-full text-[13px] md:text-sm text-[#29B9AA] font-medium leading-relaxed whitespace-normal">
                {CHARITY_INFO.englishName}
              </p>
            </div>

            <p className="w-full text-sm md:text-[15px] text-white/85 leading-relaxed whitespace-normal">
              {CHARITY_INFO.slogan} — مؤسسة خيرية وتنموية تعمل على تنشئة الأجيال بالعلم والقيم من خلال «دار رياض الصالحين»، وتقديم الدعم الغذائي والاجتماعي للأسر الأولى بالرعاية بقرية الأقواز.
            </p>

            <div className="w-full flex items-center gap-2 text-[13px] md:text-sm font-medium text-[#29B9AA]">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="flex-1 min-w-0 whitespace-normal">{CHARITY_INFO.registrationText}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="w-full space-y-2">
            <h3 className="w-full text-[15px] md:text-[17px] font-bold text-[#29B9AA] whitespace-normal">
              روابط سريعة
            </h3>
            <ul className="w-full space-y-1 text-sm md:text-[15px] font-medium text-white/85">
              {NAV_ITEMS.map((item) => (
                <li key={item.id} className="w-full">
                  <a
                    href={item.href}
                    className="py-1 inline-flex items-center text-sm md:text-[15px] font-medium whitespace-nowrap hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="w-full">
                <a
                  href="#donate"
                  className="py-1 inline-flex items-center text-sm md:text-[15px] font-medium whitespace-nowrap text-[#29B9AA] hover:underline underline-offset-4"
                >
                  ادعم أنشطة الجمعية
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Verified Contact Details & Social Media */}
          <div className="w-full space-y-3">
            <h3 className="w-full text-[15px] md:text-[17px] font-bold text-[#29B9AA] whitespace-normal">
              بيانات التواصل الرسمية
            </h3>

            <ul className="w-full space-y-2 text-sm md:text-[15px] text-white/90 leading-relaxed">
              <li className="w-full flex items-start gap-2 whitespace-normal">
                <MapPin
                  className="w-4 h-4 text-[#29B9AA] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <a
                  href={CHARITY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-0 whitespace-normal hover:text-[#29B9AA] underline-offset-4 hover:underline transition-colors"
                >
                  {CHARITY_INFO.detailedAddress}
                </a>
              </li>

              <li className="w-full flex flex-wrap items-center gap-x-2 gap-y-1 whitespace-normal">
                <Phone
                  className="w-4 h-4 text-[#29B9AA] shrink-0"
                  aria-hidden="true"
                />
                <span className="whitespace-normal">هاتف الجمعية ودار رياض الصالحين:</span>
                <a
                  href={`tel:${CHARITY_INFO.officialPhone}`}
                  dir="ltr"
                  className="text-sm md:text-[15px] font-medium whitespace-nowrap font-mono-num text-white hover:text-[#29B9AA] transition-colors"
                >
                  {CHARITY_INFO.officialPhone}
                </a>
              </li>
            </ul>

            <div className="w-full pt-1 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-3.5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#159EAA] hover:bg-[#29B9AA] text-white text-[13.5px] md:text-sm font-medium whitespace-nowrap transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>تواصل عبر واتساب</span>
              </a>

              <a
                href={CHARITY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-3.5 inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[13.5px] md:text-sm font-medium whitespace-nowrap transition-colors"
              >
                <MapPin className="w-4 h-4 shrink-0 text-[#29B9AA]" aria-hidden="true" />
                <span>الموقع على الخريطة</span>
              </a>

              <a
                href={CHARITY_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-3.5 inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[13.5px] md:text-sm font-medium whitespace-nowrap transition-colors"
              >
                <Facebook className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>فيسبوك</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="w-full pt-4 flex flex-col md:flex-row items-center justify-between gap-2.5 text-[13px] md:text-sm text-white/75 text-center md:text-start">
          <p className="w-full md:flex-1 min-w-0 leading-relaxed whitespace-normal">
            جميع الحقوق محفوظة © {new Date().getFullYear()} {CHARITY_INFO.name} (
            {CHARITY_INFO.englishName})
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => setLegalModal('registration')}
              className="py-1 text-[13px] md:text-sm font-medium whitespace-nowrap hover:text-white underline underline-offset-4 cursor-pointer"
            >
              بيانات الإشهار والترخيص
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="py-1 text-[13px] md:text-sm font-medium whitespace-nowrap hover:text-white underline underline-offset-4 cursor-pointer"
            >
              سياسة الخصوصية
            </button>
          </div>
        </div>
      </div>

      {/* Legal & Privacy Modal */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            legalModal === 'registration'
              ? 'بيانات الإشهار والترخيص الرسمي'
              : 'سياسة الخصوصية'
          }
          className="fixed inset-0 z-50 bg-[#103B70]/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="bg-white text-gray-600 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between gap-4 border-b border-[#DCE7E5] pb-3">
              <h3 className="flex-1 min-w-0 text-base md:text-lg font-bold text-blue-900 whitespace-normal">
                {legalModal === 'registration'
                  ? 'بيانات الإشهار والاعتماد القانوني'
                  : 'سياسة الخصوصية وحماية البيانات'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label="إغلاق النافذة"
                className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-xl text-sm md:text-base font-medium whitespace-nowrap text-blue-900 hover:bg-[#F5F9F7] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {legalModal === 'registration' ? (
              <div className="w-full space-y-3">
                <p className="w-full text-sm md:text-base text-gray-600 leading-relaxed whitespace-normal">
                  <strong className="font-bold text-blue-900">{CHARITY_INFO.name}</strong> هي جمعية أهلية مصرية مشهرة رسمياً بقرار قيد رقم (
                  <span className="font-mono-num font-bold text-blue-900">8014</span>) بتاريخ{' '}
                  <span className="font-mono-num font-bold text-blue-900">19/3/2026</span>.
                </p>
                <p className="w-full text-sm md:text-base text-gray-600 leading-relaxed whitespace-normal">
                  مقر الجمعية الرئيسي: {CHARITY_INFO.detailedAddress}. وتخضع كافة أنشطتها للقوانين واللوائح المنظمة للعمل الأهلي في جمهورية مصر العربية.
                </p>
              </div>
            ) : (
              <div className="w-full space-y-3">
                <p className="w-full text-sm md:text-base text-gray-600 leading-relaxed whitespace-normal">
                  تحترم <strong className="font-bold text-blue-900">{CHARITY_INFO.name}</strong> خصوصية جميع المتبرعين والمتطوعين وزوار الموقع الإلكتروني.
                </p>
                <p className="w-full text-sm md:text-base text-gray-600 leading-relaxed whitespace-normal">
                  تُستخدم البيانات المرسلة عبر نموذج التواصل (الاسم، رقم الهاتف، البريد الإلكتروني) حصرياً لغرض الرد على استفساراتكم وتنسيق المساهمات الخيرية أو طلبات التطوع والتقديم في دار رياض الصالحين، ولا يتم مشاركتها مع أي أطراف خارجية.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
