import React from 'react';
import {
  Target,
  Eye,
  ShieldCheck,
  MapPin,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { CHARITY_INFO, CORE_VALUES } from '../utils/charityData';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 px-4 py-8 md:px-6 md:py-12 bg-[#F5F9F7] border-b border-[#DCE7E5]"
    >
      <div className="max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Section Header — w-full with no restrictive max-w */}
        <div className="w-full">
          <div className="w-full flex flex-wrap items-center gap-2 text-[13px] md:text-sm font-medium text-teal-600 mb-1.5">
            <span className="whitespace-normal">من نحن</span>
            <span aria-hidden="true" className="text-gray-400">
              ·
            </span>
            <span className="text-gray-600 whitespace-normal">{CHARITY_INFO.englishName}</span>
          </div>

          <h2
            id="about-heading"
            className="w-full text-xl md:text-2xl font-bold text-blue-900 mb-3 whitespace-normal"
          >
            مؤسسة أهلية تجمع بين التربية الأصيلة والتكافل الإنساني
          </h2>

          <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
            تأسست <strong className="font-bold text-blue-900">{CHARITY_INFO.name}</strong> بقرية الأقواز (مركز الصف - محافظة الجيزة) لتكون منارةً للعمل الخيري والتربوي المتكامل، انطلاقاً من إيمانها بأن الاستثمار الحقيقي يكمن في تنشئة أجيال تتمسك بالقيم الدينية والأخلاقية إلى جانب التميز العلمي، مع الوقوف بجانب الأسر الأولى بالرعاية.
          </p>
        </div>

        {/* Main About Layout: flex flex-col lg:flex-row */}
        <div className="flex flex-col lg:flex-row items-stretch gap-5 lg:gap-7 w-full">
          {/* Right Column: Vision, Mission & Official Registration */}
          <div className="w-full lg:flex-1 min-w-0 flex flex-col justify-between gap-4 md:gap-5">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vision Card */}
              <div className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#F5F9F7] border border-[#DCE7E5] flex items-center justify-center text-[#159EAA]">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                  رؤيتنا
                </h3>
                <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                  تقديم نموذج رائد للعمل الخيري والتربوي المتكامل يحقق التنمية المجتمعية المستدامة بقرية الأقواز والقرى المجاورة، ويبني جيلاً واعياً يجمع بين العلم والأخلاق.
                </p>
              </div>

              {/* Mission Card */}
              <div className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#F5F9F7] border border-[#DCE7E5] flex items-center justify-center text-[#159EAA]">
                  <Target className="w-4 h-4" aria-hidden="true" />
                </div>
                <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                  رسالتنا
                </h3>
                <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                  توفير بيئة تعليمية وتربوية آمنة للأطفال عبر «دار رياض الصالحين»، وتنفيذ مبادرات الإطعام والشنط الغذائية ومعارض الملابس لتخفيف الأعباء عن الأسر الأكثر احتياجاً.
                </p>
              </div>
            </div>

            {/* Official Verified Registration Box */}
            <div className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] space-y-3.5">
              <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="w-full sm:flex-1 min-w-0 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#159EAA] shrink-0" aria-hidden="true" />
                  <h3 className="flex-1 min-w-0 text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                    بيانات الإشهار والاعتماد الرسمي
                  </h3>
                </div>
                <span className="text-[13px] md:text-sm font-medium whitespace-nowrap text-teal-600">
                  موثق رسمياً
                </span>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#DCE7E5]">
                <div className="w-full">
                  <p className="w-full text-[13px] md:text-sm leading-relaxed text-gray-600 whitespace-normal">قرار القيد والإشهار</p>
                  <p className="w-full text-sm md:text-[15px] font-bold text-blue-900 mt-0.5 leading-relaxed whitespace-normal">
                    رقم (<span className="font-mono-num">8014</span>) بتاريخ{' '}
                    <span className="font-mono-num">19/3/2026</span>
                  </p>
                </div>

                <div className="w-full">
                  <p className="w-full text-[13px] md:text-sm leading-relaxed text-gray-600 whitespace-normal">مجلس الإدارة</p>
                  <p className="w-full text-sm md:text-[15px] font-bold text-blue-900 mt-0.5 leading-relaxed whitespace-normal">
                    برئاسة {CHARITY_INFO.chairperson}
                  </p>
                </div>

                <div className="md:col-span-2 w-full flex items-start gap-2 pt-1">
                  <MapPin className="w-4 h-4 text-[#159EAA] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="flex-1 min-w-0 text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                    <strong className="font-semibold text-blue-900">العنوان الرسمي:</strong>{' '}
                    {CHARITY_INFO.detailedAddress}
                  </p>
                </div>
              </div>

              <div className="w-full pt-1 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                <a
                  href="#programs"
                  className="w-full md:w-auto py-2.5 px-4 rounded-xl bg-[#F5F9F7] hover:bg-[#DCE7E5]/60 inline-flex items-center justify-center gap-2 text-[13.5px] md:text-sm font-medium whitespace-nowrap text-blue-900 transition-colors"
                >
                  <span>استكشف برامجنا التعليمية والخيرية</span>
                  <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>

                <a
                  href="#news"
                  className="w-full md:w-auto py-2 px-3 inline-flex items-center justify-center text-[13.5px] md:text-sm font-medium whitespace-nowrap text-gray-600 hover:text-blue-900 underline underline-offset-4"
                >
                  طالع التوثيق الصحفي لأنشطة الجمعية
                </a>
              </div>
            </div>
          </div>

          {/* Left Column: Dar Riyad Al-Saliheen Feature Card */}
          <div className="w-full lg:flex-1 min-w-0 bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] flex flex-col justify-between gap-4">
            <div className="w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-[#F5F9F7]">
              <img
                src="/assets/activities/dar_riyad.jpg"
                alt="لوحة دار رياض الصالحين لتحفيظ القرآن الكريم وتأسيس الأطفال بقرية الأقواز"
                width={275}
                height={240}
                loading="lazy"
                className="w-full h-48 md:h-52 object-cover object-center rounded-xl contrast-[1.05] saturate-[1.05] brightness-[1.02] transition-transform duration-500 hover:scale-110"
              />
            </div>

            <div className="w-full space-y-3 flex-1 flex flex-col justify-between">
              <div className="w-full space-y-1">
                <p className="w-full text-[13px] md:text-sm font-medium text-teal-600 leading-relaxed whitespace-normal">
                  الصرح التربوي التابع للجمعية
                </p>
                <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                  {CHARITY_INFO.darName}
                </h3>
                <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                  تعد «دار رياض الصالحين» بقرية الأقواز بجوار سنترال أبو شافعي البيت الثاني للطفل بدايةً من سن <span className="font-mono-num font-bold text-blue-900">3.5</span> سنوات، حيث تجمع بين الأمان والتربية والتعليم والترفيه في منظومة متكاملة.
                </p>
              </div>

              <ul className="w-full space-y-1.5 pt-2.5 border-t border-[#DCE7E5] text-sm md:text-[15px] leading-relaxed text-gray-700">
                <li className="w-full flex items-start gap-2 whitespace-normal">
                  <CheckCircle2 className="w-4 h-4 text-[#159EAA] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="flex-1 min-w-0 whitespace-normal">تحفيظ القرآن الكريم والعلوم الشرعية والآداب الإسلامية</span>
                </li>
                <li className="w-full flex items-start gap-2 whitespace-normal">
                  <CheckCircle2 className="w-4 h-4 text-[#159EAA] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="flex-1 min-w-0 whitespace-normal">تأسيس اللغة العربية، الرياضيات، واللغة الإنجليزية (ABC)</span>
                </li>
                <li className="w-full flex items-start gap-2 whitespace-normal">
                  <CheckCircle2 className="w-4 h-4 text-[#159EAA] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="flex-1 min-w-0 whitespace-normal">توفير وجبات غذائية صحية ومتوازنة للأطفال يومياً</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values Grid: grid-cols-1 on mobile, md:grid-cols-2 on tablet, lg:grid-cols-4 on desktop */}
        <div className="w-full">
          <h2 className="w-full text-xl md:text-2xl font-bold text-blue-900 mb-4 whitespace-normal">
            قيمنا الجوهرية في العمل الخيري
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={val.id}
                className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] space-y-1.5"
              >
                <span className="text-[13px] md:text-sm font-medium whitespace-nowrap font-mono-num text-teal-600">
                  0{idx + 1}.
                </span>
                <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                  {val.title}
                </h3>
                <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
