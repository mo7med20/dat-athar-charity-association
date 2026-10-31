import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CHARITY_INFO,
  PROGRAMS_DATA,
  GALLERY_PHOTOS,
  VERIFIED_IMPACT_FACTS,
  NEWS_ARTICLES,
  filterPrograms,
  filterGalleryPhotos,
  buildWhatsAppUrl,
  validateInquiryForm,
  shouldShowScrollToTop,
  formatInquiryWhatsAppMessage,
  normalizeGoogleSheetCsvUrl,
  normalizeImageUrl,
  parseNewsCsv,
  formatNewsArticleAsSheetRow,
  generateNewsSheetTemplateCsv,
  resolveDisplayedNews,
} from './charityData';

test('charity official metadata and assets match verified specification', () => {
  assert.equal(CHARITY_INFO.name, 'جمعية ذات أثر للأعمال الخيرية');
  assert.equal(CHARITY_INFO.englishName, 'Dat Athar Charity Association');
  assert.equal(
    CHARITY_INFO.heroHeadline,
    'نصنع الأثر... ونبني الإنسان بالعلم والقيم'
  );
  assert.equal(
    CHARITY_INFO.registrationText,
    'مشهرة بقرار قيد رقم (8014) بتاريخ 19/3/2026'
  );
  assert.equal(CHARITY_INFO.officialPhone, '01111815006');
  assert.equal(
    CHARITY_INFO.googleMapsUrl,
    'https://maps.app.goo.gl/oec7XmbFGwUxNAgF6'
  );
  assert.equal(CHARITY_INFO.logoSrc, '/assets/aistudio/image_7d0347f0.png');
});

test('filterPrograms filters all 6 verified programs accurately by category', () => {
  assert.equal(filterPrograms(PROGRAMS_DATA, 'all').length, 6);
  const education = filterPrograms(PROGRAMS_DATA, 'education');
  assert.equal(education.length, 2);
  const relief = filterPrograms(PROGRAMS_DATA, 'relief');
  assert.equal(relief.length, 2);
  const community = filterPrograms(PROGRAMS_DATA, 'community');
  assert.equal(community.length, 2);
});

test('filterGalleryPhotos filters real activity photographs by category', () => {
  assert.equal(filterGalleryPhotos(GALLERY_PHOTOS, 'all').length, 6);
  assert.equal(filterGalleryPhotos(GALLERY_PHOTOS, 'relief').length, 3);
  assert.equal(filterGalleryPhotos(GALLERY_PHOTOS, 'skills').length, 1);
});

test('verified impact facts and news articles contain only documented data', () => {
  assert.equal(VERIFIED_IMPACT_FACTS.length, 4);
  assert.equal(VERIFIED_IMPACT_FACTS[0].valueLabel, '8014');
  assert.equal(NEWS_ARTICLES.length, 3);
});

test('buildWhatsAppUrl encodes Arabic messages properly for official number', () => {
  const url = buildWhatsAppUrl('201111815006', 'استفسار عن دار رياض الصالحين');
  assert.ok(url.startsWith('https://wa.me/201111815006?text='));
  assert.ok(decodeURIComponent(url).includes('استفسار عن دار رياض الصالحين'));
});

test('formatInquiryWhatsAppMessage builds structured Arabic message for official WhatsApp', () => {
  const message = formatInquiryWhatsAppMessage({
    fullName: 'أحمد محمود علي',
    phone: '01012345678',
    email: 'ahmed@example.com',
    topic: 'dar-riyad',
    selectedProgramTitle: 'دار رياض الصالحين لتحفيظ القرآن واللغة العربية',
    message: 'أود الاستفسار عن مواعيد التقديم للأطفال.',
  });
  assert.ok(message.includes('أحمد محمود علي'));
  assert.ok(message.includes('01012345678'));
  assert.ok(message.includes('ahmed@example.com'));
  assert.ok(message.includes('التقديم والاستفسار بدار رياض الصالحين'));
  assert.ok(message.includes('دار رياض الصالحين لتحفيظ القرآن واللغة العربية'));
  assert.ok(message.includes('أود الاستفسار عن مواعيد التقديم للأطفال.'));
});

