import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Facebook,
  Send,
  CheckCircle2,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  CHARITY_INFO,
  InquiryFormInput,
  buildWhatsAppUrl,
  formatInquiryWhatsAppMessage,
  validateInquiryForm,
} from '../utils/charityData';

interface ContactSectionProps {
  selectedProgramTitle: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedProgramTitle,
}) => {
  const [formInput, setFormInput] = useState<InquiryFormInput>({
    fullName: '',
    phone: '',
    email: '',
    topic: 'donation',
    selectedProgramTitle,
    message: '',
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof InquiryFormInput, string>>
  >({});

  const [submittedRecord, setSubmittedRecord] = useState<InquiryFormInput | null>(
    null
  );
  const [showToast, setShowToast] = useState(false);
  const redirectTimerRef = useRef<number | null>(null);
  const dismissToastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setFormInput((prev) => ({
      ...prev,
      selectedProgramTitle,
    }));
  }, [selectedProgramTitle]);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        window.clearTimeout(redirectTimerRef.current);
      }
      if (dismissToastTimerRef.current) {
        window.clearTimeout(dismissToastTimerRef.current);
      }
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateInquiryForm(formInput);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      setSubmittedRecord(null);
      setShowToast(false);
      return;
    }
    const cleanRecord: InquiryFormInput = {
      ...formInput,
      selectedProgramTitle,
    };
    setFormErrors({});
    setSubmittedRecord(cleanRecord);
    setShowToast(true);

    const formattedMsg = formatInquiryWhatsAppMessage(cleanRecord);
    const targetWhatsAppUrl = buildWhatsAppUrl(
      CHARITY_INFO.whatsappNumberIntl,
      formattedMsg
    );

    if (redirectTimerRef.current) {
      window.clearTimeout(redirectTimerRef.current);
    }
    if (dismissToastTimerRef.current) {
      window.clearTimeout(dismissToastTimerRef.current);
    }

    redirectTimerRef.current = window.setTimeout(() => {
      const tempAnchor = document.createElement('a');
      tempAnchor.href = targetWhatsAppUrl;
      tempAnchor.target = '_blank';
      tempAnchor.rel = 'noopener noreferrer';
      document.body.appendChild(tempAnchor);
      tempAnchor.click();
      document.body.removeChild(tempAnchor);
    }, 900);

    dismissToastTimerRef.current = window.setTimeout(() => {
      setShowToast(false);
    }, 5500);
  };

  const whatsappContactHref = buildWhatsAppUrl(CHARITY_INFO.whatsappNumberIntl);
  const submittedWhatsAppHref = submittedRecord
    ? buildWhatsAppUrl(
        CHARITY_INFO.whatsappNumberIntl,
        formatInquiryWhatsAppMessage(submittedRecord)
      )
    : whatsappContactHref;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 px-4 py-8 md:px-6 md:py-12 bg-[#F5F9F7] border-b border-[#DCE7E5]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Stacked vertically on mobile/tablet, side-by-side only on lg+: flex flex-col lg:flex-row */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 w-full">
          {/* Contact Info Sidebar */}
          <div className="w-full lg:flex-1 min-w-0 space-y-4">
            <div className="w-full">
              <p className="w-full text-[13px] md:text-sm font-medium text-teal-600 mb-1.5 leading-relaxed whitespace-normal">
                تواصل معنا
              </p>
              <h2
                id="contact-heading"
                className="w-full text-xl md:text-2xl font-bold text-blue-900 mb-3 whitespace-normal"
              >
                نسعد بتواصلكم واستفساراتكم
              </h2>
              <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                يمكنكم التواصل المباشر مع إدارة الجمعية ودار رياض الصالحين بقرية الأقواز للاستفسار عن البرامج التعليمية، المساهمات الخيرية، أو التطوع الميداني.
              </p>
            </div>

            <div className="w-full space-y-3.5">
              {/* Address Card */}
              <div className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] flex flex-col gap-3.5">
                <div className="w-full flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F9F7] border border-[#DCE7E5] flex items-center justify-center text-[#159EAA] shrink-0">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                      مقر الجمعية ودار رياض الصالحين
                    </h3>
                    <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                      {CHARITY_INFO.detailedAddress}
                    </p>
                  </div>
                </div>

                <a
                  href={CHARITY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-blue-900 bg-[#F5F9F7] hover:bg-[#DCE7E5] transition-colors text-center"
                >
                  <MapPin className="w-4 h-4 text-[#159EAA] shrink-0" aria-hidden="true" />
                  <span>فتح الموقع على خرائط جوجل</span>
                </a>
              </div>

              {/* Phone Card */}
              <div className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F9F7] border border-[#DCE7E5] flex items-center justify-center text-[#159EAA] shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                    رقم الهاتف الرسمي الموثق
                  </h3>
                  <a
                    href={`tel:${CHARITY_INFO.officialPhone}`}
                    dir="ltr"
                    className="inline-block text-sm md:text-[15px] font-medium whitespace-nowrap font-mono-num text-teal-600 hover:text-blue-900 transition-colors"
                  >
                    {CHARITY_INFO.officialPhone}
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] flex flex-col gap-3.5">
                <div className="w-full flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F9F7] border border-[#DCE7E5] flex items-center justify-center text-[#159EAA] shrink-0">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                      المحادثة الفورية عبر واتساب
                    </h3>
                    <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                      تواصل مباشر مع إدارة الجمعية للاستفسار والتنسيق
                    </p>
                  </div>
                </div>

                <a
                  href={whatsappContactHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-white bg-[#159EAA] hover:bg-blue-900 transition-colors text-center"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>افتح واتساب</span>
                </a>
              </div>

              {/* Official Facebook Page */}
              <div className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] flex flex-col gap-3.5">
                <div className="w-full flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F9F7] border border-[#DCE7E5] flex items-center justify-center text-blue-900 shrink-0">
                    <Facebook className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                      الصفحة الرسمية على فيسبوك
                    </h3>
                    <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                      تابع أحدث أنشطتنا وفعالياتنا الميدانية بقرية الأقواز
                    </p>
                  </div>
                </div>

                <a
                  href={CHARITY_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-blue-900 bg-[#F5F9F7] hover:bg-[#DCE7E5] transition-colors text-center"
                >
                  <Facebook className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>زيارة الصفحة الرسمية</span>
                </a>
              </div>

              {/* Interactive Location Map Card */}
              <div className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] space-y-3.5">
                <div className="w-full space-y-0.5">
                  <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                    موقع المقر على الخريطة
                  </h3>
                  <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                    قرية الأقواز · مركز الصف · محافظة الجيزة
                  </p>
                </div>

                <div className="w-full h-44 md:h-52 rounded-xl overflow-hidden border border-[#DCE7E5] bg-[#F5F9F7]">
                  <iframe
                    title="موقع جمعية ذات أثر للأعمال الخيرية على خرائط جوجل"
                    src={CHARITY_INFO.googleMapsEmbedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <a
                  href={CHARITY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-white bg-blue-900 hover:bg-[#159EAA] transition-colors text-center"
                >
                  <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>الاتجاهات عبر خرائط جوجل</span>
                </a>
              </div>
            </div>

            <div className="w-full p-3.5 rounded-xl bg-white border border-[#DCE7E5] flex items-center gap-2.5 text-sm md:text-[15px] leading-relaxed text-gray-700">
              <ShieldCheck className="w-4 h-4 text-[#159EAA] shrink-0" aria-hidden="true" />
              <span className="flex-1 min-w-0 whitespace-normal">{CHARITY_INFO.registrationText}</span>
            </div>
          </div>

          {/* Contact & Volunteer Form */}
          <div className="w-full lg:flex-1 min-w-0 bg-white rounded-2xl p-5 md:p-6 border border-[#DCE7E5] shadow-2xs space-y-4">
            <div className="w-full space-y-1">
              <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                نموذج التواصل وطلبات التطوع والمساهمة
              </h3>
              <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                املأ البيانات التالية وسيتواصل معك فريق الجمعية في أقرب وقت
              </p>
            </div>

            <form onSubmit={handleFormSubmit} noValidate className="w-full space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full">
                <div className="w-full">
                  <label
                    htmlFor="contact-fullname"
                    className="block w-full text-[13.5px] md:text-sm font-medium text-blue-900 mb-1 whitespace-normal"
                  >
                    الاسم بالكامل <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-fullname"
                    type="text"
                    required
                    value={formInput.fullName}
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    placeholder="أدخل اسمك الثلاثي"
                    className="w-full px-3.5 py-2.5 bg-[#F5F9F7] border border-[#DCE7E5] rounded-xl text-sm md:text-[15px] text-gray-700 focus:bg-white focus:outline-2 focus:outline-[#159EAA]"
                  />
                  {formErrors.fullName && (
                    <p
                      role="alert"
                      className="w-full text-xs md:text-[13px] font-medium text-red-700 mt-1 leading-relaxed whitespace-normal"
                    >
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="contact-phone"
                    className="block w-full text-[13.5px] md:text-sm font-medium text-blue-900 mb-1 whitespace-normal"
                  >
                    رقم الهاتف المحمول (مصر) <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    dir="ltr"
                    required
                    value={formInput.phone}
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="01012345678"
                    className="w-full px-3.5 py-2.5 bg-[#F5F9F7] border border-[#DCE7E5] rounded-xl text-sm md:text-[15px] text-gray-700 font-mono-num text-start focus:bg-white focus:outline-2 focus:outline-[#159EAA]"
                  />
                  {formErrors.phone && (
                    <p
                      role="alert"
                      className="w-full text-xs md:text-[13px] font-medium text-red-700 mt-1 leading-relaxed whitespace-normal"
                    >
                      {formErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full">
                <div className="w-full">
                  <label
                    htmlFor="contact-email"
                    className="block w-full text-[13.5px] md:text-sm font-medium text-blue-900 mb-1 whitespace-normal"
                  >
                    البريد الإلكتروني (اختياري)
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    dir="ltr"
                    value={formInput.email || ''}
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#F5F9F7] border border-[#DCE7E5] rounded-xl text-sm md:text-[15px] text-gray-700 text-start focus:bg-white focus:outline-2 focus:outline-[#159EAA]"
                  />
                  {formErrors.email && (
                    <p
                      role="alert"
                      className="w-full text-xs md:text-[13px] font-medium text-red-700 mt-1 leading-relaxed whitespace-normal"
                    >
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="contact-topic"
                    className="block w-full text-[13.5px] md:text-sm font-medium text-blue-900 mb-1 whitespace-normal"
                  >
                    موضوع الرسالة
                  </label>
                  <select
                    id="contact-topic"
                    value={formInput.topic}
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        topic: e.target.value as InquiryFormInput['topic'],
                      }))
                    }
                    className="w-full px-3.5 py-2.5 bg-[#F5F9F7] border border-[#DCE7E5] rounded-xl text-sm md:text-[15px] text-gray-700 focus:bg-white focus:outline-2 focus:outline-[#159EAA]"
                  >
                    <option value="donation">تنسيق تبرع أو مساهمة خيرية</option>
                    <option value="dar-riyad">التقديم والاستفسار بدار رياض الصالحين</option>
                    <option value="volunteer">التطوع في أنشطة الجمعية</option>
                    <option value="general">استفسار عام</option>
                  </select>
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="contact-message"
                  className="block w-full text-[13.5px] md:text-sm font-medium text-blue-900 mb-1 whitespace-normal"
                >
                  تفاصيل الرسالة أو الاستفسار <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formInput.message}
                  onChange={(e) =>
                    setFormInput((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  placeholder={`اكتب رسالتك هنا (البرنامج المختار: ${selectedProgramTitle})...`}
                  className="w-full px-3.5 py-2.5 bg-[#F5F9F7] border border-[#DCE7E5] rounded-xl text-sm md:text-[15px] text-gray-700 leading-relaxed focus:bg-white focus:outline-2 focus:outline-[#159EAA]"
                />
                {formErrors.message && (
                  <p
                    role="alert"
                    className="w-full text-xs md:text-[13px] font-medium text-red-700 mt-1 leading-relaxed whitespace-normal"
                  >
                    {formErrors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full md:w-auto py-2.5 px-6 inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-white bg-blue-900 hover:bg-[#159EAA] transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>إرسال الرسالة عبر واتساب</span>
              </button>
            </form>

            {submittedRecord && (
              <div
                role="status"
                aria-live="polite"
                className="w-full p-4 rounded-xl bg-[#F5F9F7] border border-[#159EAA] space-y-3 text-sm md:text-[15px] text-blue-900 leading-relaxed"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 text-[#159EAA] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                      شكراً لتواصلك معنا يا {submittedRecord.fullName}!
                    </h4>
                    <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                      تم تجهيز رسالتك وتوجيهك مباشرةً إلى واتساب الجمعية الرسمي{' '}
                      <span className="font-mono-num font-bold text-blue-900" dir="ltr">
                        ({CHARITY_INFO.officialPhone})
                      </span>{' '}
                      ليتواصل معك فريق الجمعية على رقمك{' '}
                      <span className="font-mono-num font-bold text-blue-900" dir="ltr">
                        {submittedRecord.phone}
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="w-full p-3 rounded-xl bg-white border border-[#DCE7E5] space-y-1">
                  <p className="text-xs font-bold text-teal-600">
                    نص الرسالة الجاهزة للإرسال عبر واتساب:
                  </p>
                  <pre className="w-full text-xs md:text-[13px] font-sans text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {formatInquiryWhatsAppMessage(submittedRecord)}
                  </pre>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href={submittedWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 inline-flex items-center justify-center gap-2 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap text-white bg-[#159EAA] hover:bg-blue-900 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>تأكيد الإرسال عبر واتساب ({CHARITY_INFO.officialPhone})</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Success Toast Notification before WhatsApp Redirect */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md bg-blue-900 text-white border border-[#159EAA] rounded-2xl p-4 shadow-xl flex items-start justify-between gap-3 transition-all duration-200"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#159EAA] flex items-center justify-center text-white shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <p className="text-sm font-bold text-white whitespace-normal">
                تم تجهيز رسالتك لواتساب بنجاح
              </p>
              <p className="text-xs text-gray-200 leading-relaxed whitespace-normal">
                جاري توجيهك الآن إلى واتساب الجمعية الرسمي ({CHARITY_INFO.officialPhone}) لإرسال التفاصيل...
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            aria-label="إغلاق الإشعار"
            className="p-1 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
};

