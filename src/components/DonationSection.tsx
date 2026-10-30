import React, { useState } from 'react';
import {
  HeartHandshake,
  MessageCircle,
  MapPin,
  Phone,
  Copy,
  Check,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import {
  CHARITY_INFO,
  PROGRAMS_DATA,
  VERIFIED_SUPPORT_CHANNELS,
  buildWhatsAppUrl,
} from '../utils/charityData';

interface DonationSectionProps {
  selectedProgramTitle: string;
  onSelectProgramTitle: (title: string) => void;
  onProceedToContactForm: () => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  selectedProgramTitle,
  onSelectProgramTitle,
  onProceedToContactForm,
}) => {
  const [phoneCopied, setPhoneCopied] = useState(false);

  const handleCopyOfficialPhone = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(CHARITY_INFO.officialPhone);
      }
    } catch {
      // Fallback handled by visual state
    }
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 3000);
  };

  const whatsappDirectUrl = buildWhatsAppUrl(
    CHARITY_INFO.whatsappNumberIntl,
    `السلام عليكم ورحمة الله وبركاته، أتواصل مع إدارة جمعية ذات أثر للأعمال الخيرية للمساهمة ودعم (${selectedProgramTitle}).`
  );

  return (
    <section
      id="donate"
      aria-labelledby="donate-heading"
      className="scroll-mt-20 px-4 py-8 md:px-6 md:py-12 bg-white border-b border-[#DCE7E5]"
    >
      <div className="max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Section Header */}
        <div className="w-full">
          <div className="w-full flex flex-wrap items-center gap-2 text-[13px] md:text-sm font-medium text-teal-600 mb-1.5">
            <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="whitespace-normal">ادعم رسالتنا الخيرية والتربوية</span>
            <span aria-hidden="true" className="text-gray-400">
              ·
            </span>
            <span className="text-gray-600 whitespace-normal">{CHARITY_INFO.registrationText}</span>
          </div>

          <h2
            id="donate-heading"
            className="w-full text-xl md:text-2xl font-bold text-blue-900 mb-3 whitespace-normal"
          >
            كيف يمكنك المساهمة في صنع الأثر؟
          </h2>

          <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
            تستقبل <strong className="font-bold text-blue-900">{CHARITY_INFO.name}</strong> المساهمات النقدية والعينية والتطوعية لدعم برامج تحفيظ القرآن الكريم وتأسيس الأطفال في «دار رياض الصالحين»، وحملات الشنط الغذائية والوجبات الساخنة ومعارض الملابس الخيرية بقرية الأقواز.
          </p>
        </div>

        {/* Copy Confirmation Alert */}
        {phoneCopied && (
          <div
            role="status"
            aria-live="polite"
            className="w-full p-3.5 rounded-xl bg-[#F5F9F7] border border-[#159EAA] flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-sm md:text-[15px] text-blue-900 leading-relaxed"
          >
            <div className="flex-1 min-w-0 flex items-center gap-2 font-bold">
              <Check className="w-4 h-4 text-[#159EAA] shrink-0" aria-hidden="true" />
              <span className="flex-1 min-w-0 whitespace-normal">
                تم نسخ الرقم الرسمي للجمعية بنجاح:{' '}
                <span className="font-mono-num text-teal-600" dir="ltr">
                  {CHARITY_INFO.officialPhone}
                </span>
              </span>
            </div>
            <p className="w-full md:w-auto text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
              يمكنك الاتصال مباشرةً أو التواصل عبر تطبيق واتساب لتنسيق مساهمتك
            </p>
          </div>
        )}

        {/* 3 Verified Support Channels Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {VERIFIED_SUPPORT_CHANNELS.map((channel) => {
            const isWhatsapp = channel.actionType === 'whatsapp';
            const isVisit = channel.actionType === 'visit-hq';

            return (
              <div
                key={channel.id}
                className="w-full bg-[#F5F9F7] rounded-2xl p-4 md:p-5 border border-[#DCE7E5] flex flex-col justify-between gap-3.5"
              >
                <div className="w-full space-y-2.5 flex-1">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#DCE7E5] flex items-center justify-center text-[#159EAA]">
                    {isWhatsapp ? (
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    ) : isVisit ? (
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Phone className="w-4 h-4" aria-hidden="true" />
                    )}
                  </div>

                  <div className="w-full space-y-0.5">
                    <p className="w-full text-xs md:text-[13px] leading-relaxed text-gray-600 whitespace-normal">
                      {channel.subtitle}
                    </p>
                    <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                      {channel.title}
                    </h3>
                  </div>

                  <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                    {channel.description}
                  </p>
                </div>

                <div className="w-full space-y-2 pt-3 border-t border-[#DCE7E5]">
                  <p className="w-full text-xs md:text-[13px] leading-relaxed text-gray-600 whitespace-normal">
                    {channel.verificationNote}
                  </p>

                  {isWhatsapp && (
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-white bg-[#159EAA] hover:bg-blue-900 transition-colors text-center"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{channel.actionLabel}</span>
                    </a>
                  )}

                  {isVisit && (
                    <a
                      href={CHARITY_INFO.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-blue-900 bg-white hover:bg-[#DCE7E5]/50 border border-[#DCE7E5] transition-colors text-center"
                    >
                      <MapPin className="w-4 h-4 text-[#159EAA] shrink-0" aria-hidden="true" />
                      <span>{channel.actionLabel}</span>
                    </a>
                  )}

                  {channel.actionType === 'copy-phone' && (
                    <button
                      type="button"
                      onClick={handleCopyOfficialPhone}
                      className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-white bg-blue-900 hover:bg-[#159EAA] transition-colors text-center cursor-pointer"
                    >
                      {phoneCopied ? (
                        <>
                          <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>تم نسخ الرقم الرسمي</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>{channel.actionLabel}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Program Selector for Directed Support */}
        <div className="w-full bg-[#F5F9F7] rounded-2xl p-4 md:p-6 border border-[#DCE7E5] space-y-4">
          <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
            <div className="w-full lg:flex-1 min-w-0 space-y-1">
              <div className="w-full flex items-center gap-2 text-[13px] md:text-sm font-medium text-teal-600">
                <HeartHandshake className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="whitespace-normal">توجيه المساهمة حسب البرنامج</span>
              </div>
              <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                اختر المبادرة التي ترغب في دعمها أو التطوع بها
              </h3>
            </div>

            <p className="w-full lg:w-auto text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
              المبادرة المختارة حالياً:{' '}
              <strong className="font-bold text-blue-900">{selectedProgramTitle}</strong>
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {PROGRAMS_DATA.map((prog) => {
              const isSelected = selectedProgramTitle === prog.title;
              return (
                <button
                  key={prog.id}
                  type="button"
                  onClick={() => onSelectProgramTitle(prog.title)}
                  className={`w-full py-2.5 px-3.5 rounded-xl border text-start transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-gray-600 border-[#DCE7E5] hover:border-[#159EAA]'
                  }`}
                >
                  <span
                    className={`block w-full text-xs md:text-[13px] font-medium whitespace-normal ${
                      isSelected ? 'text-[#29B9AA]' : 'text-teal-600'
                    }`}
                  >
                    {prog.categoryLabel}
                  </span>
                  <span
                    className={`block w-full text-sm md:text-[15px] font-bold mt-0.5 whitespace-normal ${
                      isSelected ? 'text-white' : 'text-blue-900'
                    }`}
                  >
                    {prog.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-full pt-2 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 border-t border-[#DCE7E5]">
            <p className="w-full lg:flex-1 min-w-0 text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
              يمكنك التواصل فوراً عبر واتساب أو إرسال طلب مساهمة/تطوع لإدارة الجمعية لتنسيق دعمك لـ «{selectedProgramTitle}».
            </p>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-4 inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-white bg-[#159EAA] hover:bg-blue-900 transition-colors text-center"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>نسّق مساهمتك عبر واتساب</span>
              </a>

              <button
                type="button"
                onClick={onProceedToContactForm}
                className="w-full sm:w-auto py-2.5 px-4 inline-flex items-center justify-center gap-1.5 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-blue-900 bg-white hover:bg-[#DCE7E5]/50 border border-[#DCE7E5] transition-colors text-center cursor-pointer"
              >
                <span>سجل طلب مساهمة بالنموذج</span>
                <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
