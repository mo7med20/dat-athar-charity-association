import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VERIFIED_IMPACT_FACTS, CHARITY_INFO } from '../utils/charityData';

export const ImpactSection: React.FC = () => {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="scroll-mt-20 px-4 py-8 md:px-6 md:py-12 bg-[#F5F9F7] border-b border-[#DCE7E5]"
    >
      <div className="max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Section Header */}
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="w-full lg:flex-1 min-w-0">
            <div className="w-full flex items-center gap-2 text-[13px] md:text-sm font-medium text-teal-600 mb-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-normal">بيانات موثقة وشفافية كاملة</span>
            </div>
            <h2
              id="impact-heading"
              className="w-full text-xl md:text-2xl font-bold text-blue-900 mb-3 whitespace-normal"
            >
              حقائق ومرتكزات العمل الميداني بالجمعية
            </h2>
            <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
              تلتزم {CHARITY_INFO.name} بمبدأ الصدق والشفافية في عرض بياناتها الرسمية ومجالات عملها الموثقة على أرض الواقع في قرية الأقواز بمركز الصف.
            </p>
          </div>

          <div className="w-full lg:w-auto text-[13px] md:text-sm font-medium whitespace-normal text-blue-900 bg-white px-3.5 py-2 rounded-xl border border-[#DCE7E5] self-start">
            {CHARITY_INFO.registrationText}
          </div>
        </div>

        {/* 4 Verified Facts Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VERIFIED_IMPACT_FACTS.map((fact) => (
            <div
              key={fact.id}
              className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] flex flex-col justify-between gap-3"
            >
              <div className="w-full space-y-1 flex-1">
                <span className="inline-block text-[13px] md:text-sm font-medium whitespace-nowrap text-teal-600 font-mono-num">
                  {fact.valueLabel}
                </span>
                <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                  {fact.title}
                </h3>
                <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                  {fact.description}
                </p>
              </div>

              <div className="w-full pt-2.5 border-t border-[#DCE7E5] flex items-center gap-1.5 text-xs md:text-[13px] font-medium text-gray-600">
                <CheckCircle2
                  className="w-3.5 h-3.5 text-[#29B9AA] shrink-0"
                  aria-hidden="true"
                />
                <span className="flex-1 min-w-0 whitespace-normal">{fact.verificationSource}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
