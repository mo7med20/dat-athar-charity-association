import React, { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Award,
  Utensils,
  HeartHandshake,
  Shirt,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import {
  PROGRAMS_DATA,
  ProgramCategory,
  ProgramItem,
  filterPrograms,
} from '../utils/charityData';

interface ProgramsSectionProps {
  onSupportProgram: (program: ProgramItem) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onSupportProgram,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProgramCategory>('all');

  const filteredPrograms = filterPrograms(PROGRAMS_DATA, activeCategory);

  const renderProgramIcon = (id: string) => {
    switch (id) {
      case 'quran-arabic-dar':
        return <BookOpen className="w-5 h-5 text-[#159EAA] shrink-0" aria-hidden="true" />;
      case 'early-childhood-education':
        return <GraduationCap className="w-5 h-5 text-[#159EAA] shrink-0" aria-hidden="true" />;
      case 'skills-calligraphy':
        return <Award className="w-5 h-5 text-[#159EAA] shrink-0" aria-hidden="true" />;
      case 'food-assistance':
        return <Utensils className="w-5 h-5 text-[#159EAA] shrink-0" aria-hidden="true" />;
      case 'family-support-bags':
        return <HeartHandshake className="w-5 h-5 text-[#159EAA] shrink-0" aria-hidden="true" />;
      default:
        return <Shirt className="w-5 h-5 text-[#159EAA] shrink-0" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="scroll-mt-20 px-4 py-8 md:px-6 md:py-12 bg-white border-b border-[#DCE7E5]"
    >
      <div className="max-w-7xl mx-auto w-full space-y-6 md:space-y-8">
        {/* Header & Interactive Category Filter */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full">
            <p className="w-full text-[13px] md:text-sm font-medium text-teal-600 mb-1.5 leading-relaxed whitespace-normal">
              برامجنا ومبادراتنا المعتمدة
            </p>
            <h2
              id="programs-heading"
              className="w-full text-xl md:text-2xl font-bold text-blue-900 mb-3 whitespace-normal"
            >
              منظومة متكاملة لبناء الإنسان ودعم الأسرة
            </h2>
            <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
              تتوزع جهود الجمعية بين البرامج التعليمية والقرآنية المستدامة وبين المبادرات الإغاثية والاجتماعية لتلبية احتياجات أهالي قرية الأقواز والقرى المجاورة.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label="تصفية برامج الجمعية"
            className="w-full flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 p-2 bg-[#F5F9F7] border border-[#DCE7E5] rounded-2xl"
          >
            {(
              [
                { id: 'all', label: 'جميع البرامج (6)' },
                { id: 'education', label: 'التعليم والقرآن' },
                { id: 'relief', label: 'الإطعام ودعم الأسر' },
                { id: 'community', label: 'تنمية المجتمع والكساء' },
              ] as const
            ).map((tab) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`w-full sm:w-auto py-2.5 px-4 rounded-xl text-[13.5px] md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer text-center ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-2xs'
                      : 'text-gray-600 hover:text-blue-900 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Programs Responsive Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredPrograms.map((program) => (
            <article
              key={program.id}
              className="w-full bg-[#F5F9F7] rounded-2xl p-4 md:p-5 border border-[#DCE7E5] flex flex-col justify-between gap-4 hover:border-[#159EAA] transition-colors"
            >
              <div className="w-full space-y-3 flex-1">
                {/* Program Real Photo Header */}
                <div className="w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-white">
                  <picture className="block w-full">
                    {program.imageWebp && (
                      <source srcSet={program.imageWebp} type="image/webp" />
                    )}
                    <img
                      src={program.imageSrc}
                      alt={program.imageAlt}
                      width={310}
                      height={212}
                      loading="lazy"
                      className="w-full h-44 md:h-48 object-cover object-center rounded-xl contrast-[1.05] saturate-[1.05] brightness-[1.02] transition-transform duration-500 hover:scale-110"
                    />
                  </picture>
                </div>

                {/* Program Content */}
                <div className="w-full space-y-2">
                  <div className="w-full flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0 flex items-center gap-1.5 text-[13px] md:text-sm font-medium text-teal-600">
                      <span className="font-mono-num shrink-0">{program.numberLabel}.</span>
                      <span className="flex-1 min-w-0 whitespace-normal">{program.categoryLabel}</span>
                    </div>
                    {renderProgramIcon(program.id)}
                  </div>

                  <h3 className="w-full text-[15px] md:text-[17px] font-bold text-blue-900 whitespace-normal">
                    {program.title}
                  </h3>

                  <p className="w-full text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal">
                    {program.shortDescription}
                  </p>

                  <ul className="w-full pt-2 space-y-1.5 border-t border-[#DCE7E5]">
                    {program.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="w-full flex items-start gap-2 text-sm md:text-[15px] leading-relaxed text-gray-700 whitespace-normal"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-[#29B9AA] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="flex-1 min-w-0 whitespace-normal">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="w-full pt-3 border-t border-[#DCE7E5] flex flex-col gap-2.5">
                <p className="w-full text-[13px] md:text-sm leading-relaxed text-gray-600 whitespace-normal">
                  {program.targetGroup}
                </p>

                <button
                  type="button"
                  onClick={() => onSupportProgram(program)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-blue-900 text-blue-900 hover:text-white border border-[#DCE7E5] inline-flex items-center justify-center gap-2 text-[13.5px] md:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
                >
                  <span>ادعم البرنامج</span>
                  <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
