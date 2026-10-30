import React, { useState, useEffect } from 'react';
import { ZoomIn, X, Newspaper, Camera } from 'lucide-react';
import {
  GALLERY_PHOTOS,
  GalleryCategory,
  GalleryPhotoItem,
  CHARITY_INFO,
  filterGalleryPhotos,
} from '../utils/charityData';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhotoItem | null>(null);
  const [showFullNewspaper, setShowFullNewspaper] = useState<boolean>(false);

  const visiblePhotos = filterGalleryPhotos(GALLERY_PHOTOS, selectedCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
        setShowFullNewspaper(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-20 px-4 py-8 md:px-6 md:py-12 bg-white border-b border-[#DCE7E5]"
    >
      <div className="max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Section Header & Filter Tabs */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full">
            <div className="w-full flex items-center gap-2 text-[13px] md:text-sm font-medium text-teal-600 mb-1.5">
              <Camera className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-normal">توثيق ميداني حقيقي</span>
            </div>
            <h2
              id="gallery-heading"
              className="w-full text-xl md:text-2xl font-bold text-blue-900 mb-3 whitespace-normal"
            >
              معرض صور أنشطة ومبادرات الجمعية
            </h2>
            <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
              لقطات حقيقية موثقة من أنشطة الجمعية في قرية الأقواز: دورات الخط العربي والتجويد، معارض الملابس الخيرية، وتجهيز وتوزيع الوجبات الساخنة والشنط الغذائية.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="تصفية معرض الصور"
            className="w-full flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 p-2 bg-[#F5F9F7] border border-[#DCE7E5] rounded-2xl"
          >
            {(
              [
                { id: 'all', label: 'الكل (6)' },
                { id: 'education', label: 'التعليم والقرآن' },
                { id: 'relief', label: 'الإطعام والتكافل' },
                { id: 'skills', label: 'تنمية المهارات' },
                { id: 'official', label: 'التوثيق الرسمي' },
              ] as const
            ).map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`w-full sm:w-auto py-2.5 px-4 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer text-center ${
                    active
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-600 hover:text-blue-900 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {visiblePhotos.map((photo) => (
            <figure
              key={photo.id}
              className="w-full group bg-[#F5F9F7] rounded-2xl p-4 md:p-5 border border-[#DCE7E5] flex flex-col justify-between gap-3.5 hover:border-[#159EAA] transition-colors"
            >
              <div className="w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-[#103B70]/5">
                <picture className="block w-full">
                  {photo.webpSrc && (
                    <source srcSet={photo.webpSrc} type="image/webp" />
                  )}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={400}
                    height={300}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 md:h-48 object-cover object-center rounded-xl contrast-[1.05] saturate-[1.05] brightness-[1.02] transition-transform duration-500 hover:scale-110"
                  />
                </picture>
              </div>

              <figcaption className="w-full space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="w-full space-y-1">
                  <div className="w-full flex flex-wrap items-center gap-1.5 text-xs md:text-[13px] font-medium text-teal-600">
                    <span className="whitespace-normal">{photo.categoryLabel}</span>
                    <span aria-hidden="true" className="text-gray-400">
                      ·
                    </span>
                    <span className="text-gray-600 whitespace-normal">{photo.dateNote}</span>
                  </div>
                  <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                    {photo.title}
                  </h3>
                  <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                    {photo.caption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActivePhoto(photo)}
                  aria-label={`تكبير صورة: ${photo.title}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-900 text-blue-900 hover:text-white border border-[#DCE7E5] inline-flex items-center justify-center gap-2 text-[13.5px] md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>تكبير الصورة</span>
                </button>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Full Newspaper Clipping Banner */}
        <div className="w-full bg-[#F5F9F7] rounded-2xl p-5 md:p-6 border border-[#DCE7E5] flex flex-col lg:flex-row items-center gap-5">
          <div className="w-full lg:flex-1 min-w-0 space-y-2.5">
            <div className="w-full flex items-center gap-2 text-[13px] md:text-sm font-medium text-teal-600">
              <Newspaper className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-normal">الأرشيف الصحفي الموثق للجمعية</span>
            </div>
            <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
              جمعية ذات أثر للأعمال الخيرية.. نموذج للعمل الخيري والتربوي المتكامل
            </h3>
            <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
              تقرير صحفي مفصل يوثق بالصور أنشطة الجمعية برئاسة {CHARITY_INFO.chairperson}، ويستعرض دور «دار رياض الصالحين» بقرية الأقواز وحملات توزيع الشنط الغذائية والوجبات الساخنة ومعرض الملابس الخيري.
            </p>
            <div className="w-full pt-1">
              <button
                type="button"
                onClick={() => setShowFullNewspaper(true)}
                className="w-full sm:w-auto py-2.5 px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 hover:bg-[#159EAA] text-white text-[13.5px] md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>استعراض القصاصة الصحفية الكاملة</span>
              </button>
            </div>
          </div>

          <div className="w-full lg:flex-1 min-w-0">
            <div
              onClick={() => setShowFullNewspaper(true)}
              className="w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-white cursor-zoom-in"
            >
              <picture className="block w-full">
                <source srcSet={CHARITY_INFO.activitiesImageWebp} type="image/webp" />
                <img
                  src={CHARITY_INFO.activitiesImage}
                  alt="قصاصة صحفية توثق أنشطة جمعية ذات أثر للأعمال الخيرية بقرية الأقواز"
                  width={400}
                  height={300}
                  loading="lazy"
                  className="w-full h-44 md:h-52 object-cover object-center rounded-xl contrast-[1.05] saturate-[1.05] brightness-[1.02] transition-transform duration-500 hover:scale-110"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 bg-[#103B70]/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full p-5 space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-start justify-between gap-4 border-b border-[#DCE7E5] pb-3">
              <div className="flex-1 min-w-0">
                <p className="w-full text-sm md:text-base font-medium text-teal-600 leading-relaxed whitespace-normal">
                  {activePhoto.categoryLabel} · {activePhoto.dateNote}
                </p>
                <h3 className="w-full text-base md:text-lg font-bold text-blue-900 whitespace-normal">
                  {activePhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                aria-label="إغلاق الصورة"
                className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-xl text-sm md:text-base font-medium whitespace-nowrap text-blue-900 hover:bg-[#F5F9F7] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-[#F5F9F7] flex items-center justify-center p-2">
              <picture className="block w-full">
                {activePhoto.webpSrc && (
                  <source srcSet={activePhoto.webpSrc} type="image/webp" />
                )}
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  className="max-h-[70vh] w-auto mx-auto object-contain rounded-xl contrast-[1.05] saturate-[1.05] brightness-[1.02]"
                />
              </picture>
            </div>

            <p className="w-full text-sm md:text-base leading-relaxed text-gray-700 whitespace-normal">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}

      {/* Full Newspaper Lightbox Modal */}
      {showFullNewspaper && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="التقرير الصحفي الكامل لجمعية ذات أثر للأعمال الخيرية"
          className="fixed inset-0 z-50 bg-[#103B70]/85 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowFullNewspaper(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-5 space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between gap-4 border-b border-[#DCE7E5] pb-3">
              <div className="flex-1 min-w-0">
                <h3 className="w-full text-base md:text-lg font-bold text-blue-900 whitespace-normal">
                  التغطية الصحفية الكاملة — جمعية ذات أثر للأعمال الخيرية
                </h3>
                <p className="w-full text-sm md:text-base leading-relaxed text-gray-700 whitespace-normal">
                  {CHARITY_INFO.registrationText} · {CHARITY_INFO.shortLocation}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFullNewspaper(false)}
                aria-label="إغلاق التقرير الصحفي"
                className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center rounded-xl text-sm md:text-base font-medium whitespace-nowrap text-blue-900 hover:bg-[#F5F9F7] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-white">
              <picture className="block w-full">
                <source srcSet={CHARITY_INFO.activitiesImageWebp} type="image/webp" />
                <img
                  src={CHARITY_INFO.activitiesImage}
                  alt="التقرير الصحفي الكامل لجمعية ذات أثر للأعمال الخيرية"
                  className="w-full h-auto object-contain rounded-xl contrast-[1.05] saturate-[1.05] brightness-[1.02]"
                />
              </picture>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
