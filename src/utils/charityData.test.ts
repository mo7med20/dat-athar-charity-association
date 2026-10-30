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

