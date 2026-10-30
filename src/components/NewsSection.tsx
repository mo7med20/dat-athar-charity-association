import React, { useState, useEffect } from 'react';
import { Newspaper, ArrowLeft, X, Calendar } from 'lucide-react';
import { NEWS_ARTICLES, NewsArticleItem, CHARITY_INFO } from '../utils/charityData';

export const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticleItem | null>(
    null
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="news"
      aria-labelledby="news-heading"
      className="scroll-mt-20 px-4 py-8 md:px-6 md:py-12 bg-[#F5F9F7] border-b border-[#DCE7E5]"
    >
      <div className="max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Section Header */}
        <div className="w-full">
          <div className="w-full flex items-center gap-2 text-[13px] md:text-sm font-medium text-teal-600 mb-1.5">
            <Newspaper className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="whitespace-normal">الأخبار والتقارير الموثقة</span>
          </div>
          <h2
            id="news-heading"
            className="w-full text-xl md:text-2xl font-bold text-blue-900 mb-3 whitespace-normal"
          >
            أحدث الأخبار والفعاليات الميدانية
          </h2>
          <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
            متابعة دورية لأهم الفعاليات التربوية والمبادرات الخيرية الموثقة لجمعية ذات أثر للأعمال الخيرية بقرية الأقواز.
          </p>
        </div>

        {/* 3 News Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {NEWS_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="w-full bg-white rounded-2xl p-4 md:p-5 border border-[#DCE7E5] flex flex-col justify-between gap-4 hover:border-[#159EAA] transition-colors"
            >
              <div className="w-full space-y-3 flex-1">
                <div className="w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-[#F5F9F7]">
                  <picture className="block w-full">
                    {article.imageWebp && (
                      <source srcSet={article.imageWebp} type="image/webp" />
                    )}
                    <img
                      src={article.imageSrc}
                      alt={article.imageAlt}
                      width={360}
                      height={225}
                      loading="lazy"
                      className="w-full h-44 md:h-48 object-cover object-center rounded-xl contrast-[1.05] saturate-[1.05] brightness-[1.02] transition-transform duration-500 hover:scale-110"
                    />
                  </picture>
                </div>

                <div className="w-full space-y-1.5">
                  <div className="w-full flex flex-wrap items-center gap-2 text-xs md:text-[13px] font-medium text-teal-600">
                    <span className="whitespace-normal">{article.categoryLabel}</span>
                    <span aria-hidden="true" className="text-gray-400">
                      ·
                    </span>
                    <span className="inline-flex items-center gap-1 text-gray-600 whitespace-normal">
                      <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{article.dateLabel}</span>
                    </span>
                  </div>

                  <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                    {article.title}
                  </h3>

                  {article.authorNote && (
                    <p className="w-full text-xs md:text-[13px] leading-relaxed text-gray-600 whitespace-normal">
                      {article.authorNote}
                    </p>
                  )}

                  <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="w-full pt-3 border-t border-[#DCE7E5]">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F5F9F7] hover:bg-blue-900 text-blue-900 hover:text-white inline-flex items-center justify-center gap-2 text-[13.5px] md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
                >
                  <span>اقرأ التفاصيل الكاملة</span>
                  <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedArticle.title}
          className="fixed inset-0 z-50 bg-[#103B70]/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-start justify-between gap-4 border-b border-[#DCE7E5] pb-3">
              <div className="space-y-1 flex-1 min-w-0">
                <p className="w-full text-sm md:text-base leading-relaxed text-gray-700 whitespace-normal">
                  {selectedArticle.categoryLabel} · {selectedArticle.dateLabel}
                </p>
                <h3 className="w-full text-base md:text-lg font-bold text-blue-900 whitespace-normal">
                  {selectedArticle.title}
                </h3>
                {selectedArticle.authorNote && (
                  <p className="w-full text-sm md:text-base leading-relaxed text-gray-700 whitespace-normal">
                    {selectedArticle.authorNote}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="إغلاق الخبر"
                className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-xl text-sm md:text-base font-medium whitespace-nowrap text-blue-900 hover:bg-[#F5F9F7] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-[#F5F9F7] p-2">
              <picture className="block w-full">
                {selectedArticle.imageWebp && (
                  <source srcSet={selectedArticle.imageWebp} type="image/webp" />
                )}
                <img
                  src={selectedArticle.imageSrc}
                  alt={selectedArticle.imageAlt}
                  className="max-h-72 w-auto mx-auto object-contain rounded-xl contrast-[1.05] saturate-[1.05] brightness-[1.02]"
                />
              </picture>
            </div>

            <div className="w-full space-y-3">
              {selectedArticle.fullText.map((paragraph, index) => (
                <p
                  key={index}
                  className="w-full text-sm md:text-base leading-relaxed text-gray-700 whitespace-normal"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="w-full pt-4 border-t border-[#DCE7E5] flex flex-wrap items-center justify-between gap-2 text-sm md:text-base leading-relaxed text-gray-700">
              <span className="font-semibold text-blue-900 whitespace-normal">{CHARITY_INFO.name}</span>
              <span className="whitespace-normal">{CHARITY_INFO.registrationText}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