test('normalizeGoogleSheetCsvUrl converts sharing and published URLs into direct CSV export links', () => {
  const sharedUrl =
    'https://docs.google.com/spreadsheets/d/1AbC_123456789/edit?usp=sharing';
  assert.equal(
    normalizeGoogleSheetCsvUrl(sharedUrl),
    'https://docs.google.com/spreadsheets/d/1AbC_123456789/export?format=csv'
  );

  const pubHtmlUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTestId/pubhtml';
  assert.equal(
    normalizeGoogleSheetCsvUrl(pubHtmlUrl),
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTestId/pub?output=csv'
  );
});

test('normalizeImageUrl converts Google Drive links into direct image URLs', () => {
  const driveLink =
    'https://drive.google.com/file/d/1XyZ987654321/view?usp=sharing';
  assert.equal(
    normalizeImageUrl(driveLink),
    'https://lh3.googleusercontent.com/d/1XyZ987654321'
  );
});

test('generateNewsSheetTemplateCsv, parseNewsCsv, and formatNewsArticleAsSheetRow round-trip accurately', () => {
  const csv = generateNewsSheetTemplateCsv(NEWS_ARTICLES);
  const parsed = parseNewsCsv(csv);
  assert.equal(parsed.length, 3);
  assert.equal(parsed[0].title, NEWS_ARTICLES[0].title);
  assert.equal(parsed[0].categoryLabel, NEWS_ARTICLES[0].categoryLabel);
  assert.equal(parsed[0].fullText.length, NEWS_ARTICLES[0].fullText.length);

  const tsvRow = formatNewsArticleAsSheetRow(NEWS_ARTICLES[0]);
  assert.ok(tsvRow.includes('\t'));
  assert.ok(tsvRow.includes(NEWS_ARTICLES[0].title));
});

test('validateInquiryForm validates required Arabic fields and optional email', () => {
  const invalid = validateInquiryForm({
    fullName: 'مح',
    phone: '123',
    email: 'not-an-email',
    topic: 'donation',
    message: 'قصير',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateInquiryForm({
    fullName: 'فاطمة محمد أحمد',
    phone: '01111815006',
    email: 'donor@example.com',
    topic: 'dar-riyad',
    message: 'أرغب في الاستفسار عن التقديم لطفلي في دار رياض الصالحين.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('shouldShowScrollToTop returns true only after scrolling past hero section bottom', () => {
  assert.equal(shouldShowScrollToTop(0, 620), false);
  assert.equal(shouldShowScrollToTop(450, 620), false);
  assert.equal(shouldShowScrollToTop(620, 620), false);
  assert.equal(shouldShowScrollToTop(621, 620), true);
  assert.equal(shouldShowScrollToTop(1200, 620), true);
  assert.equal(shouldShowScrollToTop(100, 0), false);
});

test('resolveDisplayedNews respects saved mode (default, custom, merged) accurately', () => {
  const customSample = [
    {
      id: 'custom-1',
      title: 'خبر جديد من ملف الجمعية',
      dateLabel: 'نوفمبر 2026',
      categoryLabel: 'مبادرات ميدانية',
      summary: 'ملخص الخبر الجديد من الملف.',
      fullText: ['فقرة كاملة للخبر الجديد.'],
      imageSrc: '/image_07ec7a.jpg',
      imageAlt: 'صورة الخبر',
    },
  ];

  const defaultOnly = resolveDisplayedNews('default', NEWS_ARTICLES, customSample);
  assert.equal(defaultOnly.length, 3);
  assert.equal(defaultOnly[0].id, NEWS_ARTICLES[0].id);

  const customOnly = resolveDisplayedNews('custom', NEWS_ARTICLES, customSample);
  assert.equal(customOnly.length, 1);
  assert.equal(customOnly[0].id, 'custom-1');

  const merged = resolveDisplayedNews('merged', NEWS_ARTICLES, customSample);
  assert.equal(merged.length, 4);
  assert.equal(merged[0].id, 'custom-1');
  assert.equal(merged[1].id, NEWS_ARTICLES[0].id);

  // Fallback when custom is empty
  const customEmptyFallback = resolveDisplayedNews('custom', NEWS_ARTICLES, []);
  assert.equal(customEmptyFallback.length, 3);
});



