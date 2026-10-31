import React, { useState, useEffect, useCallback } from 'react';
import { Newspaper, ArrowLeft, X, Calendar, Settings } from 'lucide-react';
import {
  NEWS_ARTICLES,
  NewsArticleItem,
  NewsDisplayMode,
  CHARITY_INFO,
  normalizeGoogleSheetCsvUrl,
  parseNewsCsv,
  resolveDisplayedNews,
} from '../utils/charityData';
import { NewsAdminModal } from './NewsAdminModal';

const STORAGE_ARTICLES_KEY = 'dat_athar_custom_news_v1';
const STORAGE_DISPLAY_MODE_KEY = 'dat_athar_news_display_mode_v1';
const STORAGE_SHEET_URL_KEY = 'dat_athar_sheet_url_v1';
const STORAGE_PASSCODE_KEY = 'dat_athar_admin_passcode_v1';
const DEFAULT_ADMIN_PASSCODE = '8014';

export const NewsSection: React.FC = () => {
  const [customArticles, setCustomArticles] = useState<NewsArticleItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ARTICLES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback to empty custom list
    }
    return [];
  });

  const [displayMode, setDisplayMode] = useState<NewsDisplayMode>(() => {
    try {
      const savedMode = localStorage.getItem(STORAGE_DISPLAY_MODE_KEY);
      if (
        savedMode === 'default' ||
        savedMode === 'custom' ||
        savedMode === 'merged'
      ) {
        return savedMode;
      }
    } catch {
      // Fallback to merged
    }
    return 'merged';
  });

  const [sheetUrl, setSheetUrl] = useState<string>(() => {
    const envUrl =
      (import.meta as unknown as { env?: Record<string, string> }).env
        ?.VITE_NEWS_SHEET_CSV_URL || '';
    try {
      return localStorage.getItem(STORAGE_SHEET_URL_KEY) || envUrl;
    } catch {
      return envUrl;
    }
  });

  const [adminPasscode, setAdminPasscode] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_PASSCODE_KEY) || DEFAULT_ADMIN_PASSCODE;
    } catch {
      return DEFAULT_ADMIN_PASSCODE;
    }
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsArticleItem | null>(
    null
  );
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const displayedArticles = resolveDisplayedNews(
    displayMode,
    NEWS_ARTICLES,
    customArticles
  );

  const fetchFromGoogleSheet = useCallback(
    async (rawUrl: string): Promise<{ ok: boolean; count: number; error?: string }> => {
      const csvUrl = normalizeGoogleSheetCsvUrl(rawUrl);
      if (!csvUrl) {
        return { ok: true, count: 0 };
      }
      try {
        const res = await fetch(csvUrl);
        if (!res.ok) {
          return {
            ok: false,
            count: 0,
            error: 'تعذر الوصول إلى رابط الجدول. تأكد أن الجدول متاح للعرض العام.',
          };
        }
        const csvText = await res.text();
        const sheetArticles = parseNewsCsv(csvText);
        if (sheetArticles.length === 0) {
          return {
            ok: false,
            count: 0,
            error: 'لم يتم العثور على صفوف أخبار صالحة داخل الجدول.',
          };
        }
        setCustomArticles(sheetArticles);
        try {
          localStorage.setItem(STORAGE_ARTICLES_KEY, JSON.stringify(sheetArticles));
        } catch {
          // ignore storage quota errors
        }
        return { ok: true, count: sheetArticles.length };
      } catch {
        return {
          ok: false,
          count: 0,
          error: 'تعذر جلب البيانات من الرابط. تأكد من صحة رابط Google Sheet ومشاركته للعامة.',
        };
      }
    },
    []
  );

  useEffect(() => {
    if (sheetUrl) {
      fetchFromGoogleSheet(sheetUrl);
    }
  }, [sheetUrl, fetchFromGoogleSheet]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArticle(null);
        setIsAdminOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveCustomArticles = (updated: NewsArticleItem[]) => {
    setCustomArticles(updated);
    try {
      localStorage.setItem(STORAGE_ARTICLES_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const handleSaveDisplayMode = (mode: NewsDisplayMode) => {
    setDisplayMode(mode);
    try {
      localStorage.setItem(STORAGE_DISPLAY_MODE_KEY, mode);
    } catch {
      // ignore storage errors
    }
  };

  const handleResetDefaultArticles = () => {
    setCustomArticles([]);
    setDisplayMode('default');
    try {
      localStorage.removeItem(STORAGE_ARTICLES_KEY);
      localStorage.setItem(STORAGE_DISPLAY_MODE_KEY, 'default');
    } catch {
      // ignore
    }
  };

  const handleSaveSheetUrl = async (newUrl: string) => {
    setSheetUrl(newUrl);
    try {
      if (newUrl) {
        localStorage.setItem(STORAGE_SHEET_URL_KEY, newUrl);
      } else {
        localStorage.removeItem(STORAGE_SHEET_URL_KEY);
      }
    } catch {
      // ignore
    }
    if (!newUrl) {
      return { ok: true, count: customArticles.length };
    }
    return fetchFromGoogleSheet(newUrl);
  };

  const handleChangePasscode = (newCode: string) => {
    setAdminPasscode(newCode);
    try {
      localStorage.setItem(STORAGE_PASSCODE_KEY, newCode);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="news"
      aria-labelledby="news-heading"
      className="scroll-mt-20 px-4 py-8 md:px-6 md:py-12 bg-[#F5F9F7] border-b border-[#DCE7E5]"
    >
      <div className="max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Section Header */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="w-full flex items-center gap-2 text-[13px] md:text-sm font-medium text-teal-600 mb-1.5">
              <Newspaper className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-normal">الأخبار والتقارير الموثقة</span>
            </div>
            <h2
              id="news-heading"
              className="w-full text-xl md:text-2xl font-bold text-blue-900 mb-2 whitespace-normal"
            >
              أحدث الأخبار والفعاليات الميدانية
            </h2>
            <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
              متابعة دورية لأهم الفعاليات التربوية والمبادرات الخيرية الموثقة لجمعية ذات أثر للأعمال الخيرية بقرية الأقواز.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            className="self-start sm:self-auto py-2 px-4 rounded-xl bg-white border border-[#DCE7E5] hover:border-[#159EAA] text-blue-900 text-xs md:text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4 text-[#159EAA] shrink-0" aria-hidden="true" />
            <span>إدارة الأخبار</span>
          </button>
        </div>

        {/* News Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {displayedArticles.map((article) => (
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
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== window.location.origin + CHARITY_INFO.activitiesImage) {
                          target.src = CHARITY_INFO.activitiesImage;
                        }
                      }}
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

      {/* Passcode-Protected News Admin Modal */}
      <NewsAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        defaultArticles={NEWS_ARTICLES}
        customArticles={customArticles}
        displayMode={displayMode}
        onSaveDisplayMode={handleSaveDisplayMode}
        onSaveCustomArticles={handleSaveCustomArticles}
        onResetDefaultArticles={handleResetDefaultArticles}
        sheetUrl={sheetUrl}
        onSaveSheetUrl={handleSaveSheetUrl}
        adminPasscode={adminPasscode}
        onChangePasscode={handleChangePasscode}
      />
    </section>
  );
};

